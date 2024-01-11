"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isUndefined = exports.isNullOrUndefined = exports.isObject = exports.isString = void 0;
function isString(token) {
    return typeof token === 'string';
}
exports.isString = isString;
function isObject(token) {
    return (!isNullOrUndefined(token) &&
        typeof token === 'object' &&
        !Array.isArray(token));
}
exports.isObject = isObject;
function isNullOrUndefined(token) {
    return token === null || isUndefined(token);
}
exports.isNullOrUndefined = isNullOrUndefined;
function isUndefined(token) {
    return token === undefined;
}
exports.isUndefined = isUndefined;
//# sourceMappingURL=is.js.map