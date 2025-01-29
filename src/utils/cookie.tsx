function getStorage<T>(name: string): T {
    if (typeof localStorage === 'undefined') {
        return {} as T;
    }
    const str = localStorage.getItem(name);
    if (!str || str === '' || str === '{}') {
        return {} as T; // Add type annotation here
    }
    return JSON.parse(str);
}

function setStorage<T>(name: string, obj: T) {
    if (typeof localStorage !== 'undefined') {
        // 在这里使用 localStorage

        localStorage.setItem(name, JSON.stringify(obj));
    }
}

export { getStorage, setStorage };
