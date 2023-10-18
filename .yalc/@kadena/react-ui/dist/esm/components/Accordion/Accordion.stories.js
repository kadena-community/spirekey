import React from 'react';
import { Accordion } from './';
const generateSection = (i) => ({
    title: `Section title ${i}`,
    children: (React.createElement("p", null,
        "This is the content for section ",
        i,
        ".",
        React.createElement("br", null),
        "The type of this content is not restricted: any valid HTML content is allowed.")),
    onOpen: () => console.log(`open section ${i}`),
    onClose: () => console.log(`close section ${i}`),
});
const generateSections = (n) => Array.from({ length: n }, (d, i) => generateSection(i + 1));
const sampleCount = 3;
const sampleSections = generateSections(sampleCount);
const meta = {
    title: 'Layout/Accordion',
    parameters: {
        controls: {
            hideNoControlsWarning: true,
            sort: 'requiredFirst',
        },
        docs: {
            description: {
                component: 'The Accordion component allows the user to show and hide sections of content on a page.<br />These sections can be expanded and collapsed by clicking the section headers.<br /><br /><em>Note: this variant of the Accordion component is meant to be used to display content.<br />For Navigation purposes, please use the <strong>NavAccordion</strong> within the Navigation subgroup.</em>',
            },
        },
    },
    argTypes: {
        linked: {
            control: { type: 'boolean' },
            description: 'When linked, only one section can be open at a time. If a section is opened, the previously opened section will be closed.',
            table: {
                defaultValue: { summary: 'false' },
                type: { summary: 'boolean' },
            },
        },
    },
};
export const Dynamic = {
    name: 'Accordion',
    args: {
        linked: false,
    },
    render: ({ linked }) => {
        const sections = sampleSections;
        return (React.createElement(Accordion.Root, { linked: linked }, sections.map(({ title, children, onOpen, onClose }, index) => (React.createElement(Accordion.Section, { onOpen: onOpen, onClose: onClose, title: title, key: index }, children)))));
    },
};
export default meta;
//# sourceMappingURL=Accordion.stories.js.map