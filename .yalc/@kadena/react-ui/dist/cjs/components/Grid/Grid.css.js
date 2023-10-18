"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.itemColumnVariants = exports.containerColumnVariants = exports.rowSpanVariants = exports.gapVariants = exports.gridItemClass = exports.gridContainerClass = void 0;
const sprinkles_css_1 = require("../../styles/sprinkles.css");
const themeUtils_1 = require("../../styles/themeUtils");
const css_1 = require("@vanilla-extract/css");
const lodash_mapvalues_1 = __importDefault(require("lodash.mapvalues"));
exports.gridContainerClass = (0, css_1.style)([
    {
        display: 'grid',
    },
]);
exports.gridItemClass = (0, css_1.style)([
    {
        gridColumnStart: 'auto',
    },
]);
exports.gapVariants = (0, css_1.styleVariants)({
    $2xs: [(0, sprinkles_css_1.sprinkles)({ gridGap: '$2xs' })],
    $xs: [(0, sprinkles_css_1.sprinkles)({ gridGap: '$xs' })],
    $sm: [(0, sprinkles_css_1.sprinkles)({ gridGap: '$sm' })],
    $md: [(0, sprinkles_css_1.sprinkles)({ gridGap: '$md' })],
    $lg: [(0, sprinkles_css_1.sprinkles)({ gridGap: '$lg' })],
    $xl: [(0, sprinkles_css_1.sprinkles)({ gridGap: '$xl' })],
    $2xl: [(0, sprinkles_css_1.sprinkles)({ gridGap: '$2xl' })],
    $3xl: [(0, sprinkles_css_1.sprinkles)({ gridGap: '$3xl' })],
});
const columnCount = {
    1: 1,
    2: 2,
    3: 3,
    4: 4,
    5: 5,
    6: 6,
    7: 7,
    8: 8,
    9: 9,
    10: 10,
    11: 11,
    12: 12,
};
exports.rowSpanVariants = (0, css_1.styleVariants)(columnCount, (count) => (0, themeUtils_1.mapToProperty)('gridRow')(`span ${count}`));
exports.containerColumnVariants = (0, lodash_mapvalues_1.default)(themeUtils_1.breakpoints, (mediaQuery) => {
    return (0, css_1.styleVariants)(columnCount, (count) => {
        if (mediaQuery === '') {
            return [
                {
                    gridTemplateColumns: `repeat(${count}, minmax(0, 1fr))`,
                },
            ];
        }
        return [
            {
                '@media': {
                    [mediaQuery]: {
                        gridTemplateColumns: `repeat(${count}, minmax(0, 1fr))`,
                    },
                },
            },
        ];
    });
});
exports.itemColumnVariants = (0, lodash_mapvalues_1.default)(themeUtils_1.breakpoints, (mediaQuery) => {
    return (0, css_1.styleVariants)(columnCount, (count) => {
        if (mediaQuery === '') {
            return [
                {
                    gridColumn: `span ${count}`,
                },
            ];
        }
        return [
            {
                '@media': {
                    [mediaQuery]: {
                        gridColumn: `span ${count}`,
                    },
                },
            },
        ];
    });
});
//# sourceMappingURL=Grid.css.js.map