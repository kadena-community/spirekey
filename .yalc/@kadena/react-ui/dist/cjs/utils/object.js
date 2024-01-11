"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.flattenObject = void 0;
const is_1 = require("./is");
function flattenObject(tokens, ignoredPaths = []) {
    return flattenObjectHelper(tokens, ignoredPaths);
}
exports.flattenObject = flattenObject;
function flattenObjectHelper(tokens, ignoredPaths = [], prefix) {
    if ((0, is_1.isString)(tokens)) {
        return { [prefix]: tokens };
    }
    const flattenedTokens = {};
    for (const key in tokens) {
        if (ignoredPaths.includes(key)) {
            continue;
        }
        const newKey = prefix !== undefined ? prefix.concat('.', key) : key;
        const item = tokens[key];
        if ((0, is_1.isObject)(item)) {
            Object.assign(flattenedTokens, flattenObjectHelper(item, ignoredPaths, newKey));
        }
        else {
            flattenedTokens[newKey] = item;
        }
    }
    return flattenedTokens;
}
//# sourceMappingURL=object.js.map