import {
  Box,
  Button,
  Card,
  ContentHeader,
  Grid,
  Heading,
  Stack,
  Text,
} from "@kadena/react-ui";
import Image from "next/image";
import cookieImg from "./chocolate-chip-cookie.jpg";

type WebshopProps = {
  searchParams: {
    response: string;
  };
};

type Account = {
  name: string;
  account: string;
  publicKey: string;
  cid: string;
};

const decodeAccount = (response: string) => {
  if (!response) return null;
  const account: Account = JSON.parse(
    Buffer.from(response, "base64").toString()
  );
  return account;
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
  return (
    <Stack direction="column" alignItems="center" paddingY="$lg">
      <Stack direction="row" gap="$lg">
        <Box>
          <ContentHeader
            description={`We sell the best cookies in town!`}
            heading="Cookie Shop"
            icon="Cookie"
          />
        </Box>
        <Box>
          <Account account={account} />
        </Box>
      </Stack>
      <Grid.Root columns={{ sm: 1, md: 2, lg: 4 }} gap="$lg" margin="$lg">
        {cookies.map(({ description, name, image, price }) => (
          <Grid.Item key={name}>
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
                  <Text as="span" bold font="mono" size="lg" color="emphasize">
                    {price.toFixed(2)} KDA
                  </Text>
                  <Button
                    as="a"
                    color="primary"
                    href="http://localhost:1337/sign?returnUrl=http://webshop.local:1337/example/webshop"
                    title="Shop now"
                  >
                    Buy now
                  </Button>
                </Stack>
              </Box>
            </Card>
          </Grid.Item>
        ))}
      </Grid.Root>
    </Stack>
  );
}

const Account = ({ account }: { account: Account | null }) => {
  if (!account)
    return (
      <Button
        as="a"
        href="http://localhost:1337/login?returnUrl=http://webshop.local:1337/example/webshop"
        icon="Account"
      >
        Login
      </Button>
    );
  return <Text bold>Account: {account.name}</Text>;
};
