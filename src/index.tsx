import { createElement } from "./miniReact/miniReact";
import {renderComponent} from "./miniReact/render";
import {useState} from "./miniReact/useState";
import {useEffect} from "./miniReact/useEffect";
import {TodosList} from "./todos";

const App = () => {
    const [count, setCount] = useState(10)

    useEffect(() => {
        console.log('counter changed  ', count)
    }, [count]);

    console.log('App component re-rendered')

    return (
        <div>
            <h1>{String(count)}</h1>
            <button onClick={() => {
                setCount(count + 1)
            }}>Click me (inc)
            </button>

            <TodosList />
        </div>
    )
};

const container = document.getElementById("root");
renderComponent(<App/>, container!);
