import classNames from 'classnames';
import React from 'react';
import { MaskedValue, ProductIcon } from '..';
import { CardContainer, ContentContainer, DataContainer, LabelTitle, LabelValue, LabelValueContainer, TrackerWarningContainer, displayVariant, gapValueLabelVariant, gridVariant, layoutVariant, warningVariant, } from './TrackerCard.css';
export const TrackerCard = ({ labelValues, icon, helperText, helperTextType = 'mild', variant = 'vertical', }) => {
    const classCardContainer = classNames(CardContainer, icon ? layoutVariant[variant] : null, gridVariant[variant]);
    const classLabelValue = classNames(LabelValueContainer, displayVariant[variant], layoutVariant[variant], gapValueLabelVariant[variant]);
    const classWarningContainer = classNames(TrackerWarningContainer, warningVariant[helperTextType]);
    const Icon = icon && ProductIcon[icon];
    return (React.createElement("div", { className: classCardContainer, "data-testid": "kda-tracker-card" },
        Icon ? React.createElement(Icon, { "data-testid": "kda-icon", size: "xl" }) : null,
        React.createElement("div", { className: ContentContainer },
            React.createElement("div", { className: DataContainer, "data-testid": "kda-data-container" }, labelValues === null || labelValues === void 0 ? void 0 : labelValues.map((item, index) => {
                return (React.createElement("div", { className: classLabelValue, key: `label-value-container-${index}`, "data-testid": `kda-label-value-container-${index}` },
                    React.createElement("div", { className: LabelTitle, key: `label-${index}`, "data-testid": `kda-label-${index}` }, item.label),
                    item.isAccount && item.value ? (React.createElement(MaskedValue, { value: item.value, defaultVisibility: item.defaultVisible, startUnmaskedValues: item.startUnmasked, endUnmaskedValues: item.endUnmasked, key: `masked-value-${index}`, "data-testid": `kda-masked-value-${index}` })) : (React.createElement("div", { className: LabelValue, key: `value-${index}`, "data-testid": `kda-value-${index}` }, item.value))));
            })),
            helperText ? (React.createElement("div", { className: classWarningContainer, "data-testid": "kda-helper-text" }, helperText)) : null)));
};
//# sourceMappingURL=TrackerCard.js.map