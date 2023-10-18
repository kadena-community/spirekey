import { ProfileCard } from '../ProfileCard';
import React from 'react';
const meta = {
    title: 'Content/ProfileCard',
    component: ProfileCard,
    parameters: {
        docs: {
            description: {
                component: 'The ProfileCard component renders a card with a profile picture, name, title, tags, and links. The links are rendered using the `Link` component and can be set with the `links` prop.',
            },
        },
    },
    argTypes: {
        name: {
            control: {
                type: 'text',
            },
        },
        title: {
            control: {
                type: 'text',
            },
        },
        imageSrc: {
            control: {
                type: 'text',
            },
        },
        tags: {
            control: {
                type: 'array',
            },
        },
    },
};
export default meta;
export const Primary = {
    name: 'ProfileCard',
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
        return (React.createElement(ProfileCard, { name: name, title: title, tags: tags, imageSrc: imageSrc, links: links }));
    },
};
//# sourceMappingURL=ProfileCard.stories.js.map