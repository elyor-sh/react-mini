import { createElement } from "./miniReact";

export const jsx = (type: string | Function, props: any, key?: any) => {
    const { children, ...rest } = props;
    return createElement(type, { ...rest, key }, children);
};

export const jsxs = jsx;