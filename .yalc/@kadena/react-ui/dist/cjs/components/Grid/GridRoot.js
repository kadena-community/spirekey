"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GridRoot = void 0;
const sprinkles_css_1 = require("../../styles/sprinkles.css");
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
const GridRoot = ({ children, columns, margin = undefined, marginX = undefined, marginY = undefined, marginTop = undefined, marginBottom = undefined, marginLeft = undefined, marginRight = undefined, gap = '$md', padding = undefined, paddingX = undefined, paddingY = undefined, paddingTop = undefined, paddingBottom = undefined, paddingLeft = undefined, paddingRight = undefined, }) => {
    const classList = (0, classnames_1.default)(Grid_css_1.gapVariants[gap], Grid_css_1.gridContainerClass, columns && assembleColumnVariants(columns), (0, sprinkles_css_1.sprinkles)({
        margin,
        marginX,
        marginY,
        marginTop,
        marginBottom,
        marginLeft,
        marginRight,
        padding,
        paddingX,
        paddingY,
        paddingTop,
        paddingBottom,
        paddingLeft,
        paddingRight,
    }));
    return (react_1.default.createElement("div", { className: classList, "data-testid": "kda-grid-root" }, children));
};
exports.GridRoot = GridRoot;
//# sourceMappingURL=GridRoot.js.map