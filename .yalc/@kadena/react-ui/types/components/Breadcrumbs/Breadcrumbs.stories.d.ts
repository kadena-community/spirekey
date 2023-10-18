import type { IBreadcrumbsProps } from '../Breadcrumbs';
import { ProductIcon } from '../Icon';
import type { Meta, StoryObj } from '@storybook/react';
declare const meta: Meta<{
    itemsCount: number;
    icon: keyof typeof ProductIcon;
} & IBreadcrumbsProps>;
export default meta;
type Story = StoryObj<{
    itemsCount: number;
} & IBreadcrumbsProps>;
export declare const Primary: Story;
//# sourceMappingURL=Breadcrumbs.stories.d.ts.map