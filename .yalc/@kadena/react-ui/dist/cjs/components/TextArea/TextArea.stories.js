"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TextAreaStory = void 0;
const TextArea_1 = require("../TextArea");
const react_1 = __importStar(require("react"));
const meta = {
    title: 'Form/TextArea',
    component: TextArea_1.Textarea,
    parameters: {
        docs: {
            description: {
                component: 'The TextArea component is a wrapper around the native textArea element that provides the ability to add additional information.',
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
exports.TextAreaStory = {
    name: 'TextArea config',
    args: {
        disabled: false,
        fontFamily: '$mono',
        outlined: true,
    },
    render: (props) => {
        const [value, setValue] = (0, react_1.useState)('');
        return (react_1.default.createElement(TextArea_1.Textarea, { ...props, value: value, onChange: ({ target }) => setValue(target.value), id: "inlineInputStory", placeholder: "This is a placeholder" }));
    },
};
//# sourceMappingURL=TextArea.stories.js.map