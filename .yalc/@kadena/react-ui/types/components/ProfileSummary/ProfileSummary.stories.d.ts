import type { IProfileSummaryRootProps } from '../ProfileSummary';
import type { Meta, StoryObj } from '@storybook/react';
type StoryComponentType = IProfileSummaryRootProps & {
    links: Record<string, string>;
};
declare const meta: Meta<StoryComponentType>;
export default meta;
type Story = StoryObj<StoryComponentType>;
export declare const Primary: Story;
//# sourceMappingURL=ProfileSummary.stories.d.ts.map