"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Primary = void 0;
const _storyDecorators_1 = require("../../storyDecorators");
const react_1 = __importDefault(require("react"));
const Icon_1 = require("../Icon");
const TrackerCard_1 = require("./TrackerCard");
const TrackerCard_css_1 = require("./TrackerCard.css");
const meta = {
    title: 'Patterns/TrackerCard',
    decorators: [_storyDecorators_1.withContentWidth],
    parameters: {
        status: {
            type: ['experimental'],
        },
        docs: {
            description: {
                component: 'The TrackerCard component renders a card with a title, label values, and an optional icon. The layout of the card can be set to either horizonal or vertical with the `variant` prop.',
            },
        },
    },
    argTypes: {
        variant: {
            options: Object.keys(TrackerCard_css_1.layoutVariant),
            control: {
                type: 'select',
            },
        },
        labelValues: {
            control: {
                type: 'object',
            },
        },
        helperText: {
            control: {
                type: 'text',
            },
        },
        helperTextType: {
            control: {
                type: 'select',
            },
            options: ['mild', 'severe'],
        },
        icon: {
            options: [
                undefined,
                ...Object.keys(Icon_1.ProductIcon),
            ],
            control: {
                type: 'select',
            },
        },
    },
};
exports.default = meta;
const labelValues = [
    {
        label: 'Account Label',
        value: 'k:1234567890abcdef',
        isAccount: true,
    },
    {
        label: 'Balance',
        value: '1000',
    },
    {
        label: 'Transfer',
        value: '25',
    },
];
exports.Primary = {
    name: 'TrackerCard',
    args: {
        labelValues: labelValues,
        helperText: 'This is a helper text',
        helperTextType: 'mild',
        icon: 'QuickStart',
        variant: 'vertical',
    },
    render: ({ labelValues, helperText, helperTextType, icon, variant }) => {
        return (react_1.default.createElement(TrackerCard_1.TrackerCard, { variant: variant, labelValues: labelValues, helperText: helperText, helperTextType: helperTextType, icon: icon }));
    },
};
//# sourceMappingURL=TrackerCard.stories.js.map