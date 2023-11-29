import type { Meta, StoryObj } from '@storybook/react';
import type { IGridProps } from './Grid';
import type { ResponsiveInputType } from './Grid.css';
type StoryType = {
    columnSpan: ResponsiveInputType;
} & IGridProps;
declare const meta: Meta<StoryType>;
export default meta;
type Story = StoryObj<StoryType>;
export declare const Primary: Story;
export declare const GridItemStory: Story;
//# sourceMappingURL=Grid.stories.d.ts.map