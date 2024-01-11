"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Primary = void 0;
const react_1 = __importDefault(require("react"));
const atoms_css_1 = require("../../styles/atoms.css");
const ProgressCircle_1 = require("./ProgressCircle");
console.log('colorAtoms', atoms_css_1.colorAtoms, Object.keys(atoms_css_1.colorAtoms));
const meta = {
    title: 'Components/ProgressCircle',
    parameters: {
        status: {
            type: ['inDevelopment'],
        },
        docs: {
            description: {
                component: 'A component that shows the completion status of a task or process.',
            },
        },
    },
    argTypes: {
        isIndeterminate: {
            control: {
                type: 'boolean',
            },
        },
        value: {
            control: {
                type: 'number',
            },
        },
        minValue: {
            control: {
                type: 'number',
            },
        },
        maxValue: {
            control: {
                type: 'number',
            },
        },
        size: {
            options: ['sm', 'md', 'lg'],
            control: {
                type: 'select',
            },
        },
        color: {
            options: Object.keys(atoms_css_1.colorAtoms),
            control: {
                type: 'select',
            },
        },
        label: {
            control: {
                type: 'text',
            },
        },
    },
};
exports.default = meta;
exports.Primary = {
    name: 'ProgressCircle',
    args: {
        isIndeterminate: false,
        value: 25,
        minValue: 0,
        maxValue: 100,
        size: 'md',
        color: 'icon.brand.primary.default',
        label: 'Progress',
    },
    render: (args) => {
        return react_1.default.createElement(ProgressCircle_1.ProgressCircle, { ...args });
    },
};
//# sourceMappingURL=ProgressCircle.stories.js.map