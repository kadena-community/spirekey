"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TrackerCard = void 0;
const classnames_1 = __importDefault(require("classnames"));
const react_1 = __importDefault(require("react"));
const __1 = require("..");
const TrackerCard_css_1 = require("./TrackerCard.css");
const TrackerCard = ({ labelValues, icon, helperText, helperTextType = 'mild', variant = 'vertical', }) => {
    const classCardContainer = (0, classnames_1.default)(TrackerCard_css_1.CardContainer, icon ? TrackerCard_css_1.layoutVariant[variant] : null, TrackerCard_css_1.gridVariant[variant]);
    const classLabelValue = (0, classnames_1.default)(TrackerCard_css_1.LabelValueContainer, TrackerCard_css_1.displayVariant[variant], TrackerCard_css_1.layoutVariant[variant], TrackerCard_css_1.gapValueLabelVariant[variant]);
    const classWarningContainer = (0, classnames_1.default)(TrackerCard_css_1.TrackerWarningContainer, TrackerCard_css_1.warningVariant[helperTextType]);
    const Icon = icon && __1.ProductIcon[icon];
    return (react_1.default.createElement("div", { className: classCardContainer, "data-testid": "kda-tracker-card" },
        Icon ? react_1.default.createElement(Icon, { "data-testid": "kda-icon", size: "xl" }) : null,
        react_1.default.createElement("div", { className: TrackerCard_css_1.ContentContainer },
            react_1.default.createElement("div", { className: TrackerCard_css_1.DataContainer, "data-testid": "kda-data-container" }, labelValues === null || labelValues === void 0 ? void 0 : labelValues.map((item, index) => {
                return (react_1.default.createElement("div", { className: classLabelValue, key: `label-value-container-${index}`, "data-testid": `kda-label-value-container-${index}` },
                    react_1.default.createElement("div", { className: TrackerCard_css_1.LabelTitle, key: `label-${index}`, "data-testid": `kda-label-${index}` }, item.label),
                    item.isAccount && item.value ? (react_1.default.createElement(__1.MaskedValue, { value: item.value, defaultVisibility: item.defaultVisible, startUnmaskedValues: item.startUnmasked, endUnmaskedValues: item.endUnmasked, key: `masked-value-${index}`, "data-testid": `kda-masked-value-${index}` })) : (react_1.default.createElement("div", { className: TrackerCard_css_1.LabelValue, key: `value-${index}`, "data-testid": `kda-value-${index}` }, item.value))));
            })),
            helperText ? (react_1.default.createElement("div", { className: classWarningContainer, "data-testid": "kda-helper-text" }, helperText)) : null)));
};
exports.TrackerCard = TrackerCard;
//# sourceMappingURL=TrackerCard.js.map