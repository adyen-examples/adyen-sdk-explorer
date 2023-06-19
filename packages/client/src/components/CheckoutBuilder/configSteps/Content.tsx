import { Box, Grid, IconButton, Typography } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { marked } from 'marked';

interface ContentProps {
  title: string;
  version: string;
  description: string;
  subtitle?: string;
}

export const Content = ({ title, subtitle, version, description }: ContentProps) => {
  const createMarkup = (description: any) => {
    return { __html: description };
  };
  return (
    <Box>
      <Grid mt={2} container px={7} sx={{ a: { color: '#06f', textDecoration: 'none' } }}>
        <Grid item xs={12}>
          <Typography component={'span'} mt={2} mb={2} variant="h3">
            {title}
          </Typography>
        </Grid>
        <Grid item xs={12} mt={2}>
          <Typography variant="h6" dangerouslySetInnerHTML={createMarkup(marked.parse(description))} gutterBottom></Typography>
        </Grid>
        <Grid item xs={12} mt={2}>
          <Typography component={'span'} variant="subtitle2" sx={{ fontWeight: 'bold', fontSize: '.85rem' }}>
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
