"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TBody = void 0;
const react_1 = __importDefault(require("react"));
const Tr_1 = require("./Tr");
const TBody = ({ children }) => {
    return (react_1.default.createElement("tbody", null, react_1.default.Children.map(children, (child) => {
        if (!react_1.default.isValidElement(child) ||
            (Boolean(child) && child.type !== Tr_1.Tr)) {
            return null;
        }
        return child;
    })));
};
exports.TBody = TBody;
//# sourceMappingURL=TBody.js.map