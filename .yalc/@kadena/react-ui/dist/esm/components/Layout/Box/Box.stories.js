import { Box } from '../../Layout/Box';
import { vars } from '../../../styles/vars.css';
import React from 'react';
import { componentClass, containerClass, itemClass } from '../stories.css';
const spaceOptions = [
    undefined,
    ...Object.keys(vars.sizes),
];
const contentWidthOptions = [
    undefined,
    ...Object.keys(vars.contentWidth),
];
const dimensionOptions = ['100%', 'min-content', 'max-content'];
const meta = {
    title: 'Layout/Box',
    component: Box,
    parameters: {
        status: {
            type: 'stable',
        },
        docs: {
            description: {
                component: 'Box is the most basic building block of application layout.\n' +
                    '\nThis component accepts an `as` prop which allows the user to pass what html element the `Box` will render as well as many style attributes that are mapped to css utility classes.',
            },
        },
    },
    argTypes: {
        overflow: {
            options: ['hidden', 'visible', 'scroll', 'auto'],
            control: {
                type: 'select',
            },
            description: 'Overflow css property.',
        },
        width: {
            options: [...spaceOptions, ...dimensionOptions, ...contentWidthOptions],
            control: {
                type: 'select',
            },
            description: 'Value for width property with pre-defined size values.',
        },
        minWidth: {
            options: dimensionOptions,
            control: {
                type: 'select',
            },
            description: 'Value for minWidth property with pre-defined size values.',
        },
        maxWidth: {
            options: [...dimensionOptions, ...contentWidthOptions],
            control: {
                type: 'select',
            },
            description: 'Value for maxWidth property with pre-defined size values.',
        },
        height: {
            options: [...spaceOptions, ...dimensionOptions],
            control: {
                type: 'select',
            },
            description: 'Value for height property with pre-defined size values.',
        },
        minHeight: {
            options: dimensionOptions,
            control: {
                type: 'select',
            },
            description: 'Value for minHeight property with pre-defined size values.',
        },
        maxHeight: {
            options: dimensionOptions,
            control: {
                type: 'select',
            },
            description: 'Value for maxHeight property with pre-defined size values.',
        },
        margin: {
            options: spaceOptions,
            control: {
                type: 'select',
            },
            description: 'Value for margin property with pre-defined size values.',
        },
        marginX: {
            options: spaceOptions,
            control: {
                type: 'select',
            },
            description: 'Value for margin property on X axis with pre-defined size values.',
        },
        marginY: {
            options: spaceOptions,
            control: {
                type: 'select',
            },
            description: 'Value for margin property on Y axis with pre-defined size values.',
        },
        marginTop: {
            options: spaceOptions,
            control: {
                type: 'select',
            },
            description: 'Value for top margin property with pre-defined size values.',
        },
        marginBottom: {
            options: spaceOptions,
            control: {
                type: 'select',
            },
            description: 'Value for top margin property with pre-defined size values.',
        },
        marginLeft: {
            options: spaceOptions,
            control: {
                type: 'select',
            },
            description: 'Value for left margin property with pre-defined size values.',
        },
        marginRight: {
            options: spaceOptions,
            control: {
                type: 'select',
            },
            description: 'Value for right margin property with pre-defined size values.',
        },
        padding: {
            options: spaceOptions,
            control: {
                type: 'select',
            },
            description: 'Value for padding property with pre-defined size values.',
        },
        paddingX: {
            options: spaceOptions,
            control: {
                type: 'select',
            },
            description: 'Value for padding property on X axis with pre-defined size values.',
        },
        paddingY: {
            options: spaceOptions,
            control: {
                type: 'select',
            },
            description: 'Value for padding property on Y axis with pre-defined size values.',
        },
        paddingTop: {
            options: spaceOptions,
            control: {
                type: 'select',
            },
            description: 'Value for top padding property with pre-defined size values.',
        },
        paddingBottom: {
            options: spaceOptions,
            control: {
                type: 'select',
            },
            description: 'Value for bottom padding property with pre-defined size values.',
        },
        paddingLeft: {
            options: spaceOptions,
            control: {
                type: 'select',
            },
            description: 'Value for left padding property with pre-defined size values.',
        },
        paddingRight: {
            options: spaceOptions,
            control: {
                type: 'select',
            },
            description: 'Value for right padding property with pre-defined size values.',
        },
    },
};
export default meta;
export const Primary = {
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
        width: undefined,
        minWidth: undefined,
        maxWidth: undefined,
        height: undefined,
        minHeight: undefined,
        maxHeight: undefined,
    },
    render: ({ margin, marginX, marginY, marginTop, marginBottom, marginLeft, marginRight, padding, paddingX, paddingY, paddingTop, paddingBottom, paddingLeft, paddingRight, width, minWidth, maxWidth, height, minHeight, maxHeight, overflow, }) => (React.createElement("div", { className: containerClass },
        React.createElement(Box, { margin: margin, marginX: marginX, marginY: marginY, marginTop: marginTop, marginBottom: marginBottom, marginLeft: marginLeft, marginRight: marginRight, padding: padding, paddingX: paddingX, paddingY: paddingY, paddingTop: paddingTop, paddingBottom: paddingBottom, paddingLeft: paddingLeft, paddingRight: paddingRight, width: width, minWidth: minWidth, maxWidth: maxWidth, height: height, minHeight: minHeight, maxHeight: maxHeight, overflow: overflow, className: componentClass },
            React.createElement("div", { className: itemClass }, "Box Content")))),
};
//# sourceMappingURL=Box.stories.js.map