"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Dynamic = void 0;
const BrandLogo_1 = require("../BrandLogo");
const react_1 = __importStar(require("react"));
const _1 = require("./");
const sampleNavItems = [
    {
        children: 'Faucet',
        href: '#faucet',
    },
    {
        children: 'Transactions',
        href: '#transactions',
    },
    {
        children: 'Balance',
        href: '#balance',
    },
    {
        children: 'Learn Pact',
        href: '#pact',
    },
];
const sampleNetworkItems = ['Mainnet', 'Testnet'];
const meta = {
    title: 'Navigation/NavHeader',
    parameters: {
        controls: {
            hideNoControlsWarning: true,
            sort: 'requiredFirst',
        },
        docs: {
            description: {
                component: 'The NavHeader component provides styled top bar navigation that be configured with main nav links on the left side and any additional custom items on the right side.<br><br><i>Note: In times when you need to use a different `Link` component (like next/link in Next.js), you can wrap it in the `NavHeader.Link` component and set the `asChild` prop to pass on styles and additional props.</i><br><br><i>In progress: maximum navigation items is currently limited (not technically enforced).<br>Pending design update to support more items.</i>',
            },
        },
    },
    argTypes: {
        brand: {
            control: {
                type: 'select',
            },
            description: 'Logo variant',
            options: ['-', ...BrandLogo_1.logoVariants],
            table: {
                defaultValue: { summary: BrandLogo_1.logoVariants[0] },
            },
        },
        linksCount: {
            control: { type: 'range', min: 1, max: sampleNavItems.length, step: 1 },
            description: 'Adjust sample navigation items count',
        },
        navHeaderActiveLink: {
            control: { type: 'select' },
            description: 'Allows users to control the active href',
            options: Object.values(sampleNavItems).map((item) => item.children),
            table: {
                defaultValue: { summary: undefined },
            },
        },
    },
};
exports.Dynamic = {
    name: 'NavHeader',
    args: {
        brand: BrandLogo_1.logoVariants[0],
        linksCount: 3,
        navHeaderActiveLink: undefined,
    },
    render: ({ brand, linksCount, navHeaderActiveLink }) => {
        var _a;
        const activeHref = navHeaderActiveLink
            ? (_a = Object.values(sampleNavItems).find((item) => item.children === navHeaderActiveLink)) === null || _a === void 0 ? void 0 : _a.href
            : undefined;
        const [value, setValue] = (0, react_1.useState)(sampleNetworkItems[0]);
        return (react_1.default.createElement(_1.NavHeader.Root, { brand: brand },
            react_1.default.createElement(_1.NavHeader.Navigation, { activeHref: activeHref }, sampleNavItems.slice(0, linksCount).map((item, index) => (react_1.default.createElement(_1.NavHeader.Link, { key: index, href: item.href, onClick: (event) => console.log(item.children, { event }) }, item.children)))),
            react_1.default.createElement(_1.NavHeader.Content, null,
                react_1.default.createElement(_1.NavHeader.Select, { id: "network-select", ariaLabel: "Select Network", value: value, onChange: (e) => {
                        console.log('clicked on', e.target.value);
                        setValue(e.target.value);
                    }, icon: "Earth" }, sampleNetworkItems.map((network) => (react_1.default.createElement("option", { key: network, value: network }, network)))))));
    },
};
exports.default = meta;
//# sourceMappingURL=NavHeader.stories.js.map