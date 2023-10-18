import { Tag } from '../Tag';
import React from 'react';
import { boldTextClass, containerClass, imageClass, linkContainerClass, tagClass, tagContainerClass, } from './ProfileSummary.css';
export const ProfileSummaryRoot = ({ name, title, imageSrc, tags = undefined, children, }) => {
    return (React.createElement("div", { className: containerClass },
        React.createElement("img", { className: imageClass, src: imageSrc, alt: name }),
        React.createElement("div", null,
            React.createElement("span", { className: boldTextClass }, name),
            React.createElement("span", null, title),
            tags && (React.createElement("ul", { className: tagContainerClass }, tags.map((tag, i) => (React.createElement("li", { className: tagClass, key: i },
                React.createElement(Tag, { key: i }, tag)))))),
            children && (React.createElement(React.Fragment, null,
                React.createElement("span", { className: boldTextClass }, "Links"),
                React.createElement("ul", { className: linkContainerClass }, children))))));
};
//# sourceMappingURL=ProfileSummaryRoot.js.map