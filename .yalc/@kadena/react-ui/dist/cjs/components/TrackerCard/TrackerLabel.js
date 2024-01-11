"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TrackerLabel = void 0;
const classnames_1 = __importDefault(require("classnames"));
const react_1 = __importDefault(require("react"));
const __1 = require("..");
const TrackerCard_css_1 = require("./TrackerCard.css");
const TrackerLabel = ({ item, index, variant = 'vertical', }) => {
    const classLabelValue = (0, classnames_1.default)(TrackerCard_css_1.LabelValueContainer, TrackerCard_css_1.displayVariant[variant], TrackerCard_css_1.layoutVariant[variant], TrackerCard_css_1.gapValueLabelVariant[variant]);
    return (react_1.default.createElement("div", { className: classLabelValue, "data-testid": `kda-label-value-container-${index}` },
        react_1.default.createElement("div", { className: TrackerCard_css_1.LabelTitle, key: `label-${index}`, "data-testid": `kda-label-${index}` }, item.label),
        item.isAccount && item.value ? (react_1.default.createElement(__1.MaskedValue, { value: item.value, defaultVisibility: item.defaultVisible, startUnmaskedValues: item.startUnmasked, endUnmaskedValues: item.endUnmasked, key: `masked-value-${index}`, "data-testid": `kda-masked-value-${index}` })) : (react_1.default.createElement("div", { className: TrackerCard_css_1.LabelValue, key: `value-${index}`, "data-testid": `kda-value-${index}` }, item.value))));
};
exports.TrackerLabel = TrackerLabel;
//# sourceMappingURL=TrackerLabel.js.map