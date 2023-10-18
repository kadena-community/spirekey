import classNames from 'classnames';
import React from 'react';
import { checkpointContainerStyle, circleColorVariant, circleLineContainerStyle, circleStyle, lineColorVariant, lineStyle, progressBarContentStyle, progressBarStyle, textColorVariant, textContainerStyle, } from './ProgressBar.css';
export const ProgressBar = ({ checkpoints }) => {
    return (React.createElement("div", { className: progressBarStyle, "data-testid": "kda-progress-bar" },
        React.createElement("div", { className: progressBarContentStyle }, checkpoints.map((checkpoint, index) => {
            return (React.createElement(React.Fragment, null,
                React.createElement("div", { className: checkpointContainerStyle, key: index, "data-testid": `kda-checkpoint-container-${index}` },
                    React.createElement("div", { className: classNames(circleLineContainerStyle) },
                        React.createElement("div", { className: classNames(circleStyle, circleColorVariant[checkpoint.status]) }),
                        index !== checkpoints.length - 1 ? (React.createElement("div", { className: classNames(lineStyle, lineColorVariant[checkpoints[index + 1].status]) })) : null),
                    React.createElement("div", { className: classNames(textContainerStyle, textColorVariant[checkpoint.status]) }, checkpoint.title))));
        }))));
};
//# sourceMappingURL=ProgressBar.js.map