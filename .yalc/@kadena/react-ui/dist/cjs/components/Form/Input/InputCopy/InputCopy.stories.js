"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InputCopyStory = void 0;
const Form_1 = require("../../../Form");
const _storyDecorators_1 = require("../../../../storyDecorators");
const react_1 = __importDefault(require("react"));
const meta = {
    title: 'Form/Input/InputCopy',
    component: Form_1.InputCopy,
    decorators: [_storyDecorators_1.withContentWidth, _storyDecorators_1.onLayer2],
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
        type: 'text',
        leadingText: '',
        outlined: false,
    },
    render: (props) => {
        return (react_1.default.createElement(react_1.default.Fragment, null,
            react_1.default.createElement(Form_1.InputCopy, { ...props, id: "InputCopyStory", placeholder: "This is a placeholder" })));
    },
};
//# sourceMappingURL=InputCopy.stories.js.map