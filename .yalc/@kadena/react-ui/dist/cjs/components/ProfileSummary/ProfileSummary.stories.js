"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Primary = void 0;
const ProfileSummary_1 = require("../ProfileSummary");
const react_1 = __importDefault(require("react"));
const meta = {
    title: 'Content/ProfileSummary',
    component: ProfileSummary_1.ProfileSummary.Root,
    parameters: {
        docs: {
            description: {
                component: 'The ProfileSummary component renders a card with a profile picture, name, title, tags, and links. The links are rendered using the `Link` component and can be set with the `links` prop.',
            },
        },
    },
};
exports.default = meta;
exports.Primary = {
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
        return (react_1.default.createElement(ProfileSummary_1.ProfileSummary.Root, { name: name, title: title, tags: tags, imageSrc: imageSrc }, Object.entries(links).map(([label, href]) => (react_1.default.createElement(ProfileSummary_1.ProfileSummary.Link, { href: href, key: href }, label)))));
    },
};
//# sourceMappingURL=ProfileSummary.stories.js.map