// Функция для рендеринга виртуальных элементов в DOM
import {MiniReactElement} from "../miniReact";
import {isPrimitive} from "./utils/isPrimitive";

export const renderToDOM = (vnode: MiniReactElement, container: HTMLElement) => {
    if (typeof vnode.type === "function") {
        // Рендер функциональных компонентов
        return renderToDOM((vnode.type as Function)(vnode.props), container);
    }

    const dom = document.createElement(vnode.type as string);

    // Применяем пропсы
    Object.keys(vnode.props || {}).forEach((key) => {
        if (key.startsWith("on")) {
            const event = key.toLowerCase().substring(2);
            dom.addEventListener(event, vnode.props[key]);
        } else {
            dom[key] = vnode.props[key];
        }
    });

    // Рендер детей
    vnode.children?.forEach((child) => {
        if (isPrimitive(child)) {
            dom.appendChild(document.createTextNode(String(child)));
        } else if (Array.isArray(child)) {
            child.forEach(ch => {
                renderToDOM(ch, dom)
            })
        } else {
            renderToDOM(child, dom);
        }
    });

    container.appendChild(dom); // Вставляем элемент в контейнер
};