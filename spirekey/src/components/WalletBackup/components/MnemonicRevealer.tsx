import { MonoCopyAll } from '@kadena/kode-icons/system';
import { Button, Stack, Text, TextField } from '@kadena/kode-ui';
import React, { FC } from 'react';

interface IProps {
  mnemonic: string;
}

export const MnemonicRevealer: FC<IProps> = ({ mnemonic }) => {
  if (!mnemonic) return null;
  const groupSize = 4;
  const wordGroups = mnemonic
    .split(' ')
    .reduce(
      (acc, word) => {
        const [lastGroup, ...rest] = acc;
        if (lastGroup.length === groupSize) return [[word], lastGroup, ...rest];
        return [[...lastGroup, word], ...rest];
      },
      [[]] as string[][],
    )
    .reverse()
    .map((words) => words.join(' '));
  return (
    <Stack gap="md" flexDirection="column">
      {wordGroups.map((wordsStr, groupIndex) => (
        <Stack gap="lg" alignItems="flex-end">
          {wordsStr.split(' ').map((word, wordIndex) => (
            <TextField
              startVisual={
                <Text variant="code">
                  {groupIndex * groupSize + wordIndex + 1}
                </Text>
              }
              isReadOnly
              key={word}
              type="password"
              value="****"
              label={`${groupIndex * groupSize + wordIndex + 1}`}
            />
          ))}

          <Button
            variant="transparent"
            onPress={() => navigator.clipboard.writeText(wordsStr)}
          >
            <MonoCopyAll />
          </Button>
        </Stack>
      ))}
    </Stack>
  );
};
