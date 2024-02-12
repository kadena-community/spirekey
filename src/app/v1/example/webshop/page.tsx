'use client';

import { AccountButton } from '@/components/AccountButton';
import { useReturnUrl } from '@/hooks/useReturnUrl';
import { decodeAccount } from '@/utils/decodeAccount';
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
} from '@kadena/react-ui';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';
import cookieImg from './chocolate-chip-cookie.jpg';
import { createOrder } from './order';

type WebshopProps = {
  searchParams: {
    response: string;
  };
};

export default function Webshop({ searchParams }: WebshopProps) {
  const { response } = searchParams;
  const account = decodeAccount(response);
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

  const onOrder = useCallback(
    ({ price }: { price: number }) =>
      async () => {
        if (!account) return;
        const order = await createOrder({
          accountName: account.accountName,
          price,
          signerPubKey: account.publicKey,
        });

        router.push(
          `${process.env.WALLET_URL}/sign?payload=${Buffer.from(
            JSON.stringify(order),
          ).toString('base64')}&cid=${account.cid}&returnUrl=${getReturnUrl(
            '/v1/example/webshop/submit',
          )}`,
        );
      },
    [response],
  );

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
          icon="Cookie"
        />
      </Box>

      <Box>
        <AccountButton account={account} returnPath="/v1/example/webshop" />
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
                  style={{
                    width: '100%',
                    height: 'auto',
                    borderRadius: '1rem',
                  }}
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
                    <Text as="code" bold variant="base" color="emphasize">
                      {price.toFixed(2)} KDA
                    </Text>
                    <Button
                      color="primary"
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
