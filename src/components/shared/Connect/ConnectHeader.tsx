import { Surface } from '@/components/Surface/Surface';
import { ButtonLink } from '@/components/shared/ButtonLink/ButtonLink';
import { useAccounts } from '@/context/AccountsContext';
import { Box, ContentHeader, Stack } from '@kadena/react-ui';
import './ConnectHeader.css';

type Props = {
  returnUrl: string;
  reason: string;
  networkId?: string;
};

export default function ConnectHeader({ returnUrl, reason, networkId }: Props) {
  const { accounts } = useAccounts();

  const filteredAccounts = accounts.filter(
    (account) => networkId === undefined || account.networkId === networkId,
  );

  const displayReason =
    reason && ` The reason provided by the dApp for this request is: ${reason}`;

  const description =
    filteredAccounts.length > 0
      ? `Which account do you want to use to identify on ${returnUrl}?${displayReason}`
      : `Create an account to identify yourself with on ${returnUrl}.${displayReason}`;

  return (
    <Box padding="lg" className={'connect-header'}>
      <Surface>
        <ContentHeader
          description={description}
          heading="Connect"
          icon="Account"
        />
        {filteredAccounts.length === 0 && typeof window !== 'undefined' && (
          <Stack
            flexDirection="row"
            justifyContent="center"
            gap="xl"
            marginBlock="xl"
            paddingBlockStart="xl"
            paddingInline="lg"
          >
            <ButtonLink variant="secondary" href={returnUrl}>
              Cancel
            </ButtonLink>
            <ButtonLink
              variant="primary"
              href={`/register?redirectUrl=${Buffer.from(window.location.href).toString('base64')}&networkId=${networkId}`}
            >
              Create
            </ButtonLink>
          </Stack>
        )}
      </Surface>
    </Box>
  );
}
