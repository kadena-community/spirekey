"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Primary = void 0;
const Modal_1 = require("../Modal");
const react_1 = __importDefault(require("react"));
const StoryComponents_1 = require("./StoryComponents");
const meta = {
    title: 'Layout/Modal',
    parameters: {
        docs: {
            description: {
                component: 'The component library exposes a `ModalProvider` and `useModal` hook that can be used with an element with id "modalportal" to display content in a modal.<br><br>To render a modal you need to add `<div id="modalportal" />` as the last child of the document body and wrap your content in the `ModalProvider` component. Then you can pass jsx and a title to the `renderModal` function from the `useModal` hook to render content in the modal.<br><br>See the code for this story for an example.',
            },
        },
    },
    argTypes: {
        title: {
            control: {
                type: 'text',
            },
            description: 'Title of the modal.',
        },
    },
};
exports.default = meta;
exports.Primary = {
    name: 'Modal',
    args: {
        title: 'Default Title',
    },
    render: ({ title }) => {
        return (react_1.default.createElement(react_1.default.Fragment, null,
            react_1.default.createElement("div", { id: "modalportal" }),
            react_1.default.createElement(Modal_1.ModalProvider, null,
                react_1.default.createElement(StoryComponents_1.Content, { title: title }))));
    },
};
//# sourceMappingURL=Modal.stories.js.map