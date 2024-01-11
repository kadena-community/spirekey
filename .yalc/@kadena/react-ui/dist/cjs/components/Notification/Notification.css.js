"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.actionButtonIconClass = exports.actionButtonIntentVariants = exports.actionsContainerClass = exports.iconClass = exports.titleClass = exports.contentClass = exports.closeButtonClass = exports.notificationRecipe = void 0;
const atoms_css_1 = require("../../styles/atoms.css");
const contract_css_1 = require("../../styles/tokens/contract.css");
const css_1 = require("@vanilla-extract/css");
const recipes_1 = require("@vanilla-extract/recipes");
const iconColorVar = (0, css_1.createVar)();
const semanticColors = ['info', 'positive', 'warning', 'negative'];
exports.notificationRecipe = (0, recipes_1.recipe)({
    base: [
        (0, atoms_css_1.atoms)({
            display: 'flex',
            alignItems: 'flex-start',
            padding: 'md',
            gap: 'sm',
            width: '100%',
        }),
    ],
    variants: {
        intent: semanticColors.reduce((acc, color) => {
            var _a;
            acc[color] = [
                (0, atoms_css_1.atoms)({
                    backgroundColor: `semantic.${color}.default`,
                    borderColor: `semantic.${color}.default`,
                    color: `text.semantic.${color}.default`,
                }),
                {
                    vars: {
                        [iconColorVar]: (_a = contract_css_1.tokens.kda.foundation.color.icon.semantic[color]) === null || _a === void 0 ? void 0 : _a.default,
                    },
                },
            ];
            return acc;
        }, {}),
        displayStyle: {
            bordered: [
                (0, atoms_css_1.atoms)({
                    borderStyle: 'solid',
                    borderWidth: 'hairline',
                    borderRadius: 'sm',
                }),
                {
                    borderLeftWidth: contract_css_1.tokens.kda.foundation.border.width.thick,
                },
            ],
            borderless: [],
        },
    },
    defaultVariants: {
        intent: 'info',
        displayStyle: 'bordered',
    },
});
exports.closeButtonClass = (0, css_1.style)([
    (0, atoms_css_1.atoms)({
        marginInlineStart: 'auto',
        padding: 'no',
        border: 'none',
        backgroundColor: 'transparent',
        cursor: 'pointer',
    }),
    {
        color: iconColorVar,
    },
]);
exports.contentClass = (0, css_1.style)([
    (0, atoms_css_1.atoms)({
        fontSize: 'base',
        gap: 'xs',
        maxWidth: 'content.maxWidth',
        marginBlockStart: 'xxs',
    }),
]);
exports.titleClass = (0, css_1.style)([
    (0, atoms_css_1.atoms)({
        fontSize: 'base',
        fontWeight: 'bodyFont.bold',
        marginBlockEnd: 'xs',
    }),
]);
exports.iconClass = (0, css_1.style)([
    (0, atoms_css_1.atoms)({
        flexShrink: 0,
    }),
    {
        color: iconColorVar,
        width: contract_css_1.tokens.kda.foundation.icon.size.base,
        height: contract_css_1.tokens.kda.foundation.icon.size.base,
    },
]);
exports.actionsContainerClass = (0, css_1.style)([
    (0, atoms_css_1.atoms)({
        marginBlockStart: 'md',
        display: 'flex',
        justifyContent: 'flex-start',
        gap: 'xl',
    }),
]);
const actionIconVar = (0, css_1.createVar)();
const actionButtonBase = (0, atoms_css_1.atoms)({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    border: 'none',
    margin: 'no',
    padding: 'no',
    fontSize: 'base',
    fontWeight: 'bodyFont.bold',
    cursor: 'pointer',
});
const actionButtonColors = semanticColors.reduce((acc, color) => {
    acc[color] = color;
    return acc;
}, {});
exports.actionButtonIntentVariants = (0, css_1.styleVariants)(actionButtonColors, (color) => {
    var _a;
    return [
        actionButtonBase,
        (0, atoms_css_1.atoms)({
            color: `text.semantic.${color}.default`,
        }),
        {
            vars: {
                [actionIconVar]: (_a = contract_css_1.tokens.kda.foundation.color.icon.semantic[color]) === null || _a === void 0 ? void 0 : _a.default,
            },
        },
    ];
});
exports.actionButtonIconClass = (0, css_1.style)([
    (0, atoms_css_1.atoms)({
        marginInlineStart: 'sm',
    }),
    {
        color: actionIconVar,
    },
]);
//# sourceMappingURL=Notification.css.js.map