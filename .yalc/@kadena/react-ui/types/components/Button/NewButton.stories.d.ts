import type { Meta, StoryFn, StoryObj } from '@storybook/react';
import type { ILinkButtonProps } from './LinkButton';
import type { IButtonProps } from './NewButton';
declare const meta: Meta<IButtonProps>;
type ButtonStory = StoryObj<{
    text: string;
} & IButtonProps>;
type LinkButtonStory = StoryObj<{
    text: string;
} & ILinkButtonProps>;
export declare const _Button: ButtonStory;
export declare const AllVariants: StoryFn<IButtonProps>;
export declare const StartIcon: StoryFn<IButtonProps>;
export declare const EndIcon: StoryFn<IButtonProps>;
export declare const OnlyIcon: StoryFn<IButtonProps>;
export declare const _LinkButton: LinkButtonStory;
export default meta;
//# sourceMappingURL=NewButton.stories.d.ts.map