import { Box } from '../Layout';
import { mergeRefs } from '@react-aria/utils';
import React, { cloneElement, useRef } from 'react';
import { useTooltip, useTooltipTrigger } from 'react-aria';
import { useTooltipTriggerState } from 'react-stately';
import { tooltipPositionVariants } from './Tooltip.css';
export const Tooltip = ({ children, content, position = 'right', ...props }) => {
    const config = {
        delay: 500,
        closeDelay: 300,
        ...props,
    };
    const state = useTooltipTriggerState(config);
    const ref = useRef(null);
    const { triggerProps, tooltipProps: baseTooltipProps } = useTooltipTrigger(config, state, ref);
    const { tooltipProps } = useTooltip(baseTooltipProps, state);
    return (React.createElement(Box, { position: "relative" },
        cloneElement(children, {
            ...triggerProps,
            ref: mergeRefs(ref, children.ref),
        }),
        state.isOpen && (React.createElement("span", { className: tooltipPositionVariants[position], ...tooltipProps }, content))));
};
//# sourceMappingURL=Tooltip.js.map