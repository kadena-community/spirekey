import { Tabs } from '../Tabs';
import { Text } from '../Typography/Text/Text';
import { withCenteredStory } from '../../utils/withCenteredStory';
import React from 'react';
const ExampleTabs = [
    'He-man',
    'Skeletor',
    'Orko',
    'Teela-Na',
    'Cringer',
    'King Randor',
];
const meta = {
    title: 'Layout/Tabs',
    decorators: [withCenteredStory],
    parameters: {
        docs: {
            description: {
                component: 'The Tab component consists of three sub components:<br /><strong><Tabs.Root></strong> as the parent container<br /><strong><Tabs.Tab></strong> for each tab item<br /><strong><Tabs.Content></strong> for the tab content<br /><br /><em>This component has a controlled and uncontrolled state. When a currentTab is not provided, the component will track state internally.</em>',
            },
        },
    },
    component: Tabs.Root,
    argTypes: {
        itemsCount: {
            control: { type: 'range', min: 1, max: 6, step: 1 },
            description: 'Total number of tabs.',
            table: {
                type: { summary: 'number' },
            },
        },
        initialTab: {
            options: [
                ...['-'],
                ...Object.values(ExampleTabs),
            ],
            control: {
                type: 'select',
            },
            description: 'The default selected page <em>before</em> any interaction.<br /><small>Changing value will not trigger story re-render.</small>',
            table: {
                defaultValue: { summary: 'undefined' },
                type: { summary: 'string | undefined' },
            },
        },
        currentTab: {
            options: [
                ...[undefined],
                ...Object.values(ExampleTabs),
            ],
            control: {
                type: 'select',
            },
            description: 'Current active tab. Used when component is controlled.<br /><small>Set to make component controlled.</small>',
            table: {
                defaultValue: { summary: 'undefined' },
                type: { summary: 'string | undefined' },
            },
        },
    },
};
export default meta;
export const Primary = {
    name: 'Tabs',
    args: {
        itemsCount: 6,
        initialTab: 'Skeletor',
        currentTab: undefined,
    },
    render: ({ itemsCount, initialTab, currentTab }) => {
        const tabs = ExampleTabs.slice(0, itemsCount);
        return (React.createElement(React.Fragment, null,
            React.createElement(Tabs.Root, { initialTab: initialTab, currentTab: currentTab },
                tabs.map((tab) => {
                    return (React.createElement(Tabs.Tab, { key: tab, id: tab }, tab));
                }),
                tabs.map((tab) => {
                    return (React.createElement(Tabs.Content, { key: tab, id: tab },
                        React.createElement(Text, null,
                            "Content for Tab '",
                            tab,
                            "'")));
                }))));
    },
};
//# sourceMappingURL=Tabs.stories.js.map