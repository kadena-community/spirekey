"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.accordionContentClass = exports.accordionToggleIconClass = exports.accordionButtonClass = exports.accordionHeadingTitleClass = exports.accordionSectionClass = void 0;
const sprinkles_css_1 = require("../../styles/sprinkles.css");
const vars_css_1 = require("../../styles/vars.css");
const css_1 = require("@vanilla-extract/css");
exports.accordionSectionClass = (0, css_1.style)([
    (0, sprinkles_css_1.sprinkles)({
        display: 'block',
        marginBottom: '$4',
        overflow: 'hidden',
    }),
    {
        borderBottom: `1px solid ${vars_css_1.vars.colors.$borderDefault}`,
        selectors: {
            '&:last-child': {
                marginBottom: 0,
            },
        },
    },
]);
exports.accordionHeadingTitleClass = (0, css_1.style)([
    (0, sprinkles_css_1.sprinkles)({
        fontSize: '$base',
    }),
]);
exports.accordionButtonClass = (0, css_1.style)([
    (0, sprinkles_css_1.sprinkles)({
        alignItems: 'center',
        background: 'none',
        border: 'none',
        color: '$neutral5',
        cursor: 'pointer',
        display: 'flex',
        fontSize: '$base',
        fontWeight: '$semiBold',
        justifyContent: 'space-between',
        padding: 0,
        paddingBottom: '$2',
        paddingRight: '$1',
        textAlign: 'left',
        width: '100%',
    }),
]);
exports.accordionToggleIconClass = (0, css_1.style)([
    (0, sprinkles_css_1.sprinkles)({
        color: '$neutral5',
    }),
    {
        transform: 'rotate(45deg)',
        transition: 'transform 0.2s ease',
        selectors: {
            '&.isOpen': {
                transform: 'rotate(180deg)',
            },
        },
    },
]);
exports.accordionContentClass = (0, css_1.style)([
    (0, sprinkles_css_1.sprinkles)({
        color: '$neutral5',
        fontSize: '$base',
        margin: 0,
        overflow: 'hidden',
        padding: 0,
        paddingBottom: '$2',
    }),
]);
//# sourceMappingURL=Accordion.css.js.map