'use client';

import { Background } from '@/components/Background/Background';
import { PageTitle } from '@/components/Layout/PageTitle';
import { ButtonLink } from '@/components/shared/ButtonLink/ButtonLink';
import { Stack } from '@kadena/kode-ui';
import { useLocalStorage } from 'usehooks-ts';

export default function Settings() {
  const [devMode, setDevMode] = useLocalStorage('devMode', false);
  const onDevModeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setDevMode(true);
    } else {
      setDevMode(false);
    }
  };

  return (
    <>
      <Background />
      <Stack
        gap="md"
        flexDirection="column"
        alignItems="center"
        width="100%"
        style={{ height: '100svh' }}
      >
        <PageTitle>Settings</PageTitle>
        <Stack gap="sm">
          <input
            type="checkbox"
            id="devMode"
            onChange={onDevModeChange}
            checked={devMode}
          />
          <label htmlFor="devMode">Enable Developer Mode</label>
        </Stack>

        <ButtonLink href="/">Back</ButtonLink>
      </Stack>
    </>
  );
}
