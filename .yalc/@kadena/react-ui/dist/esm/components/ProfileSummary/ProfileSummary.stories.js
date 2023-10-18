import { ProfileSummary } from '../ProfileSummary';
import React from 'react';
const meta = {
    title: 'Content/ProfileSummary',
    component: ProfileSummary.Root,
    parameters: {
        docs: {
            description: {
                component: 'The ProfileSummary component renders a card with a profile picture, name, title, tags, and links. The links are rendered using the `Link` component and can be set with the `links` prop.',
            },
        },
    },
};
export default meta;
export const Primary = {
    name: 'ProfileSummary',
    args: {
        name: 'Tasos Bitsios',
        title: 'Developer Experience Developer (DED)',
        tags: ['Chainweb-stream', 'SSE'],
        imageSrc: 'https://avatars.githubusercontent.com/u/115649719?v=4',
        links: {
            'Personal website': 'https://tasosbitsios.com',
            Twitter: 'https://twitter.com/tasosbitsios',
            'Custom link': 'https://kadena.io',
        },
    },
    render: ({ name, title, tags, imageSrc, links }) => {
        return (React.createElement(ProfileSummary.Root, { name: name, title: title, tags: tags, imageSrc: imageSrc }, Object.entries(links).map(([label, href]) => (React.createElement(ProfileSummary.Link, { href: href, key: href }, label)))));
    },
};
//# sourceMappingURL=ProfileSummary.stories.js.map