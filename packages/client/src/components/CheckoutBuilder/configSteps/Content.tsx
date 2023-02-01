import { Box, Divider, Grid, IconButton, Typography } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

interface ContentProps {
  title: string;
  version: string;
  description: string;
  subtitle?: string;
}

export const Content = ({ title, subtitle, version, description }: ContentProps) => {
  return (
    <Box>
      <Grid mt={2} container px={7}>
        <Grid item xs={12}>
          <Typography component={'span'} mt={2} mb={2} variant="h3">
            {title}
          </Typography>
        </Grid>
        <Grid item xs={12} mt={2}>
          <Typography variant="h6" gutterBottom>
            {description}
          </Typography>
        </Grid>
        <Grid item xs={12} mt={2} sx={{ fontWeight: '500px' }}>
          <Typography component={'span'} variant="body2">
            {subtitle}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography component={'span'} variant="caption" sx={{ fontSize: '0.73rem' }}>
            {version}
          </Typography>
          <IconButton
            onClick={() => {
              navigator.clipboard.writeText(`${version}`);
            }}
          >
            <ContentCopyIcon sx={{ color: 'black', fontSize: 'small' }} />
          </IconButton>
        </Grid>
      </Grid>
    </Box>
  );
};
