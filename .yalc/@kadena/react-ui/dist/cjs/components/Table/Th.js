"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Th = void 0;
const sprinkles_css_1 = require("../../styles/sprinkles.css");
const classnames_1 = __importDefault(require("classnames"));
const react_1 = __importDefault(require("react"));
const Table_css_1 = require("./Table.css");
const Th = ({ children, width, minWidth, maxWidth }) => {
    return (react_1.default.createElement("th", { className: (0, classnames_1.default)(Table_css_1.thClass, (0, sprinkles_css_1.sprinkles)({ width, minWidth, maxWidth })) }, children));
};
exports.Th = Th;
//# sourceMappingURL=Th.js.map