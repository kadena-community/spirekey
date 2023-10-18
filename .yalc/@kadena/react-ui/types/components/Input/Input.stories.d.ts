import { SystemIcon } from '../Icon';
import type { IInputProps } from '../Input';
import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
declare const meta: Meta<IInputProps>;
export default meta;
type Story = StoryObj<{
    leadingText: string;
    leftIcon: keyof typeof SystemIcon;
    rightIcon: keyof typeof SystemIcon;
    type: React.HTMLInputTypeAttribute;
} & Omit<IInputProps, 'leftIcon' | 'rightIcon'>>;
export declare const Dynamic: Story;
export declare const InlineWithButton: Story;
//# sourceMappingURL=Input.stories.d.ts.map