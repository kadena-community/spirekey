import type { ISelectFieldProps } from '../../Form';
import { SystemIcon } from '../../Icon';
import type { Meta, StoryObj } from '@storybook/react';
type StoryProps = {
    icon: keyof typeof SystemIcon;
} & ISelectFieldProps;
declare const meta: Meta<StoryProps>;
type Story = StoryObj<StoryProps>;
export declare const Group: Story;
export default meta;
//# sourceMappingURL=SelectField.stories.d.ts.map