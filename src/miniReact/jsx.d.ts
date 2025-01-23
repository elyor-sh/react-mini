import { MiniReactElement } from "./miniReact";

declare global {
    namespace JSX {
        interface Element extends MiniReactElement {}
        interface IntrinsicElements {
            [elemName: string]: any; // Для HTML-элементов, таких как `div`, `span` и т.д.
        }
    }
}
