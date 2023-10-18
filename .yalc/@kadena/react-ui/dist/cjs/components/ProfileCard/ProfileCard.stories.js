"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Primary = void 0;
const ProfileCard_1 = require("../ProfileCard");
const react_1 = __importDefault(require("react"));
const meta = {
    title: 'Content/ProfileCard',
    component: ProfileCard_1.ProfileCard,
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
exports.default = meta;
exports.Primary = {
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
        return (react_1.default.createElement(ProfileCard_1.ProfileCard, { name: name, title: title, tags: tags, imageSrc: imageSrc, links: links }));
    },
};
//# sourceMappingURL=ProfileCard.stories.js.map