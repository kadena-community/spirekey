"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FixedColumnWidth = exports.EmptyRowsTable = exports.StripedTable = exports.LinkTable = exports.Primary = void 0;
const Table_1 = require("../Table");
const vars_css_1 = require("../../styles/vars.css");
const react_1 = __importDefault(require("react"));
const selectOptions = [
    undefined,
    ...Object.keys(vars_css_1.vars.sizes),
];
const meta = {
    title: 'Content/Table',
    parameters: {
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
exports.default = meta;
exports.Primary = {
    name: 'Table',
    args: {
        rowCount: 3,
        columnCount: 5,
        striped: false,
    },
    render: ({ rowCount, columnCount, striped }) => {
        return (react_1.default.createElement(Table_1.Table.Root, { striped: striped },
            react_1.default.createElement(Table_1.Table.Head, null,
                react_1.default.createElement(Table_1.Table.Tr, null, Array.from(Array(columnCount)).map((id, tdIdx) => {
                    return react_1.default.createElement(Table_1.Table.Th, { key: `td${tdIdx}` },
                        "test ",
                        tdIdx);
                }))),
            react_1.default.createElement(Table_1.Table.Body, null, Array.from(Array(rowCount)).map((id, idx) => {
                return (react_1.default.createElement(Table_1.Table.Tr, { key: `tr${idx}` }, Array.from(Array(columnCount)).map((id, tdIdx) => {
                    return react_1.default.createElement(Table_1.Table.Td, { key: `td${tdIdx}` },
                        "test ",
                        tdIdx);
                })));
            }))));
    },
};
exports.LinkTable = {
    name: 'Table with Link',
    args: {
        rowCount: 3,
        columnCount: 5,
        striped: false,
    },
    render: ({ rowCount, columnCount, striped }) => {
        return (react_1.default.createElement(Table_1.Table.Root, { striped: striped },
            react_1.default.createElement(Table_1.Table.Head, null,
                react_1.default.createElement(Table_1.Table.Tr, null, Array.from(Array(columnCount + 1)).map((id, tdIdx) => {
                    return tdIdx === columnCount ? (react_1.default.createElement(Table_1.Table.Th, { key: `td${tdIdx}` })) : (react_1.default.createElement(Table_1.Table.Th, { key: `td${tdIdx}` },
                        "test ",
                        tdIdx));
                }))),
            react_1.default.createElement(Table_1.Table.Body, null, Array.from(Array(rowCount)).map((id, idx) => {
                return (react_1.default.createElement(Table_1.Table.Tr, { key: `tr${idx}`, url: `#${idx}` }, Array.from(Array(columnCount)).map((id, tdIdx) => {
                    return react_1.default.createElement(Table_1.Table.Td, { key: `td${tdIdx}` },
                        "test ",
                        tdIdx);
                })));
            }))));
    },
};
exports.StripedTable = {
    args: {
        rowCount: 3,
        columnCount: 5,
        striped: true,
    },
    render: ({ rowCount, columnCount, striped }) => {
        return (react_1.default.createElement(Table_1.Table.Root, { striped: striped },
            react_1.default.createElement(Table_1.Table.Head, null,
                react_1.default.createElement(Table_1.Table.Tr, null, Array.from(Array(columnCount)).map((id, tdIdx) => {
                    return react_1.default.createElement(Table_1.Table.Th, { key: `td${tdIdx}` },
                        "test ",
                        tdIdx);
                }))),
            react_1.default.createElement(Table_1.Table.Body, null, Array.from(Array(rowCount)).map((id, idx) => {
                return (react_1.default.createElement(Table_1.Table.Tr, { key: `tr${idx}` }, Array.from(Array(columnCount)).map((id, tdIdx) => {
                    return react_1.default.createElement(Table_1.Table.Td, { key: `td${tdIdx}` },
                        "test ",
                        tdIdx);
                })));
            }))));
    },
};
exports.EmptyRowsTable = {
    name: 'Table with Empty Rows',
    args: {
        rowCount: 5,
        columnCount: 3,
        striped: false,
    },
    render: ({ striped }) => {
        return (react_1.default.createElement(Table_1.Table.Root, { striped: striped },
            react_1.default.createElement(Table_1.Table.Head, null,
                react_1.default.createElement(Table_1.Table.Tr, null,
                    react_1.default.createElement(Table_1.Table.Th, null, "Date Time"),
                    react_1.default.createElement(Table_1.Table.Th, null, "Amount"),
                    react_1.default.createElement(Table_1.Table.Th, null, "Sender"))),
            react_1.default.createElement(Table_1.Table.Body, null,
                react_1.default.createElement(Table_1.Table.Tr, null,
                    react_1.default.createElement(Table_1.Table.Td, null, "March 28, 2023 - 06:23"),
                    react_1.default.createElement(Table_1.Table.Td, null, "10"),
                    react_1.default.createElement(Table_1.Table.Td, null, "1234")),
                react_1.default.createElement(Table_1.Table.Tr, null),
                react_1.default.createElement(Table_1.Table.Tr, null),
                react_1.default.createElement(Table_1.Table.Tr, null,
                    react_1.default.createElement(Table_1.Table.Td, null, "March 28, 2023 - 06:23"),
                    react_1.default.createElement(Table_1.Table.Td, null, "10"),
                    react_1.default.createElement(Table_1.Table.Td, null, "1234")),
                react_1.default.createElement(Table_1.Table.Tr, null))));
    },
};
exports.FixedColumnWidth = {
    name: 'Table with Fixed Column Width',
    args: {
        columnWidth: '$32',
    },
    render: ({ columnWidth }) => {
        return (react_1.default.createElement(Table_1.Table.Root, { wordBreak: "break-word" },
            react_1.default.createElement(Table_1.Table.Head, null,
                react_1.default.createElement(Table_1.Table.Tr, null,
                    react_1.default.createElement(Table_1.Table.Th, { width: columnWidth }, "Fixed Width"),
                    react_1.default.createElement(Table_1.Table.Th, null, "Other Content"))),
            react_1.default.createElement(Table_1.Table.Body, null,
                react_1.default.createElement(Table_1.Table.Tr, null,
                    react_1.default.createElement(Table_1.Table.Td, null, "Fixed with content"),
                    react_1.default.createElement(Table_1.Table.Td, null, "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.")))));
    },
};
//# sourceMappingURL=Table.stories.js.map