import { atoms } from '../../styles/atoms.css';
import { tokens } from '../../styles/tokens/contract.css';
import { createVar, style, styleVariants } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';
const iconColorVar = createVar();
const semanticColors = ['info', 'positive', 'warning', 'negative'];
export const notificationRecipe = recipe({
    base: [
        atoms({
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
                atoms({
                    backgroundColor: `semantic.${color}.default`,
                    borderColor: `semantic.${color}.default`,
                    color: `text.semantic.${color}.default`,
                }),
                {
                    vars: {
                        [iconColorVar]: (_a = tokens.kda.foundation.color.icon.semantic[color]) === null || _a === void 0 ? void 0 : _a.default,
                    },
                },
            ];
            return acc;
        }, {}),
        displayStyle: {
            bordered: [
                atoms({
                    borderStyle: 'solid',
                    borderWidth: 'hairline',
                    borderRadius: 'sm',
                }),
                {
                    borderLeftWidth: tokens.kda.foundation.border.width.thick,
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
export const closeButtonClass = style([
    atoms({
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
export const contentClass = style([
    atoms({
        fontSize: 'base',
        gap: 'xs',
        maxWidth: 'content.maxWidth',
        marginBlockStart: 'xxs',
    }),
]);
export const titleClass = style([
    atoms({
        fontSize: 'base',
        fontWeight: 'bodyFont.bold',
        marginBlockEnd: 'xs',
    }),
]);
export const iconClass = style([
    atoms({
        flexShrink: 0,
    }),
    {
        color: iconColorVar,
        width: tokens.kda.foundation.icon.size.base,
        height: tokens.kda.foundation.icon.size.base,
    },
]);
export const actionsContainerClass = style([
    atoms({
        marginBlockStart: 'md',
        display: 'flex',
        justifyContent: 'flex-start',
        gap: 'xl',
    }),
]);
const actionIconVar = createVar();
const actionButtonBase = atoms({
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
export const actionButtonIntentVariants = styleVariants(actionButtonColors, (color) => {
    var _a;
    return [
        actionButtonBase,
        atoms({
            color: `text.semantic.${color}.default`,
        }),
        {
            vars: {
                [actionIconVar]: (_a = tokens.kda.foundation.color.icon.semantic[color]) === null || _a === void 0 ? void 0 : _a.default,
            },
        },
    ];
});
export const actionButtonIconClass = style([
    atoms({
        marginInlineStart: 'sm',
    }),
    {
        color: actionIconVar,
    },
]);
//# sourceMappingURL=Notification.css.js.map