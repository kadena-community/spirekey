import { isObject, isString } from './is';
export function flattenObject(tokens, ignoredPaths = []) {
    return flattenObjectHelper(tokens, ignoredPaths);
}
function flattenObjectHelper(tokens, ignoredPaths = [], prefix) {
    if (isString(tokens)) {
        return { [prefix]: tokens };
    }
    const flattenedTokens = {};
    for (const key in tokens) {
        if (ignoredPaths.includes(key)) {
            continue;
        }
        const newKey = prefix !== undefined ? prefix.concat('.', key) : key;
        const item = tokens[key];
        if (isObject(item)) {
            Object.assign(flattenedTokens, flattenObjectHelper(item, ignoredPaths, newKey));
        }
        else {
            flattenedTokens[newKey] = item;
        }
    }
    return flattenedTokens;
}
//# sourceMappingURL=object.js.map