"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Primary = void 0;
const Icon_1 = require("../../Icon");
const react_1 = __importDefault(require("react"));
const IconWrapper_css_1 = require("../IconWrapper.css");
const stories_css_1 = require("../stories.css");
const meta = {
    title: 'Icons/ProductIcons',
    parameters: {
        status: {
            type: ['needsRevision'],
        },
    },
    argTypes: {
        icon: {
            control: {
                type: 'text',
            },
        },
        size: {
            options: Object.keys(IconWrapper_css_1.sizeVariants),
            control: {
                type: 'select',
            },
        },
    },
};
exports.default = meta;
exports.Primary = {
    name: 'Product',
    args: {
        icon: '',
        size: 'md',
    },
    render: ({ icon, size }) => {
        const searchRegexp = new RegExp(icon, 'i');
        return (react_1.default.createElement("div", { className: stories_css_1.gridContainer }, Object.entries(Icon_1.ProductIcon)
            .filter(([k]) => searchRegexp.test(k))
            .map(([k, Icon]) => (react_1.default.createElement("div", { key: k, className: stories_css_1.gridItem },
            react_1.default.createElement(Icon, { size: size }),
            react_1.default.createElement("span", null, k))))));
    },
};
//# sourceMappingURL=ProductIcon.stories.js.map