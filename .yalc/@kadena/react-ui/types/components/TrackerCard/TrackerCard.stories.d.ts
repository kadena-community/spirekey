import type { Meta, StoryObj } from '@storybook/react';
import { ProductIcon } from '../Icon';
import type { ITrackerCardProps } from './TrackerCard';
declare const meta: Meta<{
    icon: keyof typeof ProductIcon;
} & ITrackerCardProps>;
export default meta;
type Story = StoryObj<{
    icon: keyof typeof ProductIcon;
} & ITrackerCardProps>;
export declare const Primary: Story;
//# sourceMappingURL=TrackerCard.stories.d.ts.map