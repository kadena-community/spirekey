"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.actionButtonColorVariants = exports.actionsContainerClass = exports.descriptionClass = exports.titleClass = exports.contentClass = exports.closeButtonClass = exports.inlineVariants = exports.displayVariants = exports.expandVariants = exports.cardColorVariants = exports.containerWrapperClass = exports.containerClass = exports.colorVariants = void 0;
const sprinkles_css_1 = require("../../styles/sprinkles.css");
const vars_css_1 = require("../../styles/vars.css");
const css_1 = require("@vanilla-extract/css");
exports.colorVariants = {
    info: 'info',
    positive: 'positive',
    warning: 'warning',
    negative: 'negative',
    primary: 'primary',
};
exports.containerClass = (0, css_1.style)([
    (0, sprinkles_css_1.sprinkles)({
        display: 'flex',
        alignItems: 'flex-start',
        borderStyle: 'solid',
        justifyContent: 'center',
    }),
    {
        borderLeftWidth: vars_css_1.vars.sizes.$1,
    },
]);
exports.containerWrapperClass = (0, css_1.style)([
    (0, sprinkles_css_1.sprinkles)({
        padding: '$md',
        display: 'flex',
        width: '100%',
        alignItems: 'flex-start',
        gap: '$md',
    }),
    {
        maxWidth: 1440,
    },
]);
exports.cardColorVariants = (0, css_1.styleVariants)(exports.colorVariants, (color) => {
    return [
        (0, sprinkles_css_1.sprinkles)({
            backgroundColor: `$${color}SurfaceInverted`,
            borderColor: `$${color}ContrastInverted`,
            color: `$${color}ContrastInverted`,
        }),
    ];
});
exports.expandVariants = (0, css_1.styleVariants)({
    true: [(0, sprinkles_css_1.sprinkles)({ width: '100%', maxWidth: '100%' })],
    false: [(0, sprinkles_css_1.sprinkles)({ width: 'max-content', maxWidth: 'maxContent' })],
});
exports.displayVariants = (0, css_1.styleVariants)({
    outlined: [(0, sprinkles_css_1.sprinkles)({ borderWidth: '$sm', borderRadius: '$sm' })],
    standard: [(0, sprinkles_css_1.sprinkles)({ border: 'none', borderRadius: 0 })],
});
exports.inlineVariants = (0, css_1.styleVariants)({
    true: [
        (0, sprinkles_css_1.sprinkles)({
            display: 'flex',
            alignItems: {
                md: 'flex-start',
            },
            flexDirection: {
                md: 'row',
            },
        }),
    ],
    false: [],
});
exports.closeButtonClass = (0, css_1.style)([
    (0, sprinkles_css_1.sprinkles)({
        marginLeft: 'auto',
        padding: 0,
        border: 'none',
        backgroundColor: 'transparent',
        cursor: 'pointer',
        color: 'inherit',
    }),
]);
exports.contentClass = (0, css_1.style)([
    (0, sprinkles_css_1.sprinkles)({
        display: 'flex',
        flexDirection: 'column',
        gap: '$xs',
        width: '100%',
    }),
    {
        marginTop: 2,
    },
]);
exports.titleClass = (0, css_1.style)([
    (0, sprinkles_css_1.sprinkles)({
        color: 'inherit',
        fontSize: '$base',
        fontWeight: '$bold',
    }),
]);
exports.descriptionClass = (0, css_1.style)([
    (0, sprinkles_css_1.sprinkles)({
        color: '$neutral6',
        fontSize: '$base',
    }),
]);
exports.actionsContainerClass = (0, css_1.style)([
    (0, sprinkles_css_1.sprinkles)({
        marginTop: '$lg',
        display: 'flex',
        justifyContent: 'flex-start',
        gap: '$12',
    }),
]);
const actionButtonClass = (0, css_1.style)([
    (0, sprinkles_css_1.sprinkles)({
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',
        border: 'none',
        margin: 0,
        padding: 0,
        gap: '$3',
        fontSize: '$base',
        fontWeight: '$bold',
        cursor: 'pointer',
    }),
]);
exports.actionButtonColorVariants = (0, css_1.styleVariants)(exports.colorVariants, (color) => {
    return [
        actionButtonClass,
        (0, sprinkles_css_1.sprinkles)({
            color: `$${color}ContrastInverted`,
        }),
    ];
});
//# sourceMappingURL=Notification.css.js.map