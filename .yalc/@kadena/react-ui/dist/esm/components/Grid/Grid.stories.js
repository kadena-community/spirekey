import { Grid } from '../Grid';
import { sprinkles } from '../../styles/sprinkles.css';
import { vars } from '../../styles/vars.css';
import classNames from 'classnames';
import React from 'react';
import { gapVariants } from './Grid.css';
import { ContentClass } from './stories.css';
const selectOptions = [
    undefined,
    ...Object.keys(vars.sizes),
];
const meta = {
    title: 'Layout/Grid',
    parameters: {
        docs: {
            description: {
                component: 'The Grid component is an abstraction over css grid that provides `Root` and `Item` subcomponents to compose a grid of equally sized columns.<br><br><i>Note: This component does not support grid templates or columns of varying sizes.</i>',
            },
        },
    },
    component: Grid.Root,
    argTypes: {
        gap: {
            options: Object.keys(gapVariants),
            control: { type: 'select' },
            description: 'Defines the gaps (gutters) between rows and columns with pre-defined size values.',
        },
        columns: {
            control: { type: 'object' },
            description: 'Defines the number of columns.',
            options: {
                xs: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
                sm: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
                md: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
                lg: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
                xl: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
                xxl: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
            },
        },
        columnSpan: {
            control: { type: 'object' },
            description: 'Defines the column span.',
            options: {
                xs: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
                sm: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
                md: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
                lg: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
                xl: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
                xxl: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
            },
        },
        margin: {
            options: selectOptions,
            control: {
                type: 'select',
            },
            description: 'Set value for margin property with pre-defined size values.',
        },
        marginX: {
            options: selectOptions,
            control: {
                type: 'select',
            },
            description: 'Set value for margin property on X axis with pre-defined size values.',
        },
        marginY: {
            options: selectOptions,
            control: {
                type: 'select',
            },
            description: 'Set value for margin property on Y axis with pre-defined size values.',
        },
        marginTop: {
            options: selectOptions,
            control: {
                type: 'select',
            },
            description: 'Set value for top margin property with pre-defined size values.',
        },
        marginBottom: {
            options: selectOptions,
            control: {
                type: 'select',
            },
            description: 'Set value for top margin property with pre-defined size values.',
        },
        marginLeft: {
            options: selectOptions,
            control: {
                type: 'select',
            },
            description: 'Set value for left margin property with pre-defined size values.',
        },
        marginRight: {
            options: selectOptions,
            control: {
                type: 'select',
            },
            description: 'Set value for right margin property with pre-defined size values.',
        },
        padding: {
            options: selectOptions,
            control: {
                type: 'select',
            },
            description: 'Set value for padding property with pre-defined size values.',
        },
        paddingX: {
            options: selectOptions,
            control: {
                type: 'select',
            },
            description: 'Set value for padding property on X axis with pre-defined size values.',
        },
        paddingY: {
            options: selectOptions,
            control: {
                type: 'select',
            },
            description: 'Set value for padding property on Y axis with pre-defined size values.',
        },
        paddingTop: {
            options: selectOptions,
            control: {
                type: 'select',
            },
            description: 'Set value for top padding property with pre-defined size values.',
        },
        paddingBottom: {
            options: selectOptions,
            control: {
                type: 'select',
            },
            description: 'Set value for bottom padding property with pre-defined size values.',
        },
        paddingLeft: {
            options: selectOptions,
            control: {
                type: 'select',
            },
            description: 'Set value for left padding property with pre-defined size values.',
        },
        paddingRight: {
            options: selectOptions,
            control: {
                type: 'select',
            },
            description: 'Set value for right padding property with pre-defined size values.',
        },
    },
};
export default meta;
export const GridRoot = {
    name: 'Grid',
    args: {
        gap: '$xl',
        columns: {
            xs: 1,
            sm: 2,
            md: 4,
            lg: 6,
            xl: 10,
            xxl: 12,
        },
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
    },
    render: ({ gap, columns, margin, marginX, marginY, marginTop, marginBottom, marginLeft, marginRight, padding, paddingX, paddingY, paddingTop, paddingBottom, paddingLeft, paddingRight, }) => (React.createElement(React.Fragment, null,
        React.createElement(Grid.Root, { gap: gap, columns: columns, margin: margin, marginX: marginX, marginY: marginY, marginTop: marginTop, marginBottom: marginBottom, marginLeft: marginLeft, marginRight: marginRight, padding: padding, paddingX: paddingX, paddingY: paddingY, paddingTop: paddingTop, paddingBottom: paddingBottom, paddingLeft: paddingLeft, paddingRight: paddingRight },
            Array.from(new Array(12)).map((empty, i) => (React.createElement(Grid.Item, { key: i },
                React.createElement("div", { className: ContentClass }, i)))),
            React.createElement(Grid.Item, null,
                React.createElement("div", { className: ContentClass }, "2")),
            React.createElement(Grid.Item, null,
                React.createElement("div", { className: ContentClass }, "3")),
            React.createElement(Grid.Item, null,
                React.createElement("div", { className: ContentClass }, "4")),
            React.createElement(Grid.Item, null,
                React.createElement("div", { className: ContentClass }, "5")),
            React.createElement(Grid.Item, null,
                React.createElement("div", { className: ContentClass }, "6")),
            React.createElement(Grid.Item, null,
                React.createElement("div", { className: ContentClass }, "7")),
            React.createElement(Grid.Item, null,
                React.createElement("div", { className: ContentClass }, "8"))))),
};
export const GridItem = {
    args: {
        gap: '$xl',
        columns: 12,
        columnSpan: {
            xs: 5,
            sm: 10,
            md: 6,
            lg: 4,
            xl: 2,
            xxl: 1,
        },
    },
    render: ({ gap, columns, columnSpan }) => (React.createElement(React.Fragment, null,
        React.createElement(Grid.Root, { gap: gap, columns: columns },
            React.createElement(Grid.Item, { columnSpan: columnSpan },
                React.createElement("div", { className: classNames(ContentClass, sprinkles({ bg: '$primaryAccent' })) }, "dynamic")),
            Array.from(new Array(12)).map((empty, i) => (React.createElement(Grid.Item, { key: i, columnSpan: 1 },
                React.createElement("div", { className: ContentClass }, "1"))))))),
};
//# sourceMappingURL=Grid.stories.js.map