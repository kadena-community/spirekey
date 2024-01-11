import type { IInputProps } from '../../Form';
import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
declare const meta: Meta<IInputProps>;
export default meta;
type Story = StoryObj<{
    leadingText: string;
    startIcon: React.ReactElement | '-';
    type: React.HTMLInputTypeAttribute;
} & Omit<IInputProps, 'startIcon'>>;
export declare const Dynamic: Story;
export declare const InlineWithButton: Story;
//# sourceMappingURL=Input.stories.d.ts.map