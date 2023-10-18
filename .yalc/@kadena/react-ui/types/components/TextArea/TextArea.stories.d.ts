import type { SystemIcon } from '../Icon';
import type { ITextareaProps } from '../TextArea';
import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
declare const meta: Meta<ITextareaProps>;
export default meta;
type Story = StoryObj<{
    leadingText: string;
    rightIcon: keyof typeof SystemIcon;
    type: React.HTMLInputTypeAttribute;
} & ITextareaProps>;
export declare const TextAreaStory: Story;
//# sourceMappingURL=TextArea.stories.d.ts.map