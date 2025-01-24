import {createElement} from "../miniReact/miniReact";
import {useState} from "../miniReact/useState";

export const TodosList = () => {
    const [todos, setTodos] = useState([{id: 1, title: 'Learn React'}]);

    const generateTodo = () => {
        const todo = {
            id: todos[todos.length - 1].id + 1,
            title: 'Todos ' + Math.random()
        }

        setTodos([...todos, todo])
    }

    console.log('Todo component re-rendered', todos)

    return (
        <div>
            <button
                onClick={generateTodo}
            >
                Add todo
            </button>
            <ul>
                {todos.map((todo) => (
                    <li key={todo.id}>{todo.title}</li>
                ))}
            </ul>
        </div>
    )
}