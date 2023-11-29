"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Primary = void 0;
const Breadcrumbs_1 = require("../Breadcrumbs");
const Icon_1 = require("../Icon");
const react_1 = __importDefault(require("react"));
const ItemArray = [
    'He-man',
    'Skeletor',
    'Orko',
    'Teela-Na',
    'Cringer',
    'King Randor',
];
const meta = {
    title: 'Navigation/Breadcrumbs',
    parameters: {
        status: { type: 'needsRevision' },
        docs: {
            description: {
                component: 'The Breadcrumb component displays the position of the current page within the site hierarchy, allowing page visitors to navigate the page hierarchy from their current location. It uses a composition of the `Root` and `Item` subcomponents to define the paths and structure of the entire breadcrumb component.<br><br><i>Note: In times when you need to use an external `Link` component (like next/link in Next.js), you can wrap the external component in `Breadcrumb.Item` and set the `asChild` prop to pass on styles and props to the child component.</i>',
            },
        },
    },
    argTypes: {
        icon: {
            description: 'The base icon for the breadcrumb component displayed to the left of the breadcrumb items.',
            options: Object.keys(Icon_1.ProductIcon),
            control: {
                type: 'select',
            },
        },
        itemsCount: {
            control: { type: 'range', min: 1, max: 6, step: 1 },
        },
    },
};
exports.default = meta;
exports.Primary = {
    name: 'Breadcrumbs',
    args: {
        icon: 'KadenaOverview',
        itemsCount: 3,
    },
    render: ({ itemsCount, icon }) => {
        const items = ItemArray.slice(0, itemsCount);
        return (react_1.default.createElement(Breadcrumbs_1.Breadcrumbs.Root, { icon: icon }, items.map((item, idx) => {
            return (react_1.default.createElement(Breadcrumbs_1.Breadcrumbs.Item, { key: item, href: idx < items.length - 1 ? item : undefined }, item));
        })));
    },
};
//# sourceMappingURL=Breadcrumbs.stories.js.map