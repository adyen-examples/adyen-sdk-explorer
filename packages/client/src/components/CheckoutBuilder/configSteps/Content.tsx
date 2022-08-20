import { Box, Divider, Grid, Typography } from '@mui/material';
import React from 'react';

interface ContentProps {
  title: string;
  version: string;
  description: string;
}

export const Content = ({ title, version, description }: ContentProps) => {
  return (
    <Grid spacing={1} mt={1} container>
      <Grid item xs={12}>
        <Typography
          component={'span'}
          p={0.7}
          sx={{ bgcolor: '#e6f8ed', borderColor: '#cef2dd', color: '#055f29', borderRadius: '5px' }}
          variant="h6"
        >
          SDK Explorer
        </Typography>
        <Typography component={'span'} p={0.7} variant="h5">
          {title}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography component={'span'} p={0.7} variant="caption">
          {version}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography mt={2} mb={3} variant="body2" gutterBottom>
          {description}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h3" gutterBottom>
          <Box>parameters</Box>
        </Typography>
      </Grid>
      <Grid pb={2} item xs={12}>
        <Divider />
      </Grid>
    </Grid>
  );
};
