import { Box, Divider, Grid, Typography } from '@mui/material';
import React from 'react';

interface ContentProps {
  title: string;
  version: string;
  description: string;
  subtitle?: string;
}

export const Content = ({ title, subtitle, version, description }: ContentProps) => {
  return (
    <Grid mt={1} container>
      <Grid item xs={12}>
        <Typography
          component={'span'}
          p={0.7}
          sx={{ bgcolor: '#e6f8ed', borderColor: '#cef2dd', color: '#055f29', borderRadius: '5px' }}
          variant="caption"
        >
          SDK
        </Typography>
        <Typography component={'span'} mt={2} mb={3} variant="h5">
          {title}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography component={'span'} variant="caption">
          {version}
        </Typography>
      </Grid>
      <Grid item xs={12} mt={3} mb={3}>
        <Typography component={'span'} variant="h3">
          {subtitle}
        </Typography>
      </Grid>
      <Grid item xs={12} mb={3}>
        <Typography variant="body2" gutterBottom>
          {description}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h3" gutterBottom>
          <Box>Parameters</Box>
        </Typography>
      </Grid>
      <Grid pb={2} item xs={12}>
        <Divider />
      </Grid>
    </Grid>
  );
};
