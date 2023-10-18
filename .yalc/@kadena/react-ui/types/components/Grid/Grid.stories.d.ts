import type { Meta, StoryObj } from '@storybook/react';
import type { ResponsiveInputType } from './Grid.css';
import type { IGridRootProps } from './GridRoot';
declare const meta: Meta<{
    columnSpan: ResponsiveInputType;
} & IGridRootProps>;
export default meta;
type Story = StoryObj<{
    columnSpan: ResponsiveInputType;
} & IGridRootProps>;
export declare const GridRoot: Story;
export declare const GridItem: Story;
//# sourceMappingURL=Grid.stories.d.ts.map