"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TextareaCopyStory = void 0;
const react_1 = __importDefault(require("react"));
const _storyDecorators_1 = require("../../../../storyDecorators");
const TextareaCopy_1 = require("./TextareaCopy");
const meta = {
    title: 'Form/Textarea/TextareaCopy',
    component: TextareaCopy_1.TextareaCopy,
    decorators: [_storyDecorators_1.withContentWidth, _storyDecorators_1.onLayer2],
    parameters: {
        docs: {
            description: {
                component: 'The TextAreaCopy is a composition of the native textArea element and a copy button.',
            },
        },
    },
    argTypes: {
        disabled: {
            description: 'Disables the textArea and applies visual styling.',
            control: {
                type: 'boolean',
            },
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'false' },
            },
        },
    },
};
exports.default = meta;
exports.TextareaCopyStory = {
    name: 'TextareaCopy',
    args: {
        disabled: false,
        fontFamily: 'codeFont',
        outlined: false,
    },
    render: (props) => {
        return (react_1.default.createElement(TextareaCopy_1.TextareaCopy, { ...props, id: "TextareaCopyStory", placeholder: "This is a placeholder" }));
    },
};
//# sourceMappingURL=TextareaCopy.stories.js.map