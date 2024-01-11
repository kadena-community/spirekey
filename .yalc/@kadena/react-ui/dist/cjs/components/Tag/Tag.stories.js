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
exports.TagComponent = exports.AsChild = exports.Disabled = exports.Removable = exports.Group = void 0;
const Tag_1 = require("../Tag");
const react_1 = __importStar(require("react"));
const __1 = require("..");
const meta = {
    title: 'Components/TagGroup',
    component: Tag_1.TagGroup,
    parameters: {
        status: {
            type: ['inDevelopment'],
        },
        docs: {
            description: {
                component: 'The `TagGroup` component is an implementation of [useTabGroup from react-aria](https://react-spectrum.adobe.com/react-aria/useTagGroup.html). Currently we have enabled options to close or disable tags, but we have disabled features like selection since there has not yet been a need for them.\n\nThe compound component is composed of the exposed `TagGroup` and `TagItem` components, check the examples below to see how to use them.\n\n*Note: In most cases, you should use the `TagGroup` and `TagItem` component composition to ensure that the tags are accessible, however if you need only the tag component styles, you can use the `Tag` component to compose your own custom component.*',
            },
        },
    },
    argTypes: {
        label: {
            description: 'Label for the group. Accepts a string or a ReactNode.',
            control: {
                type: 'text',
            },
        },
        onRemove: {
            description: 'Callback when a tag is removed',
            control: {
                type: null,
            },
        },
        disabledKeys: {
            description: 'Keys of tags that are disabled',
            control: {
                type: null,
            },
        },
        className: {
            description: "Optional classnames to add to the tag's container",
            control: {
                type: null,
            },
        },
    },
};
exports.default = meta;
const tags = [
    { id: '1', name: 'News' },
    { id: '2', name: 'Travel' },
    { id: '3', name: 'Gaming' },
    { id: '4', name: 'Shopping' },
];
exports.Group = {
    name: 'Group of tags',
    args: {
        label: undefined,
    },
    render: ({ label }) => {
        return (react_1.default.createElement(Tag_1.TagGroup, { label: label }, tags.map((item) => (react_1.default.createElement(Tag_1.TagItem, { key: item.id }, item.name)))));
    },
};
exports.Removable = {
    name: 'Removable tags',
    render: () => {
        const [list, setList] = (0, react_1.useState)(tags);
        return (react_1.default.createElement(Tag_1.TagGroup, { label: "Filter Categories", onRemove: (keys) => {
                setList(list.filter((item) => !keys.has(item.id)));
            } }, list.map((item) => (react_1.default.createElement(Tag_1.TagItem, { key: item.id }, item.name)))));
    },
};
exports.Disabled = {
    name: 'Disabled tag',
    render: () => {
        const [list, setList] = (0, react_1.useState)(tags);
        return (react_1.default.createElement(Tag_1.TagGroup, { label: "Filter Categories", onRemove: (keys) => {
                setList(list.filter((item) => !keys.has(item.id)));
            }, disabledKeys: ['2'] }, list.map((item) => (react_1.default.createElement(Tag_1.TagItem, { key: item.id }, item.name)))));
    },
};
exports.AsChild = {
    name: 'Tag styles and props set on their child',
    render: () => {
        return (react_1.default.createElement(Tag_1.TagGroup, { label: "Kadena Resources", tagAsChild: true },
            react_1.default.createElement(Tag_1.TagItem, { key: "docs" },
                react_1.default.createElement("a", { href: "https://docs.kadena.io/" }, "Kadena Docs")),
            react_1.default.createElement(Tag_1.TagItem, { key: "tools" },
                react_1.default.createElement("a", { href: "https://tools.kadena.io/" }, "Tools Website"))));
    },
};
exports.TagComponent = {
    name: 'Tag Styles Component',
    render: () => {
        return (react_1.default.createElement(Tag_1.Tag, null,
            react_1.default.createElement(__1.Stack, { gap: "xs", alignItems: "center" },
                "Tag Styles",
                react_1.default.createElement(__1.SystemIcon.Edit, { size: "sm" }))));
    },
};
//# sourceMappingURL=Tag.stories.js.map