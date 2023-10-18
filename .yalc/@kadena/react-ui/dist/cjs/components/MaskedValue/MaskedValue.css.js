"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.iconContainer = exports.valueContainer = exports.valueIconContainer = exports.titleContainer = void 0;
const sprinkles_css_1 = require("../../styles/sprinkles.css");
const css_1 = require("@vanilla-extract/css");
exports.titleContainer = (0, css_1.style)([
    (0, sprinkles_css_1.sprinkles)({
        display: 'flex',
        fontSize: '$sm',
        fontWeight: '$medium',
        flexDirection: 'column',
        justifyContent: 'center',
        color: '$neutral4',
    }),
    {
        alignSelf: 'stretch',
    },
]);
exports.valueIconContainer = (0, css_1.style)([
    (0, sprinkles_css_1.sprinkles)({
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        gap: '$2',
    }),
]);
exports.valueContainer = (0, css_1.style)([
    (0, sprinkles_css_1.sprinkles)({
        display: 'inline-block',
        fontFamily: '$mono',
        fontWeight: '$semiBold',
        width: '100%',
        color: '$neutral6',
    }),
    {
        wordBreak: 'break-word',
        flex: '1',
    },
]);
exports.iconContainer = (0, css_1.style)([
    (0, sprinkles_css_1.sprinkles)({
        width: '$6',
        height: '$6',
        color: '$neutral6',
    }),
]);
//# sourceMappingURL=MaskedValue.css.js.map