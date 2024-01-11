"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", { value: true });
exports._LinkButton = exports.OnlyIcon = exports.EndIcon = exports.StartIcon = exports.AllVariants = exports._Button = void 0;
const react_1 = __importDefault(require("react"));
const SystemIcon_1 = require("../Icon/System/SystemIcon");
const Box_1 = require("../Layout/Box/Box");
const Heading_1 = require("../Typography/Heading/Heading");
const LinkButton_1 = require("./LinkButton");
const NewButton_1 = require("./NewButton");
const SharedButton_css_1 = require("./SharedButton.css");
const buttonVariants = Object.keys((_b = (_a = SharedButton_css_1.button.classNames) === null || _a === void 0 ? void 0 : _a.variants) === null || _b === void 0 ? void 0 : _b.variant);
const buttonColors = Object.keys((_d = (_c = SharedButton_css_1.button.classNames) === null || _c === void 0 ? void 0 : _c.variants) === null || _d === void 0 ? void 0 : _d.color);
const meta = {
    title: 'Components/NewButton',
    component: NewButton_1.Button,
    parameters: {
        status: { type: 'inDevelopment' },
        controls: {
            hideNoControlsWarning: true,
            sort: 'requiredFirst',
        },
        docs: {
            description: {
                component: 'The Button component renders a button which will be styled according to the variant/color prop (`contained/primary` being the default)',
            },
        },
    },
    argTypes: {
        onClick: {
            action: 'clicked',
            description: '(deprecated) callback when button is clicked',
            table: {
                disable: true,
            },
        },
        variant: {
            options: buttonVariants,
            control: {
                type: 'select',
            },
            description: 'button style variant',
            table: {
                type: { summary: buttonVariants.join(' | ') },
                defaultValue: { summary: 'default' },
            },
        },
        color: {
            options: buttonColors,
            control: {
                type: 'select',
            },
            description: 'button color variant',
            table: {
                type: { summary: buttonColors.join(' | ') },
                defaultValue: { summary: 'default' },
            },
        },
        isDisabled: {
            description: 'only used when rendered as button',
            control: {
                type: 'boolean',
            },
        },
        isLoading: {
            description: 'loading state',
            control: {
                type: 'boolean',
            },
        },
        isCompact: {
            description: 'compact button style',
            control: {
                type: 'boolean',
            },
        },
    },
};
exports._Button = {
    name: 'Button',
    args: {
        text: 'Click me',
        variant: 'contained',
        color: 'primary',
        isDisabled: false,
        isCompact: false,
        isLoading: false,
        icon: undefined,
        startIcon: undefined,
        endIcon: undefined,
    },
    render: ({ text, ...props }) => {
        return react_1.default.createElement(NewButton_1.Button, { ...props }, text);
    },
};
const AllVariants = ({ isCompact, isDisabled, isLoading, }) => (react_1.default.createElement(Box_1.Box, { gap: "xs", display: "flex" },
    react_1.default.createElement(Box_1.Box, { gap: "xs", display: "flex", flexDirection: "column", alignItems: "flex-start" },
        react_1.default.createElement(Heading_1.Heading, { variant: "h6" }, "Default"),
        buttonColors.map((color) => (react_1.default.createElement(NewButton_1.Button, { key: color, color: color, isCompact: isCompact, isDisabled: isDisabled, isLoading: isLoading, startIcon: react_1.default.createElement(SystemIcon_1.LeadingIcon, null), endIcon: react_1.default.createElement(SystemIcon_1.TrailingIcon, null) }, color)))),
    react_1.default.createElement(Box_1.Box, { gap: "xs", display: "flex", flexDirection: "column", alignItems: "flex-start" },
        react_1.default.createElement(Heading_1.Heading, { variant: "h6" }, "Alternative"),
        buttonColors.map((color) => (react_1.default.createElement(NewButton_1.Button, { key: color, color: color, variant: "alternative", isCompact: isCompact, isDisabled: isDisabled, isLoading: isLoading, startIcon: react_1.default.createElement(SystemIcon_1.LeadingIcon, null), endIcon: react_1.default.createElement(SystemIcon_1.TrailingIcon, null) }, color)))),
    react_1.default.createElement(Box_1.Box, { gap: "xs", display: "flex", flexDirection: "column", alignItems: "flex-start" },
        react_1.default.createElement(Heading_1.Heading, { variant: "h6" }, "Outlined"),
        buttonColors.map((color) => (react_1.default.createElement(NewButton_1.Button, { key: color, color: color, variant: "outlined", isCompact: isCompact, isDisabled: isDisabled, isLoading: isLoading, startIcon: react_1.default.createElement(SystemIcon_1.LeadingIcon, null), endIcon: react_1.default.createElement(SystemIcon_1.TrailingIcon, null) }, color)))),
    react_1.default.createElement(Box_1.Box, { gap: "xs", display: "flex", flexDirection: "column", alignItems: "flex-start" },
        react_1.default.createElement(Heading_1.Heading, { variant: "h6" }, "Text"),
        buttonColors.map((color) => (react_1.default.createElement(NewButton_1.Button, { key: color, color: color, variant: "text", isCompact: isCompact, isDisabled: isDisabled, isLoading: isLoading, startIcon: react_1.default.createElement(SystemIcon_1.LeadingIcon, null), endIcon: react_1.default.createElement(SystemIcon_1.TrailingIcon, null) }, color))))));
exports.AllVariants = AllVariants;
const StartIcon = ({ isCompact, isDisabled, isLoading, color, variant, }) => (react_1.default.createElement(NewButton_1.Button, { startIcon: react_1.default.createElement(SystemIcon_1.Plus, null), isCompact: isCompact, isDisabled: isDisabled, isLoading: isLoading, color: color, variant: variant }, "Click me"));
exports.StartIcon = StartIcon;
const EndIcon = ({ isCompact, isDisabled, isLoading, color, variant, }) => (react_1.default.createElement(NewButton_1.Button, { endIcon: react_1.default.createElement(SystemIcon_1.Plus, null), isCompact: isCompact, isDisabled: isDisabled, isLoading: isLoading, color: color, variant: variant }, "Click me"));
exports.EndIcon = EndIcon;
const OnlyIcon = ({ isCompact, isDisabled, isLoading, color, variant, }) => (react_1.default.createElement(NewButton_1.Button, { icon: react_1.default.createElement(SystemIcon_1.Plus, null), isCompact: isCompact, isDisabled: isDisabled, isLoading: isLoading, color: color, variant: variant }));
exports.OnlyIcon = OnlyIcon;
exports._LinkButton = {
    name: 'LinkButton',
    parameters: {
        docs: {
            description: {
                story: `The LinkButton component renders an anchor element <a/> which will be styled with the same variants/colors as the Button component.
          <br/><br/>
          To support client side routing make sure to import/use "RouterProvider" from "@kadena/react-ui" see https://react-spectrum.adobe.com/react-aria/routing.html for more info on how to integrate it with NextJS and client side routing.
          `,
            },
        },
    },
    args: {
        text: 'Click me',
        variant: 'contained',
        color: 'primary',
        isDisabled: false,
        isCompact: false,
        isLoading: false,
        icon: undefined,
        startIcon: undefined,
        endIcon: undefined,
        href: '#',
    },
    render: ({ text, ...props }) => {
        return react_1.default.createElement(LinkButton_1.LinkButton, { ...props }, text);
    },
};
exports.default = meta;
//# sourceMappingURL=NewButton.stories.js.map