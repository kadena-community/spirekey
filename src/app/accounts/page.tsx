import { AccountsOverview } from '@/components/AccountsOverview';
import { Restore } from '@/components/RestoreWallet';

export default function AccountsPage() {
  return (
    <div>
      <h1>Accounts</h1>
      <AccountsOverview />
      <Restore />
    </div>
  );
}
