import type { Meta, StoryObj } from '@storybook/react';
import type { INavHeaderRootProps } from './NavHeader';
type StoryProps = {
    linksCount: number;
    navHeaderActiveLink?: string;
} & INavHeaderRootProps;
declare const meta: Meta<StoryProps>;
type IStory = StoryObj<StoryProps>;
export declare const Dynamic: IStory;
export default meta;
//# sourceMappingURL=NavHeader.stories.d.ts.map