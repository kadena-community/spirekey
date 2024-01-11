import React from 'react';
const CenteredStory = ({ horizontal, vertical, children, }) => {
    return (React.createElement("div", { style: {
            minHeight: '100%',
            width: '100%',
            display: 'flex',
            alignItems: vertical ? 'center' : 'flex-start',
            justifyContent: horizontal ? 'center' : 'flex-start',
            overflow: 'none',
        } }, children));
};
export const withNotCenteredStory = (story) => (React.createElement(CenteredStory, null, story()));
export const withCenteredStory = (story) => (React.createElement(CenteredStory, { horizontal: true, vertical: true }, story()));
export const withHorizontallyCenteredStory = (story) => (React.createElement(CenteredStory, { horizontal: true }, story()));
export const withVerticallyCenteredStory = (story) => (React.createElement(CenteredStory, { vertical: true }, story()));
//# sourceMappingURL=withCenteredStory.js.map