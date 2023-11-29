"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Heading = void 0;
const react_1 = __importDefault(require("react"));
const Heading_css_1 = require("./Heading.css");
const Heading = ({ as = 'h1', variant = as, font = 'main', bold = true, color = 'emphasize', transform = 'none', children, ...props }) => {
    const classList = (0, Heading_css_1.heading)({
        variant,
        font,
        bold,
        color,
        transform,
    });
    switch (as) {
        case 'h2':
            return (react_1.default.createElement("h2", { className: classList, ...props }, children));
        case 'h3':
            return (react_1.default.createElement("h3", { className: classList, ...props }, children));
        case 'h4':
            return (react_1.default.createElement("h4", { className: classList, ...props }, children));
        case 'h5':
            return (react_1.default.createElement("h5", { className: classList, ...props }, children));
        case 'h6':
            return (react_1.default.createElement("h6", { className: classList, ...props }, children));
        case 'h1':
        default:
            return (react_1.default.createElement("h1", { className: classList, ...props }, children));
    }
};
exports.Heading = Heading;
//# sourceMappingURL=Heading.js.map