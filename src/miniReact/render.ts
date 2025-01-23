// src/miniReact/render.ts
import {MiniReactElement} from "./miniReact";
import {resetStateIndex} from "./useState";
import {isPrimitive} from "./utils/isPrimitive";

// Глобальная функция для вызова перерендеринга
export let rerender: () => void;

export function renderComponent(element: MiniReactElement, container: HTMLElement) {
    if (!element || typeof element !== 'object' || !element.type) {
        throw new Error(
            `Expected a valid MiniReactElement but got ${typeof element}. Did you forget to use JSX or call createElement()?`
        );
    }

    if (typeof element.type === 'function') {
        // Если это функциональный компонент
        const component = element.type;

        rerender = () => {
            resetStateIndex(); // Сбрасываем индекс состояний перед каждым рендером
            const vnode = component(element.props); // Получаем новое VDOM дерево
            container.innerHTML = ''; // Очищаем контейнер
            renderToDOM(vnode, container); // Рендерим новое VDOM дерево
        };

        // Изначальный рендер
        rerender();
    } else {
        // Если это обычный DOM-элемент
        container.innerHTML = ''; // Очищаем контейнер
        renderToDOM(element, container);
    }
}
// Функция для рендеринга виртуальных элементов в DOM
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