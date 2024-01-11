import { Tag, TagGroup, TagItem } from '../Tag';
import React, { useState } from 'react';
import { Stack, SystemIcon } from '..';
const meta = {
    title: 'Components/TagGroup',
    component: TagGroup,
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
export default meta;
const tags = [
    { id: '1', name: 'News' },
    { id: '2', name: 'Travel' },
    { id: '3', name: 'Gaming' },
    { id: '4', name: 'Shopping' },
];
export const Group = {
    name: 'Group of tags',
    args: {
        label: undefined,
    },
    render: ({ label }) => {
        return (React.createElement(TagGroup, { label: label }, tags.map((item) => (React.createElement(TagItem, { key: item.id }, item.name)))));
    },
};
export const Removable = {
    name: 'Removable tags',
    render: () => {
        const [list, setList] = useState(tags);
        return (React.createElement(TagGroup, { label: "Filter Categories", onRemove: (keys) => {
                setList(list.filter((item) => !keys.has(item.id)));
            } }, list.map((item) => (React.createElement(TagItem, { key: item.id }, item.name)))));
    },
};
export const Disabled = {
    name: 'Disabled tag',
    render: () => {
        const [list, setList] = useState(tags);
        return (React.createElement(TagGroup, { label: "Filter Categories", onRemove: (keys) => {
                setList(list.filter((item) => !keys.has(item.id)));
            }, disabledKeys: ['2'] }, list.map((item) => (React.createElement(TagItem, { key: item.id }, item.name)))));
    },
};
export const AsChild = {
    name: 'Tag styles and props set on their child',
    render: () => {
        return (React.createElement(TagGroup, { label: "Kadena Resources", tagAsChild: true },
            React.createElement(TagItem, { key: "docs" },
                React.createElement("a", { href: "https://docs.kadena.io/" }, "Kadena Docs")),
            React.createElement(TagItem, { key: "tools" },
                React.createElement("a", { href: "https://tools.kadena.io/" }, "Tools Website"))));
    },
};
export const TagComponent = {
    name: 'Tag Styles Component',
    render: () => {
        return (React.createElement(Tag, null,
            React.createElement(Stack, { gap: "xs", alignItems: "center" },
                "Tag Styles",
                React.createElement(SystemIcon.Edit, { size: "sm" }))));
    },
};
//# sourceMappingURL=Tag.stories.js.map