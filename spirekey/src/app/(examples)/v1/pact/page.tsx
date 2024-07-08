'use client';

import { MonoKey } from '@kadena/kode-icons/system';
import { Box, ContentHeader, Heading, Stack } from '@kadena/kode-ui';
import { useState } from 'react';

import { PreviewForm, PreviewFormValues } from './PreviewForm';
import { SubmitForm } from './SubmitForm';

type PactProps = {
  searchParams: {
    response: string;
  };
};
export default function Pact({ searchParams }: PactProps) {
  const [cancelled, setCancelled] = useState<boolean>(false);
  const [previewData, setPreviewData] = useState<PreviewFormValues | null>(
    null,
  );

  const onSubmitPreview = (values: PreviewFormValues) => {
    setPreviewData(values);
    setCancelled(false);
  };

  return (
    <main>
      <Stack flexDirection="column" gap="md" margin="md">
        <Heading as="h3">Execute pact</Heading>
        <Stack flexDirection="row" margin="md" justifyContent="space-between">
          <Box margin="md">
            <ContentHeader
              heading="Execute pact"
              icon={<MonoKey />}
              description="Upload a pact module or run pact code on the chain."
            />
          </Box>
        </Stack>
        {previewData && !cancelled ? (
          <SubmitForm
            values={previewData}
            onCancel={() => setCancelled(true)}
          />
        ) : (
          <PreviewForm
            searchParams={searchParams}
            onSubmit={onSubmitPreview}
            defaults={previewData}
          />
        )}
      </Stack>
    </main>
  );
}
