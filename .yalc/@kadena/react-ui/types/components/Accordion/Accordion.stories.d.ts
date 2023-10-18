import type { Meta, StoryObj } from '@storybook/react';
import type { IAccordionProps, IAccordionSectionProps } from './';
type StoryProps = {
    linked: boolean;
    customSections: IAccordionSectionProps[];
} & IAccordionProps;
declare const meta: Meta<StoryProps>;
type IStory = StoryObj<StoryProps>;
export declare const Dynamic: IStory;
export default meta;
//# sourceMappingURL=Accordion.stories.d.ts.map