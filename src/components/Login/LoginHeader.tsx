import { useAccounts } from '@/context/AccountsContext';
import { Box, ContentHeader, Stack } from '@kadena/react-ui';
import { ButtonLink } from '../ButtonLink/ButtonLink';
import { Surface } from '../Surface/Surface';

type Props = {
  returnUrl: string;
  reason: string;
};

export default function LoginHeader({ returnUrl, reason }: Props) {
  const { accounts } = useAccounts();

  const displayReason =
    reason && ` The reason provided by the dApp for this request is: ${reason}`;

  const description =
    accounts.length > 0
      ? `Which account do you want to use to identify on ${returnUrl}?${displayReason}`
      : `Create an account to identify yourself with on ${returnUrl}.${displayReason}`;

  return (
    <Box padding="lg">
      <Surface>
        <ContentHeader
          description={description}
          heading="Login"
          icon="Account"
        />
        {accounts.length === 0 && typeof window !== 'undefined' && (
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
              href={`/register?redirectUrl=${Buffer.from(window.location.href).toString('base64')}`}
            >
              Create
            </ButtonLink>
          </Stack>
        )}
      </Surface>
    </Box>
  );
}
