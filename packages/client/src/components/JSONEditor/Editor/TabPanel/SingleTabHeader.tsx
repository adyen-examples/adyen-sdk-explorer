import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { Grid, IconButton, Typography } from '@mui/material';

interface SingleTabHeaderProps {
  title: string;
  clipboardText: string;
}

export const SingleTabHeader = ({ title, clipboardText }: SingleTabHeaderProps) => {
  return (
    <Grid
      justifyContent="space-between"
      alignItems="flex-start"
      px={5}
      pt={'12px'}
      pb={'11px'}
      sx={{ backgroundColor: 'secondary.light', borderBottom: 1, borderColor: 'rgba(0, 0, 0, 0.12)' }}
      container
    >
      <Grid item xs={1}>
        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
          {title}
        </Typography>
      </Grid>
      <Grid item xs={1}>
        <IconButton
          sx={{ py: 0 }}
          onClick={() => {
            navigator.clipboard.writeText(clipboardText);
          }}
        >
          <ContentCopyIcon sx={{ fontSize: '17px', fontWeight: 'bold' }} />
        </IconButton>
      </Grid>
    </Grid>
  );
};
