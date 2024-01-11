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
exports.ControlledTabsStory = exports.DefaultSelectedTabsStory = exports.TabsStory = void 0;
const Layout_1 = require("../Layout");
const Tabs_1 = require("../Tabs");
const Typography_1 = require("../Typography");
const _storyDecorators_1 = require("../../storyDecorators");
const react_1 = __importStar(require("react"));
const ExampleTabs = [
    {
        title: 'Title 1',
        content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    },
    {
        title: 'Title 2',
        content: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).  ",
    },
    {
        title: 'Title 3',
        content: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.  ",
    },
];
const ExampleManyTabs = [
    { title: 'Really Long Title', content: 'Content for tab 1' },
    { title: 'Really Long Title 2', content: 'Content for tab 2' },
    { title: 'Really Long Title 3', content: 'Content for tab 3' },
    { title: 'Really Long Title 4', content: 'Content for tab 4' },
    { title: 'Really Long Title 5', content: 'Content for tab 5' },
    { title: 'Really Long Title 6', content: 'Content for tab 6' },
    { title: 'Really Long Title 7', content: 'Content for tab 7' },
];
const meta = {
    title: 'Layout/Tabs',
    component: Tabs_1.Tabs,
    decorators: [_storyDecorators_1.onLayer2],
    parameters: {
        status: { type: 'inDevelopment' },
        docs: {
            description: {
                component: "The Tabs component is wrapper around [react-aria's](https://react-spectrum.adobe.com/react-aria/useTabList.html) useTabList hook.  Here are just a couple of examples but you can check their docs for more. The compound component is composed of the exposed `Tabs` and `TabItem` components, check the examples below to see how to use them.",
            },
        },
    },
    argTypes: {
        ['aria-label']: {
            description: 'accesibility label.',
            control: {
                type: 'text',
            },
        },
        ['aria-describedby']: {
            description: 'accesibility label.',
            control: {
                type: 'text',
            },
        },
        ['aria-details']: {
            description: 'accesibility label.',
            control: {
                type: 'text',
            },
        },
        ['aria-labelledby']: {
            description: 'accesibility label.',
            control: {
                type: 'text',
            },
        },
        selectedKey: {
            description: 'The currently selected key in the collection (controlled).',
            control: {
                type: 'select',
            },
            options: ExampleTabs.map((tab) => tab.title),
        },
        defaultSelectedKey: {
            description: 'The initial selected key in the collection (uncontrolled).',
        },
        onSelectionChange: {
            description: 'Handler that is called when the selection changes.',
            action: 'clicked',
        },
    },
};
exports.default = meta;
exports.TabsStory = {
    name: 'Tabs',
    args: {
        ['aria-label']: 'generic tabs story',
    },
    render: (props) => {
        return (react_1.default.createElement(Tabs_1.Tabs, { "aria-label": props['aria-label'] }, ExampleTabs.map((tab) => (react_1.default.createElement(Tabs_1.TabItem, { key: tab.title, title: tab.title }, tab.content)))));
    },
};
exports.DefaultSelectedTabsStory = {
    name: 'Scrollable Tabs with defaultSelectedTab',
    args: {
        ['aria-label']: 'generic tabs story',
        defaultSelectedKey: ExampleManyTabs[2].title,
    },
    render: (props) => {
        return (react_1.default.createElement(Tabs_1.Tabs, { "aria-label": props['aria-label'], defaultSelectedKey: props.defaultSelectedKey }, ExampleManyTabs.map((tab) => (react_1.default.createElement(Tabs_1.TabItem, { key: tab.title, title: tab.title }, tab.content)))));
    },
};
exports.ControlledTabsStory = {
    name: 'Tabs',
    render: () => {
        const [timePeriod, setTimePeriod] = (0, react_1.useState)('jurassic');
        return (react_1.default.createElement(Layout_1.Stack, { flexDirection: "column", gap: "lg", width: "100%" },
            react_1.default.createElement(Typography_1.Text, null,
                "Selected time period: ",
                timePeriod),
            react_1.default.createElement(Tabs_1.Tabs, { "aria-label": "Mesozoic time periods", selectedKey: timePeriod, onSelectionChange: setTimePeriod },
                react_1.default.createElement(Tabs_1.TabItem, { key: "triassic", title: "Triassic" }, "The Triassic ranges roughly from 252 million to 201 million years ago, preceding the Jurassic Period."),
                react_1.default.createElement(Tabs_1.TabItem, { key: "jurassic", title: "Jurassic" }, "The Jurassic ranges from 200 million years to 145 million years ago."),
                react_1.default.createElement(Tabs_1.TabItem, { key: "cretaceous", title: "Cretaceous" }, "The Cretaceous is the longest period of the Mesozoic, spanning from 145 million to 66 million years ago."))));
    },
};
//# sourceMappingURL=Tabs.stories.js.map