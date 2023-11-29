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
exports.Primary = void 0;
const Button_1 = require("../Button");
const Tag_1 = require("../Tag");
const react_1 = __importStar(require("react"));
const meta = {
    title: 'Components/Tag',
    parameters: {
        status: {
            type: ['inDevelopment'],
        },
        docs: {
            description: {
                component: 'The Tag component renders a tag with a text. This tag can be dismissed by the user by clicking the X icon when the optional `onClose` prop is provided.',
            },
        },
    },
    component: Tag_1.Tag,
    argTypes: {
        text: {
            control: {
                type: 'text',
            },
        },
        hasClose: {
            control: {
                type: 'boolean',
            },
        },
    },
};
exports.default = meta;
exports.Primary = {
    name: 'Tag',
    args: {
        text: 'Chain:1',
        hasClose: true,
    },
    render: ({ text, hasClose }) => {
        const [closed, setClosed] = (0, react_1.useState)(false);
        if (closed)
            return react_1.default.createElement(Button_1.Button, { onClick: () => setClosed(false) }, "Reset");
        return (react_1.default.createElement(Tag_1.Tag, { onClose: hasClose ? () => setClosed(true) : undefined }, text));
    },
};
//# sourceMappingURL=Tag.stories.js.map