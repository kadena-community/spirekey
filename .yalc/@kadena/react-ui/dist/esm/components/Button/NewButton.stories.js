var _a, _b, _c, _d;
import React from 'react';
import { LeadingIcon, Plus, TrailingIcon } from '../Icon/System/SystemIcon';
import { Box } from '../Layout/Box/Box';
import { Heading } from '../Typography/Heading/Heading';
import { LinkButton } from './LinkButton';
import { Button } from './NewButton';
import { button } from './SharedButton.css';
const buttonVariants = Object.keys((_b = (_a = button.classNames) === null || _a === void 0 ? void 0 : _a.variants) === null || _b === void 0 ? void 0 : _b.variant);
const buttonColors = Object.keys((_d = (_c = button.classNames) === null || _c === void 0 ? void 0 : _c.variants) === null || _d === void 0 ? void 0 : _d.color);
const meta = {
    title: 'Components/NewButton',
    component: Button,
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
export const _Button = {
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
        return React.createElement(Button, { ...props }, text);
    },
};
export const AllVariants = ({ isCompact, isDisabled, isLoading, }) => (React.createElement(Box, { gap: "xs", display: "flex" },
    React.createElement(Box, { gap: "xs", display: "flex", flexDirection: "column", alignItems: "flex-start" },
        React.createElement(Heading, { variant: "h6" }, "Default"),
        buttonColors.map((color) => (React.createElement(Button, { key: color, color: color, isCompact: isCompact, isDisabled: isDisabled, isLoading: isLoading, startIcon: React.createElement(LeadingIcon, null), endIcon: React.createElement(TrailingIcon, null) }, color)))),
    React.createElement(Box, { gap: "xs", display: "flex", flexDirection: "column", alignItems: "flex-start" },
        React.createElement(Heading, { variant: "h6" }, "Alternative"),
        buttonColors.map((color) => (React.createElement(Button, { key: color, color: color, variant: "alternative", isCompact: isCompact, isDisabled: isDisabled, isLoading: isLoading, startIcon: React.createElement(LeadingIcon, null), endIcon: React.createElement(TrailingIcon, null) }, color)))),
    React.createElement(Box, { gap: "xs", display: "flex", flexDirection: "column", alignItems: "flex-start" },
        React.createElement(Heading, { variant: "h6" }, "Outlined"),
        buttonColors.map((color) => (React.createElement(Button, { key: color, color: color, variant: "outlined", isCompact: isCompact, isDisabled: isDisabled, isLoading: isLoading, startIcon: React.createElement(LeadingIcon, null), endIcon: React.createElement(TrailingIcon, null) }, color)))),
    React.createElement(Box, { gap: "xs", display: "flex", flexDirection: "column", alignItems: "flex-start" },
        React.createElement(Heading, { variant: "h6" }, "Text"),
        buttonColors.map((color) => (React.createElement(Button, { key: color, color: color, variant: "text", isCompact: isCompact, isDisabled: isDisabled, isLoading: isLoading, startIcon: React.createElement(LeadingIcon, null), endIcon: React.createElement(TrailingIcon, null) }, color))))));
export const StartIcon = ({ isCompact, isDisabled, isLoading, color, variant, }) => (React.createElement(Button, { startIcon: React.createElement(Plus, null), isCompact: isCompact, isDisabled: isDisabled, isLoading: isLoading, color: color, variant: variant }, "Click me"));
export const EndIcon = ({ isCompact, isDisabled, isLoading, color, variant, }) => (React.createElement(Button, { endIcon: React.createElement(Plus, null), isCompact: isCompact, isDisabled: isDisabled, isLoading: isLoading, color: color, variant: variant }, "Click me"));
export const OnlyIcon = ({ isCompact, isDisabled, isLoading, color, variant, }) => (React.createElement(Button, { icon: React.createElement(Plus, null), isCompact: isCompact, isDisabled: isDisabled, isLoading: isLoading, color: color, variant: variant }));
export const _LinkButton = {
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
        return React.createElement(LinkButton, { ...props }, text);
    },
};
export default meta;
//# sourceMappingURL=NewButton.stories.js.map