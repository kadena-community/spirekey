"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.contentClass = exports.footerClass = exports.titleWrapperClass = exports.closeButtonClass = exports.overlayClass = exports.openModal = void 0;
const atoms_css_1 = require("../../styles/atoms.css");
const index_1 = require("../../styles/index");
const themeUtils_1 = require("../../styles/themeUtils");
const css_1 = require("@vanilla-extract/css");
const css_utils_1 = require("@vanilla-extract/css-utils");
const Card_css_1 = require("../Card/Card.css");
exports.openModal = (0, css_1.style)([
    {
        height: '100vh',
        overflowY: 'hidden',
    },
]);
exports.overlayClass = (0, css_1.style)([
    Card_css_1.containerClass,
    (0, atoms_css_1.atoms)({
        position: 'relative',
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
        sm: {
            minWidth: index_1.tokens.kda.foundation.layout.content.minWidth,
        },
        md: {
            maxWidth: index_1.tokens.kda.foundation.layout.content.maxWidth,
            maxHeight: '75vh',
        },
    }),
]);
exports.closeButtonClass = (0, css_1.style)([
    (0, atoms_css_1.atoms)({
        position: 'absolute',
        display: 'flex',
        alignItems: 'center',
        background: 'none',
        border: 'none',
        padding: 'xs',
        cursor: 'pointer',
        color: 'icon.base.default',
    }),
    {
        top: index_1.tokens.kda.foundation.spacing.md,
        right: index_1.tokens.kda.foundation.spacing.md,
    },
]);
exports.titleWrapperClass = (0, css_1.style)([
    (0, atoms_css_1.atoms)({
        marginBlockEnd: 'md',
        marginInlineEnd: 'xxl',
        flexShrink: 0,
    }),
]);
exports.footerClass = (0, css_1.style)([(0, atoms_css_1.atoms)({ flexShrink: 0 })]);
exports.contentClass = (0, css_1.style)([
    (0, atoms_css_1.atoms)({
        flex: 1,
        paddingInline: 'xxxl',
        overflowY: 'auto',
    }),
    {
        marginLeft: (0, css_utils_1.calc)(index_1.tokens.kda.foundation.spacing.xxl).negate().toString(),
        marginRight: (0, css_utils_1.calc)(index_1.tokens.kda.foundation.spacing.xxl).negate().toString(),
    },
]);
//# sourceMappingURL=Dialog.css.js.map