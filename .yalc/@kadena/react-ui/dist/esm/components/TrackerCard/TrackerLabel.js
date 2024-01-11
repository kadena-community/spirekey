import classNames from 'classnames';
import React from 'react';
import { MaskedValue } from '..';
import { displayVariant, gapValueLabelVariant, LabelTitle, LabelValue, LabelValueContainer, layoutVariant, } from './TrackerCard.css';
export const TrackerLabel = ({ item, index, variant = 'vertical', }) => {
    const classLabelValue = classNames(LabelValueContainer, displayVariant[variant], layoutVariant[variant], gapValueLabelVariant[variant]);
    return (React.createElement("div", { className: classLabelValue, "data-testid": `kda-label-value-container-${index}` },
        React.createElement("div", { className: LabelTitle, key: `label-${index}`, "data-testid": `kda-label-${index}` }, item.label),
        item.isAccount && item.value ? (React.createElement(MaskedValue, { value: item.value, defaultVisibility: item.defaultVisible, startUnmaskedValues: item.startUnmasked, endUnmaskedValues: item.endUnmasked, key: `masked-value-${index}`, "data-testid": `kda-masked-value-${index}` })) : (React.createElement("div", { className: LabelValue, key: `value-${index}`, "data-testid": `kda-value-${index}` }, item.value))));
};
//# sourceMappingURL=TrackerLabel.js.map