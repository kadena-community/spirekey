export function isString(token) {
    return typeof token === 'string';
}
export function isObject(token) {
    return (!isNullOrUndefined(token) &&
        typeof token === 'object' &&
        !Array.isArray(token));
}
export function isNullOrUndefined(token) {
    return token === null || isUndefined(token);
}
export function isUndefined(token) {
    return token === undefined;
}
//# sourceMappingURL=is.js.map