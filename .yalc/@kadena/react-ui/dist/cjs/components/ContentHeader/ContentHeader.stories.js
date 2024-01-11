"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Primary = void 0;
const ContentHeader_1 = require("../ContentHeader");
const Icon_1 = require("../Icon");
const _storyDecorators_1 = require("../../storyDecorators");
const react_1 = __importDefault(require("react"));
const meta = {
    title: 'Patterns/ContentHeader',
    decorators: [_storyDecorators_1.withContentWidth],
    parameters: {
        status: { type: 'experimental' },
    },
    argTypes: {
        icon: {
            options: Object.keys(Icon_1.SystemIcon),
            control: {
                type: 'select',
            },
        },
        heading: {
            control: {
                type: 'text',
            },
        },
        description: {
            control: {
                type: 'text',
            },
        },
    },
};
exports.default = meta;
exports.Primary = {
    name: 'ContentHeader',
    args: {
        icon: 'Account',
        heading: 'Incoming Transactions',
        description: 'This table is listing all the incoming transaction sorted by date descending descriptive text.',
    },
    render: ({ icon, heading, description }) => {
        return (react_1.default.createElement(ContentHeader_1.ContentHeader, { heading: heading, icon: icon, description: description }));
    },
};
//# sourceMappingURL=ContentHeader.stories.js.map