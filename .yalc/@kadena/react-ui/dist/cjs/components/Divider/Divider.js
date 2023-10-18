"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Divider = void 0;
const react_1 = __importDefault(require("react"));
const Divider_css_1 = require("./Divider.css");
const Divider = () => {
    return react_1.default.createElement("hr", { className: Divider_css_1.dividerClass });
};
exports.Divider = Divider;
//# sourceMappingURL=Divider.js.map