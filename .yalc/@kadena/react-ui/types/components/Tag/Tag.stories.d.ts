import type { ITagProps } from '../Tag';
import type { Meta, StoryObj } from '@storybook/react';
declare const meta: Meta<{
    hasClose: boolean;
    text: string;
} & ITagProps>;
export default meta;
type Story = StoryObj<{
    text: string;
    hasClose: boolean;
} & ITagProps>;
export declare const Primary: Story;
//# sourceMappingURL=Tag.stories.d.ts.map