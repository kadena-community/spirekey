"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tagClass = exports.infoClass = exports.headerClass = void 0;
const sprinkles_css_1 = require("../../../../styles/sprinkles.css");
const css_1 = require("@vanilla-extract/css");
exports.headerClass = (0, css_1.style)([
    (0, sprinkles_css_1.sprinkles)({
        display: 'flex',
        alignItems: 'center',
        gap: '$3',
        marginY: '$2',
    }),
]);
exports.infoClass = (0, css_1.style)([
    (0, sprinkles_css_1.sprinkles)({
        display: 'flex',
        alignItems: 'center',
        gap: '$1',
        fontSize: '$xs',
        marginLeft: 'auto',
        color: '$foreground',
    }),
]);
exports.tagClass = (0, css_1.style)([
    (0, sprinkles_css_1.sprinkles)({
        backgroundColor: '$foreground',
        color: '$background',
        borderRadius: '$sm',
        paddingX: '$2',
        fontSize: '$xs',
        fontWeight: '$semiBold',
        display: 'inline-block',
    }),
    {
        paddingTop: '0.05rem',
        paddingBottom: '0.05rem',
    },
]);
//# sourceMappingURL=FormFieldHeader.css.js.map