"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Td = void 0;
const react_1 = __importDefault(require("react"));
const Table_css_1 = require("./Table.css");
const Td = ({ children }) => {
    return react_1.default.createElement("td", { className: Table_css_1.tdClass }, children);
};
exports.Td = Td;
//# sourceMappingURL=Td.js.map