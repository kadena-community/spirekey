import { Table } from '../Table';
import { vars } from '../../styles/vars.css';
import React from 'react';
const selectOptions = [
    undefined,
    ...Object.keys(vars.sizes),
];
const meta = {
    title: 'Components/Table',
    parameters: {
        status: {
            type: ['inDevelopment'],
        },
        docs: {
            description: {
                component: 'The Table component renders a table element with a head and body. The table can have a visual distinction between rows with the `striped` prop. The column width can be adjusted via `width`, `minWidth`, and `maxWidth` prop applied to the `Table.Th` subcomponent.',
            },
        },
    },
    argTypes: {
        rowCount: {
            control: { type: 'range', min: 1, max: 6, step: 1 },
        },
        columnCount: {
            control: { type: 'range', min: 1, max: 6, step: 1 },
        },
        striped: {
            control: { type: 'boolean' },
        },
        columnWidth: {
            options: selectOptions,
            control: {
                type: 'select',
            },
            description: 'Set value for padding property with pre-defined size values.',
        },
    },
};
export default meta;
export const Primary = {
    name: 'Table',
    args: {
        rowCount: 3,
        columnCount: 5,
        striped: false,
    },
    render: ({ rowCount, columnCount, striped }) => {
        return (React.createElement(Table.Root, { striped: striped },
            React.createElement(Table.Head, null,
                React.createElement(Table.Tr, null, Array.from(Array(columnCount)).map((id, tdIdx) => {
                    return React.createElement(Table.Th, { key: `td${tdIdx}` },
                        "test ",
                        tdIdx);
                }))),
            React.createElement(Table.Body, null, Array.from(Array(rowCount)).map((id, idx) => {
                return (React.createElement(Table.Tr, { key: `tr${idx}` }, Array.from(Array(columnCount)).map((id, tdIdx) => {
                    return React.createElement(Table.Td, { key: `td${tdIdx}` },
                        "test ",
                        tdIdx);
                })));
            }))));
    },
};
export const LinkTable = {
    name: 'Table with Link',
    args: {
        rowCount: 3,
        columnCount: 5,
        striped: false,
    },
    render: ({ rowCount, columnCount, striped }) => {
        return (React.createElement(Table.Root, { striped: striped },
            React.createElement(Table.Head, null,
                React.createElement(Table.Tr, null, Array.from(Array(columnCount + 1)).map((id, tdIdx) => {
                    return tdIdx === columnCount ? (React.createElement(Table.Th, { key: `td${tdIdx}` })) : (React.createElement(Table.Th, { key: `td${tdIdx}` },
                        "test ",
                        tdIdx));
                }))),
            React.createElement(Table.Body, null, Array.from(Array(rowCount)).map((id, idx) => {
                return (React.createElement(Table.Tr, { key: `tr${idx}`, url: `#${idx}` }, Array.from(Array(columnCount)).map((id, tdIdx) => {
                    return React.createElement(Table.Td, { key: `td${tdIdx}` },
                        "test ",
                        tdIdx);
                })));
            }))));
    },
};
export const StripedTable = {
    args: {
        rowCount: 3,
        columnCount: 5,
        striped: true,
    },
    render: ({ rowCount, columnCount, striped }) => {
        return (React.createElement(Table.Root, { striped: striped },
            React.createElement(Table.Head, null,
                React.createElement(Table.Tr, null, Array.from(Array(columnCount)).map((id, tdIdx) => {
                    return React.createElement(Table.Th, { key: `td${tdIdx}` },
                        "test ",
                        tdIdx);
                }))),
            React.createElement(Table.Body, null, Array.from(Array(rowCount)).map((id, idx) => {
                return (React.createElement(Table.Tr, { key: `tr${idx}` }, Array.from(Array(columnCount)).map((id, tdIdx) => {
                    return React.createElement(Table.Td, { key: `td${tdIdx}` },
                        "test ",
                        tdIdx);
                })));
            }))));
    },
};
export const EmptyRowsTable = {
    name: 'Table with Empty Rows',
    args: {
        rowCount: 5,
        columnCount: 3,
        striped: false,
    },
    render: ({ striped }) => {
        return (React.createElement(Table.Root, { striped: striped },
            React.createElement(Table.Head, null,
                React.createElement(Table.Tr, null,
                    React.createElement(Table.Th, null, "Date Time"),
                    React.createElement(Table.Th, null, "Amount"),
                    React.createElement(Table.Th, null, "Sender"))),
            React.createElement(Table.Body, null,
                React.createElement(Table.Tr, null,
                    React.createElement(Table.Td, null, "March 28, 2023 - 06:23"),
                    React.createElement(Table.Td, null, "10"),
                    React.createElement(Table.Td, null, "1234")),
                React.createElement(Table.Tr, null),
                React.createElement(Table.Tr, null),
                React.createElement(Table.Tr, null,
                    React.createElement(Table.Td, null, "March 28, 2023 - 06:23"),
                    React.createElement(Table.Td, null, "10"),
                    React.createElement(Table.Td, null, "1234")),
                React.createElement(Table.Tr, null))));
    },
};
export const FixedColumnWidth = {
    name: 'Table with Fixed Column Width',
    args: {
        columnWidth: '$32',
    },
    render: ({ columnWidth }) => {
        return (React.createElement(Table.Root, { wordBreak: "break-word" },
            React.createElement(Table.Head, null,
                React.createElement(Table.Tr, null,
                    React.createElement(Table.Th, { width: columnWidth }, "Fixed Width"),
                    React.createElement(Table.Th, null, "Other Content"))),
            React.createElement(Table.Body, null,
                React.createElement(Table.Tr, null,
                    React.createElement(Table.Td, null, "Fixed with content"),
                    React.createElement(Table.Td, null, "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.")))));
    },
};
//# sourceMappingURL=Table.stories.js.map