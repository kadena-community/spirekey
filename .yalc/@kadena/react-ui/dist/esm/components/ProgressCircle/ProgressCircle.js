import { clamp } from '@react-aria/utils';
import classNames from 'classnames';
import React from 'react';
import { useProgressBar } from 'react-aria';
import { atoms } from '../../styles/atoms.css';
import { testProps } from '../../utils/testId';
const SPINNER_SIZE = {
    sm: 16,
    md: 24,
    lg: 32,
};
export function ProgressCircle(props) {
    var _a;
    const { isIndeterminate, value = 0, minValue = 0, maxValue = 100 } = props;
    const v = clamp(value, minValue, maxValue);
    const { progressBarProps } = useProgressBar({
        ...props,
        value: v,
    });
    const size = (_a = props.size) !== null && _a !== void 0 ? _a : 'md';
    const spinnerSize = SPINNER_SIZE[size];
    const center = spinnerSize / 2;
    const strokeWidth = spinnerSize / 8;
    const r = center - strokeWidth;
    const c = 2 * r * Math.PI;
    const percentage = isIndeterminate
        ? 0.25
        : (v - minValue) / (maxValue - minValue);
    const offset = c - percentage * c;
    return (React.createElement("svg", { ...progressBarProps, ...testProps(props), className: classNames(atoms({
            color: props.color,
        }), props.className), width: spinnerSize, height: spinnerSize, viewBox: `0 0 ${spinnerSize} ${spinnerSize}`, fill: "none", strokeWidth: strokeWidth },
        React.createElement("circle", { role: "presentation", cx: center, cy: center, r: r, stroke: "gray" }),
        React.createElement("circle", { ...testProps(props, 'progress'), role: "presentation", cx: center, cy: center, r: r, stroke: "currentColor", strokeDasharray: `${c} ${c}`, strokeDashoffset: offset, transform: `rotate(-90 ${center} ${center})` }, props.isIndeterminate && (React.createElement("animateTransform", { ...testProps(props, 'indeterminate-animation'), attributeName: "transform", type: "rotate", begin: "0s", dur: "1s", from: `0 ${center} ${center}`, to: `360 ${center} ${center}`, repeatCount: "indefinite" })))));
}
//# sourceMappingURL=ProgressCircle.js.map