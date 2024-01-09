import { AccountsOverview } from '@/components/AccountsOverview';
import { AddWallet } from '@/components/AddWallet';
import { Restore } from '@/components/RestoreWallet';

export default function AccountsPage() {
  return (
    <div>
      <h1>Accounts</h1>
      <AccountsOverview />
      <AddWallet />
      <Restore />
    </div>
  );
}
