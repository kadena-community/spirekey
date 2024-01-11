import { SystemIcon } from '../Icon';
import { mergeRefs } from '@react-aria/utils';
import React from 'react';
import { useButton, useFocusRing, useTag } from 'react-aria';
import { Tag } from './Tag';
import { closeButtonClass, tagItemClass } from './Tag.css';
const CloseButton = (props) => {
    const ref = React.useRef(null);
    const { buttonProps } = useButton(props, ref);
    return (React.createElement("button", { className: closeButtonClass, ...buttonProps, ref: ref },
        React.createElement(SystemIcon.Close, { size: "sm" })));
};
export const InternalTagItem = ({ children, asChild, ...props }) => {
    const { state } = props;
    const ref = React.useRef(null);
    const { focusProps, isFocusVisible } = useFocusRing({ within: true });
    const { rowProps, gridCellProps, removeButtonProps, allowsRemoving } = useTag(props, state, ref);
    const getContent = (content) => (React.createElement(Tag, { ...gridCellProps },
        content,
        allowsRemoving && React.createElement(CloseButton, { ...removeButtonProps })));
    if (asChild && React.isValidElement(children)) {
        return React.cloneElement(children, {
            className: tagItemClass,
            ...children.props,
            ...rowProps,
            ...focusProps,
            'data-focus-visible': isFocusVisible,
            ref: mergeRefs(ref, children.ref),
            children: getContent(children.props.children),
        });
    }
    return (React.createElement("div", { className: tagItemClass, ref: ref, ...rowProps, ...focusProps, "data-focus-visible": isFocusVisible }, getContent(children)));
};
//# sourceMappingURL=InternalTagItem.js.map