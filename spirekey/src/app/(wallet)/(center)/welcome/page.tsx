'use client';

import logo from '@/assets/images/SpireKey-logo.svg';
import { Footer } from '@/components/Footer/Footer';
import {
  Grid,
  GridItem,
  Heading,
  Link,
  Stack,
  Text,
  TextLink,
} from '@kadena/kode-ui';
import { CardFixedContainer } from '@kadena/kode-ui/patterns';
import Image from 'next/image';

const textLinkStyle = {
  padding: 0,
};

export default function Home() {
  return (
    <Stack
      flexDirection="column"
      justifyContent="center"
      style={{ height: '100' }}
      flex={1}
    >
      <CardFixedContainer>
        <Stack flexDirection="column" gap="md" marginBlock="xl">
          <Image src={logo} alt="SpireKey logo" style={{ maxHeight: '80px' }} />

          <Stack
            flexDirection="column"
            justifyContent="center"
            gap="xl"
            marginBlockStart="xl"
          >
            <Grid columns={{ xs: 1, md: 2 }} gap="xxxl">
              <GridItem>
                <Stack gap="md" flexDirection="column" height="100%">
                  <Heading variant="h5">Developers</Heading>
                  <Text as="p">
                    Kadena SpireKey leverages web authentication standards to
                    provide a secure backend that enables end users to securely
                    generate and store key pairs directly on their hardware
                    devices. Get started with the SpireKey SDK to integrate
                    SpireKey into your application or read the technical
                    documention described in the KIP's.
                  </Text>
                  <Heading variant="h6">External Resources</Heading>
                  <ul>
                    <li>
                      <TextLink
                        style={textLinkStyle}
                        href="https://www.npmjs.com/package/@kadena/spirekey-sdk"
                      >
                        SpireKey SDK
                      </TextLink>
                    </li>
                    <li>
                      <TextLink
                        style={textLinkStyle}
                        href="https://github.com/kadena-io/KIPs/pull/52/files?short_path=2bff507#diff-2bff5073da0885a117721a440a64c8e1da4add449227f697827ab053efc5c824"
                      >
                        KIP-0023
                      </TextLink>
                    </li>
                    <li>
                      <TextLink
                        style={textLinkStyle}
                        href="https://github.com/kadena-io/KIPs/pull/59/files?short_path=fde4d08#diff-fde4d08845090220a9283cea68e55c61b4d408fe9b18226f619f0669819a7297"
                      >
                        KIP-0030
                      </TextLink>
                    </li>
                    <li>
                      <TextLink
                        style={textLinkStyle}
                        href="https://discord.gg/kadena"
                      >
                        Discord
                      </TextLink>
                    </li>
                  </ul>
                  <Stack
                    alignItems="flex-start"
                    justifyContent="flex-end"
                    flexDirection="column"
                    flexGrow={1}
                    marginBlockStart="lg"
                  >
                    <Link
                      href="https://www.npmjs.com/package/@kadena/spirekey-sdk"
                      variant="outlined"
                    >
                      Get started
                    </Link>
                  </Stack>
                </Stack>
              </GridItem>
              <GridItem>
                <Stack
                  gap="md"
                  flexDirection="column"
                  height="100%"
                  marginBlockStart={{ xs: 'md', md: 'n0' }}
                >
                  <Heading variant="h5">Users</Heading>
                  <Text as="p">
                    Kadena SpireKey leverages web authentication standards to
                    provide a secure backend that enables end users to securely
                    generate and store key pairs directly on their hardware
                    devices.
                  </Text>
                  <Heading variant="h6">External Resources</Heading>
                  <ul>
                    <li>
                      <TextLink
                        style={textLinkStyle}
                        href="https://www.kadena.io/spirekey"
                      >
                        SpireKey Info
                      </TextLink>
                    </li>
                    <li>
                      <TextLink
                        style={textLinkStyle}
                        href="https://discord.gg/kadena"
                      >
                        Discord
                      </TextLink>
                    </li>
                  </ul>
                  <Stack
                    alignItems="flex-start"
                    justifyContent="flex-end"
                    flexDirection="column"
                    flexGrow={1}
                    marginBlockStart="lg"
                  >
                    <Link href="/register" variant="primary">
                      Register
                    </Link>
                  </Stack>
                </Stack>
              </GridItem>
            </Grid>
          </Stack>
        </Stack>
      </CardFixedContainer>
      <Footer />
    </Stack>
  );
}
