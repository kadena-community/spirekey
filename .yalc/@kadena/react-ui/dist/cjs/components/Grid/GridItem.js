"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GridItem = void 0;
const classnames_1 = __importDefault(require("classnames"));
const react_1 = __importDefault(require("react"));
const Grid_css_1 = require("./Grid.css");
const assembleColumnSpanVariants = (columnSpan) => {
    if (typeof columnSpan === 'number') {
        return Grid_css_1.itemColumnVariants.xs[columnSpan];
    }
    return Object.entries(columnSpan).map(([key, value]) => {
        return Grid_css_1.itemColumnVariants[key][value];
    });
};
const GridItem = ({ children, columnSpan, rowSpan = 1, }) => {
    const className = (0, classnames_1.default)(Grid_css_1.gridItemClass, Grid_css_1.rowSpanVariants[rowSpan], columnSpan && assembleColumnSpanVariants(columnSpan));
    return (react_1.default.createElement("div", { className: className, "data-testid": "kda-grid-item" }, children));
};
exports.GridItem = GridItem;
//# sourceMappingURL=GridItem.js.map