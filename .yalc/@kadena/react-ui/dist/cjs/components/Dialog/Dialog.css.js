"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.contentClass = exports.footerClass = exports.titleWrapperClass = exports.closeButtonClass = exports.overlayClass = exports.openModal = void 0;
const sprinkles_css_1 = require("../../styles/sprinkles.css");
const themeUtils_1 = require("../../styles/themeUtils");
const vars_css_1 = require("../../styles/vars.css");
const css_1 = require("@vanilla-extract/css");
const Card_css_1 = require("../Card/Card.css");
exports.openModal = (0, css_1.style)([
    {
        height: '100vh',
        overflowY: 'hidden',
    },
]);
exports.overlayClass = (0, css_1.style)([
    Card_css_1.containerClass,
    (0, sprinkles_css_1.sprinkles)({
        position: 'relative',
        pointerEvents: 'initial',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
    }),
    (0, themeUtils_1.responsiveStyle)({
        xs: {
            maxHeight: '100svh',
            maxWidth: '100vw',
            inset: 0,
        },
        md: {
            maxWidth: vars_css_1.vars.contentWidth.$maxContentWidth,
            maxHeight: '75vh',
        },
    }),
]);
exports.closeButtonClass = (0, css_1.style)([
    (0, sprinkles_css_1.sprinkles)({
        position: 'absolute',
        top: '$xs',
        right: '$xs',
        display: 'flex',
        alignItems: 'center',
        background: 'none',
        border: 'none',
        padding: '$xs',
        cursor: 'pointer',
        color: 'inherit',
    }),
]);
exports.titleWrapperClass = (0, css_1.style)([
    (0, sprinkles_css_1.sprinkles)({
        marginBottom: '$4',
        marginRight: '$20',
        flexShrink: 0,
    }),
]);
exports.footerClass = (0, css_1.style)([(0, sprinkles_css_1.sprinkles)({ flexShrink: 0 })]);
exports.contentClass = (0, css_1.style)([
    (0, sprinkles_css_1.sprinkles)({
        flex: 1,
        paddingX: '$10',
        overflowY: 'auto',
    }),
    {
        marginLeft: `-2.5rem`,
        marginRight: `-2.5rem`,
    },
]);
//# sourceMappingURL=Dialog.css.js.map