export const isEmptyDialog = <T>(obj: T, omitKeys?: string[]): boolean => {
    for (const key in obj) {
        if (omitKeys?.includes(key)) continue;
        const val = obj[key as keyof T];
        if (val instanceof Object && !isEmptyDialog<T[typeof key]>(val as T[typeof key])) return false;
        if (typeof val === 'string' && val !== '') return false;
        if (typeof val === 'number') return false;
    }
    return true;
}
