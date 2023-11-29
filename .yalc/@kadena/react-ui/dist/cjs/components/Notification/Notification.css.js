"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.iconClass = exports.actionButtonColorVariants = exports.actionsContainerClass = exports.titleClass = exports.contentClass = exports.closeButtonClass = exports.displayVariants = exports.cardColorVariants = exports.colorVariants = exports.containerClass = void 0;
const sprinkles_css_1 = require("../../styles/sprinkles.css");
const vars_css_1 = require("../../styles/vars.css");
const css_1 = require("@vanilla-extract/css");
const accentVar = (0, css_1.createVar)();
exports.containerClass = (0, css_1.style)([
    (0, sprinkles_css_1.sprinkles)({
        display: 'flex',
        alignItems: 'flex-start',
        padding: '$sm',
        gap: '$sm',
        width: '100%',
    }),
]);
exports.colorVariants = {
    info: 'info',
    positive: 'positive',
    warning: 'warning',
    negative: 'negative',
};
exports.cardColorVariants = (0, css_1.styleVariants)(exports.colorVariants, (color) => {
    return [
        (0, sprinkles_css_1.sprinkles)({
            backgroundColor: `$${color}SurfaceInverted`,
            borderColor: `$${color}ContrastInverted`,
            color: `$${color}ContrastInverted`,
        }),
        {
            vars: {
                [accentVar]: vars_css_1.vars.colors[`$${color}ContrastInverted`],
            },
        },
    ];
});
exports.displayVariants = (0, css_1.styleVariants)({
    bordered: [
        (0, sprinkles_css_1.sprinkles)({
            borderStyle: 'solid',
            borderWidth: '$sm',
            borderRadius: '$sm',
        }),
        {
            borderLeftWidth: vars_css_1.vars.sizes.$1,
        },
    ],
    borderless: [],
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
        color: '$neutral6',
        fontSize: '$base',
        gap: '$xs',
        maxWidth: '$maxContentWidth',
    }),
    {
        marginTop: 2,
    },
]);
exports.titleClass = (0, css_1.style)([
    (0, sprinkles_css_1.sprinkles)({
        fontSize: '$base',
        fontWeight: '$bold',
        marginBottom: '$xs',
    }),
    {
        color: accentVar,
    },
]);
exports.actionsContainerClass = (0, css_1.style)([
    (0, sprinkles_css_1.sprinkles)({
        marginTop: '$md',
        display: 'flex',
        justifyContent: 'flex-start',
        gap: '$xl',
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
exports.iconClass = (0, css_1.style)([
    (0, sprinkles_css_1.sprinkles)({
        color: 'inherit',
        size: '$6',
    }),
]);
//# sourceMappingURL=Notification.css.js.map