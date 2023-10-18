"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.profileCardClass = exports.tagClass = exports.linkContainerClass = exports.tagContainerClass = exports.boldTextClass = exports.imageClass = exports.imageContainerClass = void 0;
const sprinkles_css_1 = require("../../styles/sprinkles.css");
const css_1 = require("@vanilla-extract/css");
exports.imageContainerClass = (0, css_1.style)([
    (0, sprinkles_css_1.sprinkles)({
        borderRadius: '$round',
        overflow: 'hidden',
        width: '100%',
    }),
]);
exports.imageClass = (0, css_1.style)([
    (0, sprinkles_css_1.sprinkles)({
        width: '100%',
        height: '100%',
        borderRadius: '$round',
    }),
    {
        objectFit: 'cover',
    },
]);
exports.boldTextClass = (0, css_1.style)([
    (0, sprinkles_css_1.sprinkles)({
        marginY: '$2',
        fontWeight: '$bold',
    }),
]);
const ulClass = (0, css_1.style)([
    (0, sprinkles_css_1.sprinkles)({
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        marginX: 0,
        marginY: '$2',
        padding: 0,
    }),
]);
exports.tagContainerClass = (0, css_1.style)([
    ulClass,
    (0, sprinkles_css_1.sprinkles)({
        flexDirection: 'row',
    }),
    {
        listStyleType: 'none',
    },
]);
exports.linkContainerClass = (0, css_1.style)([
    ulClass,
    (0, sprinkles_css_1.sprinkles)({
        flexDirection: 'column',
        marginLeft: '$4',
    }),
    {},
]);
exports.tagClass = (0, css_1.style)([
    (0, sprinkles_css_1.sprinkles)({
        margin: '$1',
    }),
]);
exports.profileCardClass = (0, css_1.style)([
    (0, sprinkles_css_1.sprinkles)({
        color: '$foreground',
    }),
]);
//# sourceMappingURL=ProfileCard.css.js.map