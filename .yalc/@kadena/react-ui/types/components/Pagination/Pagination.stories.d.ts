import type { SystemIcon } from '../Icon';
import type { IPaginationProps } from '../Pagination';
import type { Meta, StoryObj } from '@storybook/react';
declare const meta: Meta<{
    helperText: string;
    leadingText: string;
    leftIcon: keyof typeof SystemIcon;
    rightIcon: keyof typeof SystemIcon;
} & IPaginationProps>;
export default meta;
type Story = StoryObj<IPaginationProps>;
export declare const Controlled: Story;
export declare const Uncontrolled: Story;
//# sourceMappingURL=Pagination.stories.d.ts.map