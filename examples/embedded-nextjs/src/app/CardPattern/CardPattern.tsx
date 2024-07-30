import { SpireKeyKdacolorLogoGreen } from '@kadena/kode-icons/product';
import { Box, Heading, Stack, Text } from '@kadena/kode-ui';
import { atoms, token } from '@kadena/kode-ui/styles';
import React from 'react';
import { bodyContent, container, paddingContainer } from './CardPattern.css';

export const CardContainer = ({ children }: { children: React.ReactNode }) => {
  // TODO: replace with card component when it accepts className
  return (
    <div className={paddingContainer}>
      <div className={container}>{children}</div>
    </div>
  );
};

interface CardContentBlockProps {
  title: String;
  visual?: React.ReactNode;
  description?: React.ReactNode;
  children: React.ReactNode;
}

export const CardContentBlock = ({
  title,
  visual,
  description,
  children,
}: CardContentBlockProps) => {
  return (
    <Stack flexDirection={{ xs: 'column', md: 'row' }} gap="md">
      <Stack flexDirection="column" alignItems="flex-start" flex={1}>
        <Box>{visual}</Box>
        {title && (
          <Heading
            className={atoms({
              marginBlockStart: 'sm',
              marginBlockEnd: 'md',
            })}
          >
            {title}
          </Heading>
        )}
        {typeof description === 'string' && <Text as="p">{description}</Text>}
        {typeof description !== 'string' && <div>{description}</div>}
      </Stack>
      <Stack
        flexDirection="column"
        justifyContent="flex-start"
        className={bodyContent}
        data-layout={!visual && 'no-visual'}
      >
        {children}
      </Stack>
    </Stack>
  );
};

interface CardFooterProps {
  children: React.ReactNode;
  separated?: Boolean;
}

export const CardFooter = ({
  children,
  separated = false,
}: CardFooterProps) => {
  return (
    <Stack
      marginBlockStart="xxl"
      gap="md"
      justifyContent={separated ? 'space-between' : 'flex-end'}
    >
      {children}
    </Stack>
  );
};

export const SpireKeyCardContentBlock = (
  props: Omit<CardContentBlockProps, 'visual'>,
) => (
  <CardContentBlock
    {...props}
    visual={
      <SpireKeyKdacolorLogoGreen
        aria-label="SpireKey"
        fontSize={token('typography.fontSize.9xl')}
      />
    }
  />
);
