import { mergeProps, useObjectRef } from '@react-aria/utils';
import classNames from 'classnames';
import React, { forwardRef } from 'react';
import { useButton, useFocusRing, useHover } from 'react-aria';
import { ProgressCircle } from '../ProgressCircle/ProgressCircle';
import { button } from './SharedButton.css';
import { disableLoadingProps } from './utils';
function BaseButton(props, forwardedRef) {
    var _a;
    props = disableLoadingProps(props);
    const ref = useObjectRef(forwardedRef);
    const { buttonProps, isPressed } = useButton(props, ref);
    const { hoverProps, isHovered } = useHover(props);
    const { focusProps, isFocused, isFocusVisible } = useFocusRing(props);
    const onlyIcon = props.icon !== undefined;
    const content = onlyIcon ? (props.icon) : (React.createElement(React.Fragment, null,
        props.startIcon,
        props.children,
        props.endIcon));
    const isLoadingAriaLiveLabel = `${typeof props.children === 'string'
        ? props.children
        : (_a = buttonProps['aria-label']) !== null && _a !== void 0 ? _a : 'is'} loading`.trim();
    return (React.createElement("button", { ...mergeProps(buttonProps, hoverProps, focusProps), ref: ref, className: classNames(button({
            variant: props.variant,
            color: props.color,
            isCompact: props.isCompact,
            isLoading: props.isLoading,
        }), props.className), style: props.style, title: props.title, "aria-disabled": props.isLoading || undefined, "data-disabled": props.isDisabled || undefined, "data-pressed": isPressed || undefined, "data-hovered": isHovered || undefined, "data-focused": isFocused || undefined, "data-focus-visible": isFocusVisible || undefined }, props.isLoading ? (React.createElement(React.Fragment, null,
        onlyIcon ? null : 'Loading',
        React.createElement(ProgressCircle, { "aria-hidden": "true", "aria-label": isLoadingAriaLiveLabel, isIndeterminate: true }))) : (content)));
}
export const Button = forwardRef(BaseButton);
//# sourceMappingURL=NewButton.js.map