import * as React from 'react';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

export interface AlertProps {
  severityType: 'error' | 'warning' | 'info' | 'success';
  message: string;
  [key: string]: any;
}

export const Alerts = (props: AlertProps) => {
  const { severityType, message, ...other } = props;
  return (
    <Stack {...other}>
      <Alert severity={severityType}>{message}</Alert>
    </Stack>
  );
};
