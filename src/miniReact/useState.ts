import { rerender} from './render';

const state: any[] = [];
let stateIndex = 0;

export function useState<T>(initialValue: T): [T, (newValue: T) => void] {
    const currentIndex = stateIndex; // Захватываем текущий индекс
    stateIndex++; // Увеличиваем индекс для следующего состояния

    if (state[currentIndex] === undefined) {
        state[currentIndex] = initialValue; // Инициализация состояния
    }

    const setState = (newValue: T) => {
        state[currentIndex] = newValue; // Обновляем состояние
        rerender(); // Перерендериваем компонент
    };

    return [state[currentIndex], setState];
}

export function resetStateIndex() {
    stateIndex = 0; // Сбрасываем индекс перед каждым новым рендером
}