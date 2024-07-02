'use client';

import { Box, Heading } from '@kadena/kode-ui';

export default function SidebarSign() {
  return (
    <Box
      style={{
        width: '100%',
        height: '100%',
        padding: '25px',
        background: 'rgba(19, 30, 43, 0.8)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        marginBottom: '48px',
      }}
    >
      <Heading>Notifications</Heading>
    </Box>
  );
}
