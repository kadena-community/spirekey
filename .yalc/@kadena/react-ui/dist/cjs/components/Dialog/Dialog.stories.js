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
exports.DialogStory = void 0;
const Button_1 = require("../Button");
const Dialog_1 = require("../Dialog");
const react_1 = __importStar(require("react"));
const StoryComponents_1 = require("./StoryComponents");
const meta = {
    title: 'Overlays/Dialog',
    parameters: {
        docs: {
            description: {
                component: `
A Dialog is a type of modal that is used to display information or prompt the user for input. It is a blocking modal, which means it will trap focus within itself and will not allow the user to interact with the rest of the page until it is closed. It is also dismissable, which means it can be closed by clicking on the close button or pressing the escape key. Dialogs are used for important information that requires the user to take action before continuing.
`,
            },
        },
    },
    argTypes: {
        isOpen: {
            description: 'Controls whether the dialog is open or closed. If true, the dialog will be open. If false, the dialog will be closed.',
            table: {
                defaultValue: { summary: 'false' },
                type: { summary: 'boolean' },
            },
        },
        onOpenChange: {
            control: { type: 'function' },
            description: 'Function that is called when the dialog is opened or closed. It is passed a boolean value that indicates whether the dialog is open or closed.',
            table: {
                type: { summary: 'function' },
            },
        },
        title: {
            control: { type: 'text' },
            description: 'Title of the dialog.',
            table: {
                type: { summary: 'string' },
            },
        },
    },
};
exports.default = meta;
exports.DialogStory = {
    name: 'Dialog',
    args: {
        title: 'Dialog Title',
    },
    render: ({ title }) => {
        const [isOpen, setIsOpen] = (0, react_1.useState)(false);
        return (react_1.default.createElement(react_1.default.Fragment, null,
            react_1.default.createElement(Button_1.Button, { onClick: () => setIsOpen(true) }, "Modal Trigger"),
            react_1.default.createElement(Dialog_1.Dialog, { isOpen: isOpen, onOpenChange: (isOpen) => setIsOpen(isOpen) }, (state) => (react_1.default.createElement(react_1.default.Fragment, null,
                react_1.default.createElement(Dialog_1.DialogHeader, null, title),
                react_1.default.createElement(Dialog_1.DialogContent, null,
                    react_1.default.createElement(StoryComponents_1.ModalContent, null)),
                react_1.default.createElement(Dialog_1.DialogFooter, null,
                    react_1.default.createElement(Button_1.Button, { onClick: state.close }, "Close Button"),
                    react_1.default.createElement(Button_1.Button, { onClick: state.close }, "Second Close Button")))))));
    },
};
//# sourceMappingURL=Dialog.stories.js.map