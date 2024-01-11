"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProgressCircle = void 0;
const utils_1 = require("@react-aria/utils");
const classnames_1 = __importDefault(require("classnames"));
const react_1 = __importDefault(require("react"));
const react_aria_1 = require("react-aria");
const atoms_css_1 = require("../../styles/atoms.css");
const testId_1 = require("../../utils/testId");
const SPINNER_SIZE = {
    sm: 16,
    md: 24,
    lg: 32,
};
function ProgressCircle(props) {
    var _a;
    const { isIndeterminate, value = 0, minValue = 0, maxValue = 100 } = props;
    const v = (0, utils_1.clamp)(value, minValue, maxValue);
    const { progressBarProps } = (0, react_aria_1.useProgressBar)({
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
    return (react_1.default.createElement("svg", { ...progressBarProps, ...(0, testId_1.testProps)(props), className: (0, classnames_1.default)((0, atoms_css_1.atoms)({
            color: props.color,
        }), props.className), width: spinnerSize, height: spinnerSize, viewBox: `0 0 ${spinnerSize} ${spinnerSize}`, fill: "none", strokeWidth: strokeWidth },
        react_1.default.createElement("circle", { role: "presentation", cx: center, cy: center, r: r, stroke: "gray" }),
        react_1.default.createElement("circle", { ...(0, testId_1.testProps)(props, 'progress'), role: "presentation", cx: center, cy: center, r: r, stroke: "currentColor", strokeDasharray: `${c} ${c}`, strokeDashoffset: offset, transform: `rotate(-90 ${center} ${center})` }, props.isIndeterminate && (react_1.default.createElement("animateTransform", { ...(0, testId_1.testProps)(props, 'indeterminate-animation'), attributeName: "transform", type: "rotate", begin: "0s", dur: "1s", from: `0 ${center} ${center}`, to: `360 ${center} ${center}`, repeatCount: "indefinite" })))));
}
exports.ProgressCircle = ProgressCircle;
//# sourceMappingURL=ProgressCircle.js.map