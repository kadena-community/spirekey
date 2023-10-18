"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tr = void 0;
const IconButton_1 = require("../IconButton");
const react_1 = __importDefault(require("react"));
const Table_css_1 = require("./Table.css");
const Td_1 = require("./Td");
const Th_1 = require("./Th");
const Tr = ({ children, url, onClick }) => {
    return (react_1.default.createElement("tr", { className: Table_css_1.trClass },
        react_1.default.Children.map(children, (child) => {
            if (!react_1.default.isValidElement(child) ||
                (Boolean(child) && child.type !== Th_1.Th && child.type !== Td_1.Td))
                return null;
            return child;
        }),
        url !== undefined ? (react_1.default.createElement("td", { className: Table_css_1.linkButtonClass },
            react_1.default.createElement(IconButton_1.IconButton, { as: "a", href: url, title: url, icon: "TrailingIcon" }))) : onClick !== undefined ? (react_1.default.createElement("td", { className: Table_css_1.linkButtonClass },
            react_1.default.createElement(IconButton_1.IconButton, { as: "button", title: "", onClick: onClick, icon: "TrailingIcon" }))) : ('')));
};
exports.Tr = Tr;
//# sourceMappingURL=Tr.js.map