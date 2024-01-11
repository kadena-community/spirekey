"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.withContentWidth = void 0;
const atoms_css_1 = require("../styles/atoms.css");
const classnames_1 = __importDefault(require("classnames"));
const react_1 = __importDefault(require("react"));
const storyDecorators_css_1 = require("./storyDecorators.css");
const WithContentWidth = ({ children }) => {
    return (react_1.default.createElement("div", { className: (0, classnames_1.default)((0, atoms_css_1.atoms)({ maxWidth: 'content.maxWidth' }), storyDecorators_css_1.minWidth) }, children));
};
const withContentWidth = (story) => (react_1.default.createElement(WithContentWidth, null, story()));
exports.withContentWidth = withContentWidth;
//# sourceMappingURL=withContentWidth.js.map