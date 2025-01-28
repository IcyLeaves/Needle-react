function getStorage<T>(name: string): T {
    const str = localStorage.getItem(name);
    if (!str || str === '' || str === '{}') {
        return {} as T; // Add type annotation here
    }
    return JSON.parse(str);
}

function setStorage<T>(name: string, obj: T) {
    localStorage.setItem(name, JSON.stringify(obj));
}

export { getStorage, setStorage };
