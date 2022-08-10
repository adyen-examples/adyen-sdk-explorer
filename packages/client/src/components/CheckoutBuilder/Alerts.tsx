import * as React from 'react';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

export const Alerts = ({ severityType, message }: { severityType: 'error' | 'warning' | 'info' | 'success'; message: string }) => {
  return (
    <Stack sx={{ width: '100%' }} spacing={2}>
      <Alert severity={severityType}>{message}</Alert>
    </Stack>
  );
};
