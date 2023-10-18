import type { Meta, StoryObj } from '@storybook/react';
import type { INavAccordionProps, INavAccordionSectionProps } from './';
type StoryProps = {
    customSections: INavAccordionSectionProps[];
    darkMode: boolean;
    linked: boolean;
} & INavAccordionProps;
declare const meta: Meta<StoryProps>;
type IStory = StoryObj<StoryProps>;
export declare const Dynamic: IStory;
export default meta;
//# sourceMappingURL=NavAccordion.stories.d.ts.map