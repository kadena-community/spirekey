"use client";

import { useReturnUrl } from "@/hooks/useReturnUrl";
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
} from "@kadena/react-ui";
import { useTheme } from "next-themes";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback, useEffect } from "react";
import cookieImg from "./chocolate-chip-cookie.jpg";
import { createOrder } from "./order";
import { Account } from "../(shared)/Account";
import { decodeAccount } from "../(shared)/decodeAccount";

type WebshopProps = {
  searchParams: {
    response: string;
  };
};

export default function Webshop({ searchParams }: WebshopProps) {
  const { response } = searchParams;
  const account = decodeAccount(response);
  const cookies = [
    {
      price: 6.55,
      name: "Tripple Chocolate chip",
      description: "More chocolate!",
      image: cookieImg,
    },
    {
      price: 5.55,
      name: "Chocolate chip",
      description: "Cookies and chocolate!",
      image: cookieImg,
    },
  ];
  const router = useRouter();
  const { getReturnUrl } = useReturnUrl();
  const onOrder = useCallback(
    ({ price }: { price: number }) =>
      async () => {
        if (!account) return;
        const order = await createOrder({
          caccount: account.caccount,
          waccount: account.waccount,
          price,
          signerPubKey: account.publicKey,
        });
        router.push(
          `${process.env.WALLET_URL}/sign?payload=${Buffer.from(
            JSON.stringify(order)
          ).toString("base64")}&cid=${account.cid}&returnUrl=${getReturnUrl(
            "/example/webshop/submit"
          )}`
        );
      },
    [response]
  );

  const { setTheme } = useTheme();
  useEffect(() => {
    setTheme("light");
  }, []);

  return (
    <Stack direction="column" alignItems="center" paddingY="$lg" gap="$md">
      <Box>
        <ContentHeader
          description="We sell the best cookies in town!"
          heading="Cookie Shop"
          icon="Cookie"
        />
      </Box>

      <Box>
        <Account account={account} returnPath="/example/webshop" />
      </Box>
      {account && (
        <Grid columns={{ sm: 1, md: 2, lg: 2 }} gap="$lg" margin="$lg">
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
                    width: "100%",
                    height: "auto",
                    borderRadius: "1rem",
                  }}
                />
                <Box marginY="$5">
                  <Heading as="h3">{name}</Heading>
                  <Text>{description}</Text>
                  <Stack
                    direction="row"
                    gap="$md"
                    justifyContent="space-between"
                    alignItems="center"
                    marginTop="$4"
                  >
                    <Text
                      as="span"
                      bold
                      font="mono"
                      size="lg"
                      color="emphasize"
                    >
                      {price.toFixed(2)} KDA
                    </Text>
                    <Button
                      color="primary"
                      title="Shop now"
                      onClick={onOrder({ price })}
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
