"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.lineStyle = exports.circleLineContainerStyle = exports.circleStyle = exports.textContainerStyle = exports.checkpointContainerStyle = exports.progressBarContentStyle = exports.progressBarStyle = exports.textColorVariant = exports.lineColorVariant = exports.circleColorVariant = void 0;
const colors_1 = require("../../styles/colors");
const sprinkles_css_1 = require("../../styles/sprinkles.css");
const css_1 = require("@vanilla-extract/css");
exports.circleColorVariant = (0, css_1.styleVariants)({
    complete: [
        (0, sprinkles_css_1.sprinkles)({
            backgroundColor: '$infoAccent',
        }),
    ],
    pending: [
        (0, sprinkles_css_1.sprinkles)({
            backgroundColor: '$negativeAccent',
        }),
    ],
    incomplete: [
        (0, sprinkles_css_1.sprinkles)({
            borderWidth: '$md',
            borderColor: '$neutral3',
            borderStyle: 'solid',
        }),
    ],
});
exports.lineColorVariant = (0, css_1.styleVariants)({
    complete: [
        {
            backgroundImage: `linear-gradient(${colors_1.colorPalette.$blue60} 33%, rgba(255,255,255,0) 0%)`,
        },
    ],
    pending: [
        {
            backgroundImage: `linear-gradient(${colors_1.colorPalette.$red60} 33%, rgba(255,255,255,0) 0%)`,
        },
    ],
    incomplete: [
        {
            backgroundImage: `linear-gradient(${colors_1.colorPalette.$gray40} 33%, rgba(255,255,255,0) 0%)`,
        },
    ],
});
exports.textColorVariant = (0, css_1.styleVariants)({
    complete: [
        (0, sprinkles_css_1.sprinkles)({
            color: '$neutral6',
        }),
    ],
    pending: [
        (0, sprinkles_css_1.sprinkles)({
            color: '$neutral6',
        }),
    ],
    incomplete: [
        (0, sprinkles_css_1.sprinkles)({
            color: '$neutral3',
        }),
    ],
});
exports.progressBarStyle = (0, css_1.style)([
    (0, sprinkles_css_1.sprinkles)({
        display: 'flex',
        height: '100%',
    }),
]);
exports.progressBarContentStyle = (0, css_1.style)([
    (0, sprinkles_css_1.sprinkles)({
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        marginLeft: '$6',
    }),
]);
exports.checkpointContainerStyle = (0, css_1.style)([
    (0, sprinkles_css_1.sprinkles)({
        display: 'flex',
        alignItems: 'center',
        gap: '$4',
    }),
    {
        alignSelf: 'stretch',
    },
]);
exports.textContainerStyle = (0, css_1.style)([
    (0, sprinkles_css_1.sprinkles)({
        fontSize: '$xs',
        fontFamily: '$main',
        fontWeight: '$normal',
        lineHeight: '$base',
        paddingTop: '$1',
        marginBottom: '$lg',
    }),
    {
        flex: 1,
    },
]);
exports.circleStyle = (0, css_1.style)([
    (0, sprinkles_css_1.sprinkles)({
        borderRadius: '$round',
        width: '$sm',
        height: '$sm',
    }),
]);
exports.circleLineContainerStyle = (0, css_1.style)([
    (0, sprinkles_css_1.sprinkles)({
        width: '$2',
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        flexDirection: 'column',
        gap: '$1',
    }),
    {
        alignSelf: 'stretch',
        paddingTop: '6px',
    },
    {
        selectors: {
            '&:first-child': {
                paddingTop: '$1',
            },
            '&:last-child': {
                paddingBottom: '$1',
            },
        },
    },
]);
exports.lineStyle = (0, css_1.style)([
    (0, sprinkles_css_1.sprinkles)({
        width: '$1',
        position: 'relative',
    }),
    {
        top: 0,
        bottom: 0,
        left: '5px',
        flex: 1,
        backgroundPosition: 'left',
        backgroundSize: '1px 10px',
        backgroundRepeat: 'repeat-y',
    },
]);
//# sourceMappingURL=ProgressBar.css.js.map