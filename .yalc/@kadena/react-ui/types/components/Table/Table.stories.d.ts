import type { ITableProps } from '../Table';
import type { Meta, StoryObj } from '@storybook/react';
import { vars } from '../../styles/vars.css';
type StoryProps = {
    rowCount: number;
    columnCount: number;
    striped: boolean;
    columnWidth: keyof typeof vars.sizes | undefined;
} & ITableProps;
declare const meta: Meta<StoryProps>;
export default meta;
type Story = StoryObj<StoryProps>;
export declare const Primary: Story;
export declare const LinkTable: Story;
export declare const StripedTable: Story;
export declare const EmptyRowsTable: Story;
export declare const FixedColumnWidth: Story;
//# sourceMappingURL=Table.stories.d.ts.map