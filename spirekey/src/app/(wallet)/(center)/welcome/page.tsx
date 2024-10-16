'use client';

import logo from '@/assets/images/SpireKey-logo.svg';
import { Footer } from '@/components/Footer/Footer';
import { MonoLaunch } from '@kadena/kode-icons/system';
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
import { bodyTextContainer, dd, iconClass, li, title, ul, wrapperClass } from './page.css';

const textLinkStyle = {
  padding: 0,
};

export default function Home() {
  return (
    <Stack
      flexDirection="column"
      className={wrapperClass}
      justifyContent="center"
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
                  <Heading className={title} variant="h5">
                    Developers
                  </Heading>
                  <Stack gap='n2' flexDirection='column' className={bodyTextContainer}>
                    <Text as="p">
                      Kadena SpireKey leverages WebAuthn standards to deliver a
                      secure backend, enabling end users to generate and store
                      keypairs directly on their hardware devices.
                    </Text>
                    <Text as="p">
                      Start integrating SpireKey into your application with the SpireKey
                      SDK, or explore the technical documentation outlined in the
                      KIPs.
                    </Text>
                  </Stack>
                  <Heading className={title} variant="h6">
                    <Text color='emphasize'>Resources</Text>{' '}
                    <MonoLaunch
                      fontSize={14}
                      style={{ display: 'inline', verticalAlign: 'middle' }}
                      title="External Resource Links"
                      className={iconClass}
                    />
                  </Heading>
                  <ul className={ul}>
                    <li className={li}>
                      <TextLink
                        style={textLinkStyle}
                        href="https://www.npmjs.com/package/@kadena/spirekey-sdk"
                      >
                        SpireKey SDK
                      </TextLink>
                    </li>
                    <li className={li}>
                      <TextLink
                        style={textLinkStyle}
                        href="https://github.com/kadena-io/KIPs/pull/52/files?short_path=2bff507#diff-2bff5073da0885a117721a440a64c8e1da4add449227f697827ab053efc5c824"
                      >
                        KIP-0023
                      </TextLink>
                    </li>
                    <li className={li}>
                      <TextLink
                        style={textLinkStyle}
                        href="https://github.com/kadena-io/KIPs/pull/59/files?short_path=fde4d08#diff-fde4d08845090220a9283cea68e55c61b4d408fe9b18226f619f0669819a7297"
                      >
                        KIP-0030
                      </TextLink>
                    </li>
                    <li className={li}>
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
                      Install SDK Package
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
                  <Heading className={title} variant="h5">
                    Users
                  </Heading>
                  <Stack gap='n2' flexDirection='column' className={bodyTextContainer}>
                    <Text as="p">
                      Kadena SpireKey provides a more secure and convenient way to
                      access account information, connect to applications, and
                      sign transactions.
                    </Text>
                    <Text as="p">
                      All you need is your personal device to
                      scan, touch, and go!
                    </Text>
                  </Stack>
                  <Heading className={title} variant="h6">
                    <Text color='emphasize'>Resources</Text>{' '}
                    <MonoLaunch
                      fontSize={14}
                      style={{ display: 'inline', verticalAlign: 'middle' }}
                      title="External Resource Links"
                      className={iconClass}
                    />
                  </Heading>
                  <ul className={ul}>
                    <li className={li}>
                      <dl>
                        <dt>
                          <TextLink
                            style={textLinkStyle}
                            href="https://www.kadena.io/spirekey"
                          >
                            SpireKey Info
                          </TextLink>
                        </dt>
                        <dd className={dd}>
                          <Text as="span" size='small'>
                            Experience SpireKey authentication showcased with
                            wallet functionality.
                          </Text>
                        </dd>
                      </dl>
                    </li>
                    <li className={li}>
                      <dl>
                        <dt>
                          <TextLink
                            style={textLinkStyle}
                            href="https://proof.kadena.io"
                          >
                            Proof of Attendance
                          </TextLink>
                        </dt>
                        <dd className={dd}>
                          <Text as="span" size='small'>
                            Mint your own NFT using SpireKey authentication.
                          </Text>
                        </dd>
                      </dl>
                    </li>
                    <li className={li}>
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