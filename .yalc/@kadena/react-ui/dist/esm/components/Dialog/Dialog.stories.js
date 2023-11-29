import { Button } from '../Button';
import { Dialog, DialogContent, DialogFooter, DialogHeader, } from '../Dialog';
import React, { useState } from 'react';
import { ModalContent } from './StoryComponents';
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
export default meta;
export const DialogStory = {
    name: 'Dialog',
    args: {
        title: 'Dialog Title',
    },
    render: ({ title }) => {
        const [isOpen, setIsOpen] = useState(false);
        return (React.createElement(React.Fragment, null,
            React.createElement(Button, { onClick: () => setIsOpen(true) }, "Modal Trigger"),
            React.createElement(Dialog, { isOpen: isOpen, onOpenChange: (isOpen) => setIsOpen(isOpen) }, (state) => (React.createElement(React.Fragment, null,
                React.createElement(DialogHeader, null, title),
                React.createElement(DialogContent, null,
                    React.createElement(ModalContent, null)),
                React.createElement(DialogFooter, null,
                    React.createElement(Button, { onClick: state.close }, "Close Button"),
                    React.createElement(Button, { onClick: state.close }, "Second Close Button")))))));
    },
};
//# sourceMappingURL=Dialog.stories.js.map