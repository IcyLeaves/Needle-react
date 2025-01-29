import { mapJSONParse, mapJSONStringify } from './map';

function getStorage<T>(name: string): T {
    if (typeof localStorage === 'undefined') {
        return {} as T;
    }
    const str = localStorage.getItem(name);
    if (!str || str === '' || str === '{}') {
        return {} as T; // Add type annotation here
    }
    let obj: T = mapJSONParse(str);
    return obj;
}

function setStorage<T>(name: string, obj: T) {
    if (typeof localStorage !== 'undefined') {
        // 在这里使用 localStorage
        let str = mapJSONStringify(obj);
        localStorage.setItem(name, str);
    }
}

export { getStorage, setStorage };
