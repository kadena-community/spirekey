"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.titleWrapper = exports.closeButton = exports.modal = exports.wrapper = exports.background = exports.openModal = void 0;
const sprinkles_css_1 = require("../../styles/sprinkles.css");
const themeUtils_1 = require("../../styles/themeUtils");
const css_1 = require("@vanilla-extract/css");
exports.openModal = (0, css_1.style)([
    {
        height: '100vh',
        overflowY: 'hidden',
    },
]);
exports.background = (0, css_1.style)([
    (0, sprinkles_css_1.sprinkles)({
        position: 'fixed',
        backgroundColor: '$neutral4',
        padding: 0,
        cursor: 'pointer',
    }),
    {
        inset: 0,
        opacity: '.8',
    },
]);
exports.wrapper = (0, css_1.style)([
    (0, sprinkles_css_1.sprinkles)({
        position: 'fixed',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'stretch',
        pointerEvents: 'none',
        width: '100%',
        marginX: {
            xs: 0,
            sm: '$4',
            md: 'auto',
        },
    }),
    (0, themeUtils_1.responsiveStyle)({
        xs: {
            maxWidth: '700px',
            inset: 0,
        },
        md: {
            width: '75vw',
        },
        lg: {
            width: '50vw',
        },
    }),
]);
exports.modal = (0, css_1.style)([
    (0, sprinkles_css_1.sprinkles)({
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
    }),
    {
        maxHeight: '75vh',
        pointerEvents: 'initial',
    },
]);
exports.closeButton = (0, css_1.style)([
    (0, sprinkles_css_1.sprinkles)({
        position: 'absolute',
        top: '$8',
        right: '$md',
        display: 'flex',
        alignItems: 'center',
        backgroundColor: 'transparent',
        fontSize: '$base',
        fontWeight: '$light',
        border: 'none',
        padding: 0,
        cursor: 'pointer',
    }),
    {
        alignSelf: 'end',
    },
]);
exports.titleWrapper = (0, css_1.style)([
    (0, sprinkles_css_1.sprinkles)({
        height: '$12',
        marginBottom: '$4',
    }),
    {
        width: 'calc(100% - 100px)',
    },
]);
//# sourceMappingURL=Modal.css.js.map