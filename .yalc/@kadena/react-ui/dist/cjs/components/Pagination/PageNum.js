"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PageNum = void 0;
const classnames_1 = __importDefault(require("classnames"));
const react_1 = __importDefault(require("react"));
const Pagination_css_1 = require("./Pagination.css");
const PageNum = ({ number, current, onClick }) => {
    return (react_1.default.createElement("button", { className: (0, classnames_1.default)(Pagination_css_1.pageNumButtonClass, { current }), onClick: onClick }, number));
};
exports.PageNum = PageNum;
//# sourceMappingURL=PageNum.js.map