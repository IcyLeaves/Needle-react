function replacer(key: any, value: any) {
    if (value instanceof Map) {
        return {
            dataType: 'Map',
            value: Array.from(value.entries()), // or with spread: value: [...value]
        };
    } else {
        return value;
    }
}

function reviver(key: any, value: any) {
    if (typeof value === 'object' && value !== null) {
        if (value.dataType === 'Map') {
            return new Map(value.value);
        }
    }
    return value;
}

const originalValue = new Map([['a', 1]]);

function mapJSONStringify(obj: any): string {
    return JSON.stringify(obj, replacer);
}

function mapJSONParse(str: string): any {
    return JSON.parse(str, reviver);
}

export { mapJSONParse, mapJSONStringify };
