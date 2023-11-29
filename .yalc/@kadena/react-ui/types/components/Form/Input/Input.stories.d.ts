import type { IInputProps } from '../../Form';
import { SystemIcon } from '../../Icon';
import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
declare const meta: Meta<IInputProps>;
export default meta;
type Story = StoryObj<{
    leadingText: string;
    icon: keyof typeof SystemIcon;
    type: React.HTMLInputTypeAttribute;
} & Omit<IInputProps, 'icon'>>;
export declare const Dynamic: Story;
export declare const InlineWithButton: Story;
//# sourceMappingURL=Input.stories.d.ts.map