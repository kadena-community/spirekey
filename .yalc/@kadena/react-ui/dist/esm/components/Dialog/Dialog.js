import { useObjectRef } from '@react-aria/utils';
import cn from 'classnames';
import React from 'react';
import { mergeProps, useDialog } from 'react-aria';
import { useOverlayTriggerState } from 'react-stately';
import { SystemIcon } from '../Icon';
import { Modal } from '../Modal/Modal';
import { DialogContext } from './Dialog.context';
import { closeButtonClass, overlayClass } from './Dialog.css';
const BaseDialog = React.forwardRef((props, ref) => {
    var _a;
    const { className, children, isDismissable = true, state, ...rest } = props;
    const dialogRef = useObjectRef(ref);
    const { dialogProps, titleProps } = useDialog({
        role: (_a = props.role) !== null && _a !== void 0 ? _a : 'dialog',
        ...rest,
    }, dialogRef);
    return (React.createElement(DialogContext.Provider, { value: { titleProps, state } },
        React.createElement("div", { ref: dialogRef, className: cn(overlayClass, className), ...mergeProps(rest, dialogProps) },
            typeof children === 'function' ? children(state) : children,
            isDismissable && (React.createElement("button", { className: closeButtonClass, onClick: state.close, "aria-label": "Close Modal", title: "Close Modal" },
                React.createElement(SystemIcon.Close, null))))));
});
BaseDialog.displayName = 'BaseDialog';
export const Dialog = ({ children, isDismissable = true, isKeyboardDismissDisabled, isOpen, defaultOpen, onOpenChange, ...props }) => {
    const state = useOverlayTriggerState({
        isOpen,
        defaultOpen,
        onOpenChange,
    });
    return (React.createElement(Modal, { isKeyboardDismissDisabled: isKeyboardDismissDisabled, state: state },
        React.createElement(BaseDialog, { state: state, isDismissable: isDismissable, ...props }, children)));
};
//# sourceMappingURL=Dialog.js.map