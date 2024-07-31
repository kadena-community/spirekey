import { SpireKeyKdacolorLogoGreen } from '@kadena/kode-icons/product';
import { Box, Heading, IHeadingProps, Stack, Text } from '@kadena/kode-ui';
import { atoms, token } from '@kadena/kode-ui/styles';
import React from 'react';
import { bodyContent, container, newSectionStack, paddingContainer } from './CardPattern.css';

export const CardContainer = ({ children, hasPadding }: { children: React.ReactNode, hasPadding?: boolean }) => {
  // TODO: replace with card component when it accepts className
  return (
    <div className={hasPadding ? paddingContainer : ''}>
      <div className={container}>{children}</div>
    </div>
  );
};

interface CardContentBlockProps {
  title: string;
  visual?: React.ReactNode;
  description?: React.ReactNode;
  titleAs?: IHeadingProps['as'];
  isNewSection?: boolean;
  children: React.ReactNode;
}

export const CardContentBlock = ({
  title,
  visual,
  description,
  titleAs,
  isNewSection,
  children,
}: CardContentBlockProps) => {
  return (
    <Stack flexDirection={{ xs: 'column', md: 'row' }} gap="md" className={isNewSection ? newSectionStack : null}>
      <Stack flexDirection="column" alignItems="flex-start" flex={1}>
        <Box>{visual}</Box>
        {title && (
          <Heading
            as={titleAs ?? 'h3'}
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
