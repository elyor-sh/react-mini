export type MiniReactElement = {
    type: string | Function | number;
    props: Record<string, any>;
    children: MiniReactElement[];
    __internalId?: string;
};

export const createElement = (
    type: string | Function | number,
    props: Record<string, any> = {},
    ...children: any[]
): MiniReactElement => {
    return { type, props, children };
};
