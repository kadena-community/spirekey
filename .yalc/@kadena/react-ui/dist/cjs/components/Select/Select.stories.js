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
const Icon_1 = require("../Icon");
const react_1 = __importStar(require("react"));
const Select_1 = require("./Select");
const meta = {
    title: 'Form/Select',
    component: Select_1.Select,
    parameters: {
        docs: {
            description: {
                component: 'The Select component renders a select element with options. The select element can be disabled with the `disabled` prop. The icon of the select element can be set with the `icon` prop.',
            },
        },
    },
    argTypes: {
        disabled: {
            description: 'toggle disabled state of component',
            control: {
                type: 'boolean',
                defaultValue: false,
            },
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'false' },
            },
        },
        icon: {
            options: [
                ...['-'],
                ...Object.keys(Icon_1.SystemIcon),
            ],
            control: {
                type: 'select',
            },
        },
    },
};
exports.default = meta;
exports.Dynamic = {
    name: 'Select',
    args: {
        icon: undefined,
    },
    render: ({ icon, disabled }) => {
        const [value, setValue] = (0, react_1.useState)('1');
        return (react_1.default.createElement(Select_1.Select, { id: "select-story", ariaLabel: 'select', icon: icon, onChange: (e) => {
                console.log('clicked on', e.target.value);
                setValue(e.target.value);
            }, disabled: Boolean(disabled), value: value },
            react_1.default.createElement("option", { value: '1' }, "option 1"),
            react_1.default.createElement("option", { value: '2' }, "option 2")));
    },
};
//# sourceMappingURL=Select.stories.js.map