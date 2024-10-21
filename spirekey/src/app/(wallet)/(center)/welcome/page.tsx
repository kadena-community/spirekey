'use client';

import logo from '@/assets/images/logo-dark.svg';
import { Footer } from '@/components/Footer/Footer';
import { Grid, GridItem, Heading, Link, Stack, Text } from '@kadena/kode-ui';
import { CardFixedContainer } from '@kadena/kode-ui/patterns';
import Image from 'next/image';
import { bodyTextContainer, title, wrapperClass } from './page.css';

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
            <Grid gap="xxxl">
              <GridItem>
                <Stack gap="md" flexDirection="column" height="100%">
                  <Heading className={title} variant="h5">
                    Developers
                  </Heading>
                  <Stack
                    gap="n2"
                    flexDirection="column"
                    className={bodyTextContainer}
                  >
                    <Text as="p">
                      The Chainweaver Lite demo wallet is intended for
                      demonstration purposes only.
                      <br />
                      Developers and users are <b>not</b> advised to store $KDA
                      on this demo wallet. Instead, existing wallets and dApps
                      should implement Kadena SpireKey SDK to enhance their user
                      experience.
                    </Text>
                    <Text as="p">
                      Kadena SpireKey provides a more secure and convenient way
                      to access account information, connect to applications,
                      and sign transactions.
                    </Text>
                    <Text as="p">
                      All you need is your personal device to scan, touch, and
                      go!
                    </Text>
                  </Stack>
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
