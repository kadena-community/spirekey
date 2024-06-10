import { MonoSupervisorAccount } from '@kadena/react-icons';
import { Box, Heading } from '@kadena/react-ui';
import { accountAlias, accountIcon, accountIconInner } from './Card.css';

type CardProps = {
  title?: string;
};

export default function Alias({ title = '' }: CardProps) {
  if (!title) return null;
  return (
    <>
      <Heading as="h3" variant="h4" className={accountAlias}>
        {title}
      </Heading>
      <Box className={accountIcon}>
        <MonoSupervisorAccount className={accountIconInner} />
      </Box>
    </>
  );
}
