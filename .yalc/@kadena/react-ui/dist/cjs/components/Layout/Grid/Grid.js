"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Grid = void 0;
const classnames_1 = __importDefault(require("classnames"));
const react_1 = __importDefault(require("react"));
const Box_1 = require("../Box");
const Grid_css_1 = require("./Grid.css");
const assembleColumnVariants = (columns) => {
    if (typeof columns === 'number') {
        return Grid_css_1.containerColumnVariants.xs[columns];
    }
    return Object.entries(columns).map(([key, value]) => {
        return Grid_css_1.containerColumnVariants[key][value];
    });
};
const Grid = ({ className, children, columns, ...props }) => {
    const classList = (0, classnames_1.default)(Grid_css_1.gridContainerClass, columns && assembleColumnVariants(columns), className);
    return (react_1.default.createElement(Box_1.Box, { className: classList, ...props }, children));
};
exports.Grid = Grid;
//# sourceMappingURL=Grid.js.map