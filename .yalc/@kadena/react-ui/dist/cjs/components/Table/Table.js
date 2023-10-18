"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Table = void 0;
const sprinkles_css_1 = require("../../styles/sprinkles.css");
const classnames_1 = __importDefault(require("classnames"));
const react_1 = __importDefault(require("react"));
const TBody_1 = require("./TBody");
const THead_1 = require("./THead");
const Table_css_1 = require("./Table.css");
const Table = ({ children, striped, wordBreak }) => {
    return (react_1.default.createElement("table", { className: (0, classnames_1.default)(Table_css_1.tableClass, { stripedClass: striped }, (0, sprinkles_css_1.sprinkles)({ wordBreak })) }, react_1.default.Children.map(children, (child) => {
        if (!react_1.default.isValidElement(child) ||
            (Boolean(child) && child.type !== TBody_1.TBody && child.type !== THead_1.THead))
            return null;
        return child;
    })));
};
exports.Table = Table;
//# sourceMappingURL=Table.js.map