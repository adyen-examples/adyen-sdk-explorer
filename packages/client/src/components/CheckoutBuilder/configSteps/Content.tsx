import { Box, Divider, Grid, IconButton, Typography } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
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
        <Typography component={'span'} mt={2} mb={2} variant="h5">
          {title}
        </Typography>
      </Grid>
      <Grid item xs={12} mt={2}>
        <Typography variant="h6" gutterBottom>
          {description}
        </Typography>
      </Grid>
      <Grid item xs={12} mt={2} sx={{ fontWeight: 800 }}>
        <Typography component={'span'} variant="body2">
          {subtitle}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography component={'span'} variant="caption" sx={{ fontSize: '0.73rem' }}>
          {version}
        </Typography>
        <IconButton sx={{color:'black', fontSize: 'small'}}>
          <ContentCopyIcon />
        </IconButton>
      </Grid>
      <Grid item xs={12} mt={2}>
        <Typography variant="h4" gutterBottom>
          <Box>Parameters</Box>
        </Typography>
      </Grid>
      <Grid pb={2} item xs={12}>
        <Divider />
      </Grid>
    </Grid>
  );
};
