import { Box, Link, Typography } from '@mui/material';
import { ReactComponent as AdyenPageNotFound } from '../../assets/adyen-page-not-found.svg';
import { CLIENT_URL } from '../../config';
export const NotFound = () => {
  return (
    <Box sx={{ textAlign: 'center', mt: 15 }}>
      <AdyenPageNotFound />
      <Typography variant="h3" mt={3} sx={{ fontSize: '1.5rem' }}>
        What you seek is somewhere else
      </Typography>
      <Typography variant="h5" mt={2} sx={{ fontWeight: 'lighter' }}>
        We lost sight of that page! It may have been
        <br /> deleted, moved, or merely an illusion.
      </Typography>
      <Box mt={2}>
        <Typography variant="caption">
          <Link href={CLIENT_URL} underline="none">
            Back to Home
          </Link>
        </Typography>
      </Box>
    </Box>
  );
};
