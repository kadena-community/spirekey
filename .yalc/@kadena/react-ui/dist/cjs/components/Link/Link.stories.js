"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Primary = void 0;
const Link_1 = require("../Link");
const react_1 = __importDefault(require("react"));
const __1 = require("..");
const Icon_1 = require("../Icon");
const meta = {
    title: 'Components/Link',
    component: Link_1.Link,
    parameters: {
        status: {
            type: ['inDevelopment'],
        },
        docs: {
            description: {
                component: 'This component provides a styled anchor element that takes an optional icon prop that can be aligned to the left or right of the text.<br><br><i>Note: In times when you need to use a different `Link` component (like next/link in Next.js), you can wrap it in this component and set the `asChild` prop to pass on styles, icons, and additional props.</i>',
            },
        },
    },
    argTypes: {
        href: {
            description: "The href prop that is passed to the anchor or child element. If you're using the 'asChild' prop, you can pass the href to the child element and leave it undefined on the Link element. In times when both are defined, the child element href will be used.",
            control: {
                type: 'text',
            },
        },
        target: {
            control: {
                type: 'select',
                options: ['_blank', '_self', '_parent', '_top'],
            },
        },
        icon: {
            options: [
                ...['-'],
                ...Object.keys(Icon_1.SystemIcon),
            ],
            control: {
                type: 'select',
            },
        },
        iconAlign: {
            description: 'Align icon to left or right',
            options: ['left', 'right'],
            control: {
                type: 'radio',
            },
            if: { arg: 'selectIcon', neq: '-' },
        },
        asChild: {
            description: "Use this prop when you're using a different Link component and want to pass on styles, icons, and additional props. For example when using next/link in Next.js.",
        },
        block: {
            description: 'Set to true to make the link a block element.',
        },
    },
};
exports.default = meta;
exports.Primary = {
    name: 'Link',
    args: {
        href: 'https://kadena.io',
        target: '_blank',
        icon: 'Link',
        iconAlign: 'left',
    },
    render: ({ href, target, icon, iconAlign }) => {
        return (react_1.default.createElement(react_1.default.Fragment, null,
            react_1.default.createElement(__1.Stack, { flexDirection: "row", gap: "xs" },
                react_1.default.createElement(Link_1.Link, { href: href, target: target, asChild: true }, "Link without icon"),
                react_1.default.createElement(Link_1.Link, { href: `${href}?${Date.now()}`, target: target, iconAlign: iconAlign, icon: icon }, "Non-visited"),
                react_1.default.createElement(Link_1.Link, { href: href, target: target, icon: icon }, "Kadena.io"),
                react_1.default.createElement(Link_1.Link, { asChild: true },
                    react_1.default.createElement("a", { href: href, target: target }, "Link asChild"))),
            react_1.default.createElement(Link_1.Link, { href: href, target: target, icon: icon, block: true }, "Block Link")));
    },
};
//# sourceMappingURL=Link.stories.js.map