"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TrackerWarningContainer = exports.LabelValue = exports.LabelTitle = exports.LabelValueContainer = exports.DataContainer = exports.ContentContainer = exports.CardContainer = exports.gapValueLabelVariant = exports.warningVariant = exports.displayVariant = exports.gridVariant = exports.layoutVariant = void 0;
const sprinkles_css_1 = require("../../styles/sprinkles.css");
const vars_css_1 = require("../../styles/vars.css");
const css_1 = require("@vanilla-extract/css");
exports.layoutVariant = (0, css_1.styleVariants)({
    horizontal: [
        (0, sprinkles_css_1.sprinkles)({
            flexDirection: 'row',
        }),
    ],
    vertical: [
        (0, sprinkles_css_1.sprinkles)({
            flexDirection: 'column',
        }),
    ],
});
exports.gridVariant = (0, css_1.styleVariants)({
    horizontal: [
        {
            gridTemplateRows: 'auto 1fr',
        },
    ],
    vertical: [
        {
            gridTemplateColumns: 'auto 1fr',
        },
    ],
});
exports.displayVariant = (0, css_1.styleVariants)({
    horizontal: [
        (0, sprinkles_css_1.sprinkles)({
            display: 'grid',
        }),
        {
            gridTemplateColumns: '1fr 1fr',
        },
    ],
    vertical: [
        (0, sprinkles_css_1.sprinkles)({
            display: 'grid',
        }),
        {
            gridTemplateRows: 'auto 1fr',
        },
    ],
});
exports.warningVariant = (0, css_1.styleVariants)({
    mild: [
        (0, sprinkles_css_1.sprinkles)({
            color: '$warningContrastInverted',
        }),
    ],
    severe: [
        (0, sprinkles_css_1.sprinkles)({
            color: '$negativeContrastInverted',
        }),
    ],
});
exports.gapValueLabelVariant = (0, css_1.styleVariants)({
    horizontal: [
        (0, sprinkles_css_1.sprinkles)({
            gap: '$2',
        }),
    ],
    vertical: [
        (0, sprinkles_css_1.sprinkles)({
            gap: 0,
        }),
    ],
});
exports.CardContainer = (0, css_1.style)([
    (0, sprinkles_css_1.sprinkles)({
        display: 'grid',
        padding: '$3',
        gap: '$2',
        marginTop: '$sm',
        borderRadius: '$sm',
        alignItems: 'flex-start',
        fontSize: '$sm',
        background: {
            lightMode: '$white',
            darkMode: '$gray100',
        },
    }),
    {
        border: `1px solid ${vars_css_1.vars.colors.$borderDefault}`,
        selectors: {
            [`${vars_css_1.darkThemeClass} &`]: {
                border: `1px solid ${vars_css_1.vars.colors.$gray60}`,
            },
        },
    },
]);
exports.ContentContainer = (0, css_1.style)([
    (0, sprinkles_css_1.sprinkles)({
        display: 'flex',
        gap: '$2',
        flexDirection: 'column',
    }),
]);
exports.DataContainer = (0, css_1.style)([
    (0, sprinkles_css_1.sprinkles)({
        display: 'grid',
        flexDirection: 'column',
        alignItems: 'flex-start',
        gap: '$4',
    }),
]);
exports.LabelValueContainer = (0, css_1.style)([
    (0, sprinkles_css_1.sprinkles)({
        alignItems: 'flex-start',
    }),
]);
exports.LabelTitle = (0, css_1.style)([
    (0, sprinkles_css_1.sprinkles)({
        display: 'flex',
        flexDirection: 'column',
        fontSize: '$sm',
        fontWeight: '$medium',
        fontFamily: '$main',
        color: '$neutral4',
        wordBreak: 'break-word',
    }),
    {
        alignSelf: 'stretch',
    },
]);
exports.LabelValue = (0, css_1.style)([
    (0, sprinkles_css_1.sprinkles)({
        display: 'inline-block',
        fontWeight: '$normal',
        fontFamily: '$mono',
        color: '$neutral6',
        wordBreak: 'break-word',
    }),
]);
exports.TrackerWarningContainer = (0, css_1.style)([
    (0, sprinkles_css_1.sprinkles)({
        display: 'inline-block',
        flexDirection: 'column',
        alignItems: 'flex-start',
        fontWeight: '$normal',
        fontSize: '$xs',
    }),
]);
//# sourceMappingURL=TrackerCard.css.js.map