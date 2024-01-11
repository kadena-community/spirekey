"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Controlled = exports.DefaultOpen = exports.TooltipReactNode = exports.Dynamic = void 0;
const Button_1 = require("../Button");
const Icon_1 = require("../Icon");
const Layout_1 = require("../Layout");
const Tooltip_1 = require("../Tooltip");
const _storyDecorators_1 = require("../../storyDecorators");
const atoms_css_1 = require("../../styles/atoms.css");
const react_1 = __importDefault(require("react"));
const meta = {
    title: 'Overlays/Tooltip',
    component: Tooltip_1.Tooltip,
    decorators: [_storyDecorators_1.onLayer1],
    parameters: {
        status: {
            type: ['releaseCandidate'],
        },
        docs: {
            description: {
                component: 'The Tooltip component renders a tooltip with content when the user hovers or focuses the element passed as children.',
            },
        },
    },
    argTypes: {
        content: {
            description: 'The content that will be rendered inside the tooltip. This can be a string or a ReactNode.',
            control: {
                type: 'text',
            },
        },
        position: {
            description: 'The position of the tooltip relative to the element that triggers it.',
            table: {
                defaultValue: { summary: 'right' },
            },
        },
        delay: {
            description: 'The delay in milliseconds before the tooltip is shown when the user hovers or focuses the element.',
            table: {
                defaultValue: { summary: 500 },
            },
        },
        closeDelay: {
            description: 'The delay in milliseconds before the tooltip is hidden when the user stops hovering or focusing the element.',
            table: {
                defaultValue: { summary: 300 },
            },
        },
        isDisabled: {
            description: 'Disables the tooltip when set to true.',
            table: {
                defaultValue: { summary: false },
            },
        },
        isOpen: {
            description: 'Allows the user to control the open state of the tooltip.',
            table: {
                defaultValue: { summary: false },
            },
        },
        defaultOpen: {
            description: 'Sets the initial open state of the tooltip.',
            table: {
                defaultValue: { summary: false },
            },
        },
    },
};
exports.default = meta;
exports.Dynamic = {
    name: 'Tooltip with Text',
    args: {
        content: "I'm a tooltip, look at me!",
        position: 'right',
        isDisabled: false,
        delay: 500,
        closeDelay: 300,
    },
    render: ({ content, position, isDisabled, delay, closeDelay }) => {
        return (react_1.default.createElement(Tooltip_1.Tooltip, { content: content, position: position, isDisabled: isDisabled, delay: delay, closeDelay: closeDelay },
            react_1.default.createElement(Button_1.Button, null, "Trigger")));
    },
};
exports.TooltipReactNode = {
    name: 'Tooltip with components',
    args: {
        position: 'right',
        isDisabled: false,
        delay: 500,
        closeDelay: 300,
    },
    render: ({ position, isDisabled, delay, closeDelay }) => {
        return (react_1.default.createElement(Tooltip_1.Tooltip, { position: position, isDisabled: isDisabled, delay: delay, closeDelay: closeDelay, content: react_1.default.createElement(Layout_1.Stack, { flexDirection: "row", gap: "xs", alignItems: "center" },
                react_1.default.createElement(Icon_1.SystemIcon.AlertBox, null),
                react_1.default.createElement("code", null, "I have an icon!")) },
            react_1.default.createElement(Button_1.Button, null, "Trigger")));
    },
};
exports.DefaultOpen = {
    name: 'Tooltip that is set to defaultOpen',
    args: {
        content: "I'm a tooltip, look at me!",
        position: 'right',
        isDisabled: false,
        delay: 500,
        closeDelay: 300,
    },
    render: ({ content, position, isDisabled, delay, closeDelay }) => {
        return (react_1.default.createElement(Tooltip_1.Tooltip, { content: content, position: position, isDisabled: isDisabled, delay: delay, closeDelay: closeDelay, defaultOpen: true },
            react_1.default.createElement(Button_1.Button, null, "Trigger")));
    },
};
exports.Controlled = {
    name: 'Tooltip that is controlled by a button',
    args: {
        content: "I'm a tooltip, look at me!",
        position: 'right',
        isDisabled: false,
        delay: 500,
        closeDelay: 300,
    },
    render: ({ content, position, isDisabled, delay, closeDelay }) => {
        const [isOpen, setIsOpen] = react_1.default.useState(false);
        return (react_1.default.createElement(react_1.default.Fragment, null,
            react_1.default.createElement("div", { className: (0, atoms_css_1.atoms)({ marginBlockEnd: 'xxxl' }) },
                react_1.default.createElement(Button_1.Button, { onClick: () => setIsOpen(!isOpen) }, isOpen ? 'Hide Tooltip' : 'Show Tooltip')),
            react_1.default.createElement(Tooltip_1.Tooltip, { content: content, position: position, isDisabled: isDisabled, delay: delay, closeDelay: closeDelay, isOpen: isOpen },
                react_1.default.createElement(Icon_1.SystemIcon.AlertBox, null))));
    },
};
//# sourceMappingURL=Tooltip.stories.js.map