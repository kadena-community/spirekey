"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Primary = void 0;
const Box_1 = require("../Box");
const vars_css_1 = require("../../styles/vars.css");
const react_1 = __importDefault(require("react"));
const stories_css_1 = require("./stories.css");
const selectOptions = [
    undefined,
    ...Object.keys(vars_css_1.vars.sizes),
];
const meta = {
    title: 'Layout/Box',
    parameters: {
        docs: {
            description: {
                component: 'Box is the most basic building block of application layout.\n' +
                    '\nThis component allows for passing the <i>display</i>, <i>margin</i> and <i>padding</i> properties.',
            },
        },
    },
    argTypes: {
        margin: {
            options: selectOptions,
            control: {
                type: 'select',
            },
            description: 'Value for margin property with pre-defined size values.',
        },
        marginX: {
            options: selectOptions,
            control: {
                type: 'select',
            },
            description: 'Value for margin property on X axis with pre-defined size values.',
        },
        marginY: {
            options: selectOptions,
            control: {
                type: 'select',
            },
            description: 'Value for margin property on Y axis with pre-defined size values.',
        },
        marginTop: {
            options: selectOptions,
            control: {
                type: 'select',
            },
            description: 'Value for top margin property with pre-defined size values.',
        },
        marginBottom: {
            options: selectOptions,
            control: {
                type: 'select',
            },
            description: 'Value for top margin property with pre-defined size values.',
        },
        marginLeft: {
            options: selectOptions,
            control: {
                type: 'select',
            },
            description: 'Value for left margin property with pre-defined size values.',
        },
        marginRight: {
            options: selectOptions,
            control: {
                type: 'select',
            },
            description: 'Value for right margin property with pre-defined size values.',
        },
        padding: {
            options: selectOptions,
            control: {
                type: 'select',
            },
            description: 'Value for padding property with pre-defined size values.',
        },
        paddingX: {
            options: selectOptions,
            control: {
                type: 'select',
            },
            description: 'Value for padding property on X axis with pre-defined size values.',
        },
        paddingY: {
            options: selectOptions,
            control: {
                type: 'select',
            },
            description: 'Value for padding property on Y axis with pre-defined size values.',
        },
        paddingTop: {
            options: selectOptions,
            control: {
                type: 'select',
            },
            description: 'Value for top padding property with pre-defined size values.',
        },
        paddingBottom: {
            options: selectOptions,
            control: {
                type: 'select',
            },
            description: 'Value for bottom padding property with pre-defined size values.',
        },
        paddingLeft: {
            options: selectOptions,
            control: {
                type: 'select',
            },
            description: 'Value for left padding property with pre-defined size values.',
        },
        paddingRight: {
            options: selectOptions,
            control: {
                type: 'select',
            },
            description: 'Value for right padding property with pre-defined size values.',
        },
    },
};
exports.default = meta;
exports.Primary = {
    name: 'Box - Margin',
    args: {
        margin: undefined,
        marginX: undefined,
        marginY: undefined,
        marginTop: undefined,
        marginBottom: undefined,
        marginLeft: undefined,
        marginRight: undefined,
        padding: undefined,
        paddingX: undefined,
        paddingY: undefined,
        paddingTop: undefined,
        paddingBottom: undefined,
        paddingLeft: undefined,
        paddingRight: undefined,
    },
    render: ({ margin, marginX, marginY, marginTop, marginBottom, marginLeft, marginRight, padding, paddingX, paddingY, paddingTop, paddingBottom, paddingLeft, paddingRight, }) => (react_1.default.createElement("div", { className: stories_css_1.containerClass },
        react_1.default.createElement(Box_1.Box, { margin: margin, marginX: marginX, marginY: marginY, marginTop: marginTop, marginBottom: marginBottom, marginLeft: marginLeft, marginRight: marginRight, padding: padding, paddingX: paddingX, paddingY: paddingY, paddingTop: paddingTop, paddingBottom: paddingBottom, paddingLeft: paddingLeft, paddingRight: paddingRight },
            react_1.default.createElement("div", { className: stories_css_1.contentClass }, "Box Content")))),
};
//# sourceMappingURL=Box.stories.js.map