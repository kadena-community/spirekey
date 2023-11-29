"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Primary = void 0;
const react_1 = __importDefault(require("react"));
const MaskedValue_1 = require("./MaskedValue");
const meta = {
    title: 'Patterns/MaskedValue',
    parameters: {
        status: {
            type: ['experimental'],
        },
        docs: {
            description: {
                component: 'This component will visually render the set value with a mask. The mask will hide part of the value and show a number of asterisks in its stead. The number of unmasked characters can be set with the `startUnmaskedValues` and `endUnmaskedValues` props. The default visibility of the value can be set with the `defaultVisibility` prop.',
            },
        },
    },
    argTypes: {
        title: {
            control: {
                type: 'text',
            },
        },
        value: {
            control: {
                type: 'text',
            },
        },
        defaultVisibility: {
            control: {
                type: 'boolean',
            },
        },
        startUnmaskedValues: {
            control: {
                type: 'number',
            },
        },
        endUnmaskedValues: {
            control: {
                type: 'number',
            },
        },
    },
};
exports.default = meta;
exports.Primary = {
    name: 'MaskedValue',
    args: {
        title: 'Account',
        value: 'k:1234567890abcdef',
        defaultVisibility: false,
        startUnmaskedValues: 6,
        endUnmaskedValues: 4,
    },
    render: ({ title, value, defaultVisibility, startUnmaskedValues, endUnmaskedValues, }) => {
        return (react_1.default.createElement(react_1.default.Fragment, null,
            react_1.default.createElement(MaskedValue_1.MaskedValue, { title: title, value: value, defaultVisibility: defaultVisibility, startUnmaskedValues: startUnmaskedValues, endUnmaskedValues: endUnmaskedValues })));
    },
};
//# sourceMappingURL=MaskedValue.stories.js.map