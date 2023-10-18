import { boldTextClass, imageClass, imageContainerClass, linkContainerClass, profileCardClass, tagClass, tagContainerClass, } from './ProfileCard.css';
import { Grid } from '../Grid';
import { Link } from '../Link';
import { Tag } from '../Tag';
import React from 'react';
export default {};
export const ProfileCard = ({ name, title, imageSrc, tags = undefined, links = undefined, }) => {
    return (React.createElement("div", { className: profileCardClass },
        React.createElement(Grid.Root, { columns: 12 },
            React.createElement(Grid.Item, { columnSpan: 2 },
                React.createElement("div", { className: imageContainerClass },
                    React.createElement("img", { className: imageClass, src: imageSrc, alt: name }))),
            React.createElement(Grid.Item, { columnSpan: 10 },
                React.createElement("p", { className: boldTextClass }, name),
                React.createElement("p", null, title),
                tags && (React.createElement("ul", { className: tagContainerClass }, tags.map((tag, i) => (React.createElement("li", { className: tagClass, key: i },
                    React.createElement(Tag, { key: i }, tag)))))),
                links && (React.createElement(React.Fragment, null,
                    React.createElement("p", { className: boldTextClass }, "Links"),
                    React.createElement("ul", { className: linkContainerClass }, Object.entries(links).map(([text, href]) => (React.createElement("li", { key: text },
                        React.createElement(Link, { href: href }, text)))))))))));
};
//# sourceMappingURL=ProfileCard.js.map