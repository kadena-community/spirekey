import { Box, Heading, Stack, Text } from '@kadena/kode-ui';
import { atoms } from '@kadena/kode-ui/styles';
import React from 'react';
import { bodyContent, container } from './CardPattern.css';

export const CardContainer = ({ children }: { children: React.ReactNode }) => {
  // TODO: replace with card component when it accepts className
  return <div className={container}>{children}</div>;
};

interface CardContentProps {
  logo: React.ReactNode;
  title: String;
  description?: String;
  children: React.ReactNode;
}

export const CardContent = ({
  logo,
  title,
  description,
  children,
}: CardContentProps) => {
  return (
    <div>
      <Stack flexDirection={{ xs: 'column', md: 'row' }} gap="md">
        <Stack flexDirection="column" alignItems="flex-start" flex={1}>
          <Box>{logo}</Box>
          <Heading
            className={atoms({ marginBlockStart: 'sm', marginBlockEnd: 'md' })}
          >
            {title}
          </Heading>
          {description && <Text>{description}</Text>}
        </Stack>
        <Stack flexDirection="column" className={bodyContent}>
          {children}
        </Stack>
      </Stack>
    </div>
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
