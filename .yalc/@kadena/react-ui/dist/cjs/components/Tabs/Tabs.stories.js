"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Primary = void 0;
const Tabs_1 = require("../Tabs");
const Text_1 = require("../Typography/Text/Text");
const withCenteredStory_1 = require("../../utils/withCenteredStory");
const react_1 = __importDefault(require("react"));
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
    decorators: [withCenteredStory_1.withCenteredStory],
    parameters: {
        status: {
            type: ['inDevelopment'],
        },
        docs: {
            description: {
                component: 'The Tab component consists of three sub components:<br /><strong><Tabs.Root></strong> as the parent container<br /><strong><Tabs.Tab></strong> for each tab item<br /><strong><Tabs.Content></strong> for the tab content<br /><br /><em>This component has a controlled and uncontrolled state. When a currentTab is not provided, the component will track state internally.</em>',
            },
        },
    },
    component: Tabs_1.Tabs.Root,
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
exports.default = meta;
exports.Primary = {
    name: 'Tabs',
    args: {
        itemsCount: 6,
        initialTab: 'Skeletor',
        currentTab: undefined,
    },
    render: ({ itemsCount, initialTab, currentTab }) => {
        const tabs = ExampleTabs.slice(0, itemsCount);
        return (react_1.default.createElement(react_1.default.Fragment, null,
            react_1.default.createElement(Tabs_1.Tabs.Root, { initialTab: initialTab, currentTab: currentTab },
                tabs.map((tab) => {
                    return (react_1.default.createElement(Tabs_1.Tabs.Tab, { key: tab, id: tab }, tab));
                }),
                tabs.map((tab) => {
                    return (react_1.default.createElement(Tabs_1.Tabs.Content, { key: tab, id: tab },
                        react_1.default.createElement(Text_1.Text, null,
                            "Content for Tab '",
                            tab,
                            "'")));
                }))));
    },
};
//# sourceMappingURL=Tabs.stories.js.map