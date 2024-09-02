'use client';

import { AccountButton } from '@/app/(examples)/v1/example/delivery/components/AccountButton';
import { useReturnUrl } from '@/hooks/shared/useReturnUrl';
import { MonoCookie } from '@kadena/kode-icons/system';
import {
  Box,
  Button,
  Card,
  ContentHeader,
  Grid,
  GridItem,
  Heading,
  Stack,
  Text,
} from '@kadena/kode-ui';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import cookieImg from './chocolate-chip-cookie.jpg';
import { createOrder } from './order';
import * as styles from './page.css';

type WebshopProps = {
  searchParams: {
    user: string;
  };
};

export default function Webshop({ searchParams }: WebshopProps) {
  const { user } = searchParams;
  const account = decodeAccount(user);
  const router = useRouter();
  const { getReturnUrl } = useReturnUrl();

  const cookies = [
    {
      price: 6.55,
      name: 'Tripple Chocolate chip',
      description: 'More chocolate!',
      image: cookieImg,
    },
    {
      price: 5.55,
      name: 'Chocolate chip',
      description: 'Cookies and chocolate!',
      image: cookieImg,
    },
  ];

  const onOrder =
    ({ price }: { price: number }) =>
    async () => {
      if (!account) return;
      const order = await createOrder({
        accountName: account.accountName,
        price,
        signerPubKey: account.credentials[0].publicKey,
      });

      router.push(
        `${process.env.WALLET_URL}/sign?transaction=${Buffer.from(
          JSON.stringify(order),
        ).toString('base64')}&returnUrl=${getReturnUrl(
          '/v1/example/webshop/submit',
        )}`,
      );
    };

  return (
    <Stack
      flexDirection="column"
      alignItems="center"
      paddingBlock="lg"
      gap="md"
    >
      <Box>
        <ContentHeader
          description="We sell the best cookies in town!"
          heading="Cookie Shop"
          icon={<MonoCookie />}
        />
      </Box>

      <Box>
        <AccountButton user={account} returnPath="/v1/example/webshop" />
      </Box>
      {account && (
        <Grid columns={{ sm: 1, md: 2, lg: 2 }} gap="lg" margin="lg">
          {cookies.map(({ description, name, image, price }) => (
            <GridItem key={name}>
              <Card fullWidth>
                <Image
                  src={image}
                  priority
                  alt="Chocolate chip cookie"
                  width={200}
                  height={200}
                  sizes="100vw"
                  className={styles.cookieImage}
                />
                <Box marginBlock="md">
                  <Heading as="h3">{name}</Heading>
                  <Text>{description}</Text>
                  <Stack
                    flexDirection="row"
                    gap="md"
                    justifyContent="space-between"
                    alignItems="center"
                    marginBlockStart="md"
                  >
                    <Text as="code" bold variant="code" color="emphasize">
                      {price.toFixed(2)} KDA
                    </Text>
                    <Button
                      variant="primary"
                      title="Shop now"
                      onPress={onOrder({ price })}
                    >
                      Buy now
                    </Button>
                  </Stack>
                </Box>
              </Card>
            </GridItem>
          ))}
        </Grid>
      )}
    </Stack>
  );
}
