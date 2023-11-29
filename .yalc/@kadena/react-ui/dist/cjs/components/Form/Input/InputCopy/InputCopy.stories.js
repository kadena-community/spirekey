"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InputCopyStory = void 0;
const Form_1 = require("../../../Form");
const react_1 = __importDefault(require("react"));
const meta = {
    title: 'Form/Input/InputCopy',
    component: Form_1.InputCopy,
    parameters: {
        docs: {
            description: {
                component: 'The InputCopy is a composition of the native Input element and a copy button.',
            },
        },
    },
};
exports.default = meta;
exports.InputCopyStory = {
    name: 'InputCopy',
    args: {
        icon: undefined,
        type: 'text',
        leadingTextWidth: undefined,
        leadingText: '',
        outlined: false,
    },
    render: (props) => {
        return (react_1.default.createElement(react_1.default.Fragment, null,
            react_1.default.createElement(Form_1.InputCopy, { ...props, id: "InputCopyStory", placeholder: "This is a placeholder" })));
    },
};
//# sourceMappingURL=InputCopy.stories.js.map