"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Static = void 0;
const react_1 = __importDefault(require("react"));
const Divider_1 = require("./Divider");
const stories_css_1 = require("./stories.css");
const meta = {
    title: 'Layout/Divider',
    parameters: {
        docs: {
            description: {
                component: 'Component which helps to separate one logical group of element from others.',
            },
        },
    },
    component: Divider_1.Divider,
};
exports.Static = {
    name: 'Divider',
    render: () => {
        return (react_1.default.createElement(react_1.default.Fragment, null,
            react_1.default.createElement("div", { className: stories_css_1.ContentClass }, "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."),
            react_1.default.createElement(Divider_1.Divider, null),
            react_1.default.createElement("div", { className: stories_css_1.ContentClass }, "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.")));
    },
};
exports.default = meta;
//# sourceMappingURL=Divider.stories.js.map