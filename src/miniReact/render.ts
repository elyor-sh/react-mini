import {MiniReactElement} from "./miniReact";
import {isPrimitive} from "./renderToDom/utils/isPrimitive";
import {components, setCurrentComponentId} from "./globals/state";
// import {renderToDOM} from "./renderToDom";

export function renderComponent(
    vnode: MiniReactElement,
    container: HTMLElement,
) {
    const id = vnode.__internalId!;

    if (!components[id]) {
        components[id] = {
            render: () => {
                setCurrentComponentId(id); // Устанавливаем текущий компонент
                components[id].stateIndex = 0; // Сбрасываем индекс состояний
                container.innerHTML = ''
                renderToDOM(vnode, container); // Рендерим виртуальный DOM
                setCurrentComponentId(null); // Сбрасываем текущий компонент
            },
            states: [],
            stateIndex: 0,
        };
    }

    components[id].render();
}

export function renderToDOM(
    vnode: MiniReactElement,
    container: HTMLElement,
) {

    if (typeof vnode.type === 'function') {
        if(!vnode.__internalId) {
            vnode.__internalId = `component_${Object.keys(components).length}`
        }
        const id = vnode.__internalId!

        // Проверяем, не был ли компонент уже отрендерен
        if (!components[id]) {
            const hDiv = document.createElement('div')
            hDiv.dataset.helper = 'unstable__helper-div'
            container.appendChild(hDiv)
            return renderComponent(vnode, hDiv);
        }

        return renderToDOM((vnode.type as Function)(vnode.props), container);
    }

    if(Array.isArray(vnode)){
        vnode.forEach(node => {
            renderToDOM(node, container)
        })
        return
    }

    const domNode = document.createElement(vnode.type as string);

    // Применяем пропсы
    Object.keys(vnode.props || {}).forEach((key) => {
        if (key.startsWith('on')) {
            const event = key.toLowerCase().substring(2);
            domNode.addEventListener(event, vnode.props[key]);
        } else {
            domNode[key] = vnode.props[key];
        }
    });

    // Рендер детей
    vnode.children?.forEach((child) => {
        if (isPrimitive(child)) {
            domNode.appendChild(document.createTextNode(String(child)));
        } else if (Array.isArray(child)) {
            child.forEach(ch => {
                renderToDOM(ch, domNode)
            })
        } else {
            renderToDOM(child, domNode);
        }
    });

    container.appendChild(domNode);
}