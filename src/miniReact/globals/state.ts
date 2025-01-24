// state.ts

export const components: Record<string, any> = {};
let currentComponentId: string | null = null;

export function getCurrentComponentId () {
    return currentComponentId
}

export function setCurrentComponentId (val: string | null ) {
    currentComponentId = val
}

let isBatching = false;
const updateQueue: Set<string> = new Set();

export function scheduleUpdate(componentId: string) {
    updateQueue.add(componentId); // Добавляем компонент в очередь
    if (!isBatching) {
        isBatching = true;
        // Ожидаем конца текущего цикла выполнения и затем обновляем компоненты
        requestAnimationFrame(() => {
            flushUpdates();
        });
    }
}

export function flushUpdates() {
    updateQueue.forEach((componentId) => {
        const component = components[componentId];
        if (component) {
            component.render(); // Перерисовываем компонент
        }
    });
    updateQueue.clear(); // Очищаем очередь обновлений
    isBatching = false;
}
