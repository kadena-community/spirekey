"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProgressBar = void 0;
const classnames_1 = __importDefault(require("classnames"));
const react_1 = __importDefault(require("react"));
const ProgressBar_css_1 = require("./ProgressBar.css");
const ProgressBar = ({ checkpoints }) => {
    return (react_1.default.createElement("div", { className: ProgressBar_css_1.progressBarStyle, "data-testid": "kda-progress-bar" },
        react_1.default.createElement("div", { className: ProgressBar_css_1.progressBarContentStyle }, checkpoints.map((checkpoint, index) => {
            return (react_1.default.createElement(react_1.default.Fragment, null,
                react_1.default.createElement("div", { className: ProgressBar_css_1.checkpointContainerStyle, key: index, "data-testid": `kda-checkpoint-container-${index}` },
                    react_1.default.createElement("div", { className: (0, classnames_1.default)(ProgressBar_css_1.circleLineContainerStyle) },
                        react_1.default.createElement("div", { className: (0, classnames_1.default)(ProgressBar_css_1.circleStyle, ProgressBar_css_1.circleColorVariant[checkpoint.status]) }),
                        index !== checkpoints.length - 1 ? (react_1.default.createElement("div", { className: (0, classnames_1.default)(ProgressBar_css_1.lineStyle, ProgressBar_css_1.lineColorVariant[checkpoints[index + 1].status]) })) : null),
                    react_1.default.createElement("div", { className: (0, classnames_1.default)(ProgressBar_css_1.textContainerStyle, ProgressBar_css_1.textColorVariant[checkpoint.status]) }, checkpoint.title))));
        }))));
};
exports.ProgressBar = ProgressBar;
//# sourceMappingURL=ProgressBar.js.map