"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Grid = void 0;
const sprinkles_css_1 = require("../../../styles/sprinkles.css");
const classnames_1 = __importDefault(require("classnames"));
const react_1 = __importDefault(require("react"));
const Grid_css_1 = require("./Grid.css");
const assembleColumnVariants = (columns) => {
    if (typeof columns === 'number') {
        return Grid_css_1.containerColumnVariants.xs[columns];
    }
    return Object.entries(columns).map(([key, value]) => {
        return Grid_css_1.containerColumnVariants[key][value];
    });
};
const Grid = ({ className, children, columns, gap = '$md', height, margin, marginBottom, marginLeft, marginRight, marginTop, marginX, marginY, maxHeight, maxWidth, minHeight, minWidth, overflow, padding, paddingBottom, paddingLeft, paddingRight, paddingTop, paddingX, paddingY, width, }) => {
    const classList = (0, classnames_1.default)(Grid_css_1.gapVariants[gap], Grid_css_1.gridContainerClass, columns && assembleColumnVariants(columns), (0, sprinkles_css_1.sprinkles)({
        height,
        margin,
        marginBottom,
        marginLeft,
        marginRight,
        marginTop,
        marginX,
        marginY,
        maxHeight,
        maxWidth,
        minHeight,
        minWidth,
        overflow,
        padding,
        paddingBottom,
        paddingLeft,
        paddingRight,
        paddingTop,
        paddingX,
        paddingY,
        width,
    }), className);
    return react_1.default.createElement("div", { className: classList }, children);
};
exports.Grid = Grid;
//# sourceMappingURL=Grid.js.map