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
exports.Dynamic = void 0;
const IconButton_1 = require("../IconButton");
const withCenteredStory_1 = require("../../utils/withCenteredStory");
const react_1 = __importStar(require("react"));
const _1 = require("./");
const stories_css_1 = require("./stories.css");
const meta = {
    title: 'Components/Tooltip',
    component: _1.Tooltip.Root,
    decorators: [withCenteredStory_1.withCenteredStory],
    parameters: {
        docs: {
            description: {
                component: 'The Tooltip component renders a tooltip with text. The placement of the tooltip can be set with the `placement` prop. The tooltip can be triggered by hovering over the `IconButton` component.',
            },
        },
    },
    argTypes: {
        text: {
            control: {
                type: 'text',
            },
        },
        placement: {
            options: ['top', 'bottom', 'left', 'right'],
            control: {
                type: 'select',
            },
        },
    },
};
exports.default = meta;
exports.Dynamic = {
    name: 'Tooltip',
    args: {
        text: "I'm a tooltip, look at me!",
        placement: 'right',
    },
    render: ({ text, placement }) => {
        const ref = (0, react_1.useRef)(null);
        return (react_1.default.createElement("div", { className: stories_css_1.container },
            react_1.default.createElement(IconButton_1.IconButton, { title: "hover me", icon: "Information", onMouseEnter: (e) => _1.Tooltip.handler(e, ref), onMouseLeave: (e) => _1.Tooltip.handler(e, ref) }),
            react_1.default.createElement(_1.Tooltip.Root, { placement: placement, ref: ref }, text)));
    },
};
//# sourceMappingURL=Tooltip.stories.js.map