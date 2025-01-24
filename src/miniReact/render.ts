import {MiniReactElement} from "./miniReact";
import {isPrimitive} from "./renderToDom/utils/isPrimitive";
// import {renderToDOM} from "./renderToDom";

export const components: Record<string, any> = {};
export let currentComponentId: string | null = null;

export function renderComponent(
    vnode: MiniReactElement,
    container: HTMLElement,
    componentId?: string
) {
    const id = componentId ?? `component_${Object.keys(components).length}`;

    if (!components[id]) {
        components[id] = {
            render: () => {
                currentComponentId = id; // Устанавливаем текущий компонент
                components[id].stateIndex = 0; // Сбрасываем индекс состояний
                container.innerHTML = ''
                renderToDOM(vnode, container, id); // Рендерим виртуальный DOM
                currentComponentId = null; // Сбрасываем текущий компонент
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
    parentComponentId?: string
) {
    if (typeof vnode.type === 'function') {
        const id = parentComponentId
            ? parentComponentId
            : `component_${Object.keys(components).length}`;

        console.log('components ', components)

        // Проверяем, не был ли компонент уже отрендерен
        if (!components[id]) {
            const hDiv = document.createElement('slot')
            hDiv.dataset.helper = 'unstable__helper-slot'
            container.appendChild(hDiv)
            return renderComponent(vnode, hDiv, id);
        }

        return renderToDOM((vnode.type as Function)(vnode.props), container);
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
                renderToDOM(ch, domNode, parentComponentId)
            })
        } else {
            renderToDOM(child, domNode, parentComponentId);
        }
    });

    container.appendChild(domNode);
}