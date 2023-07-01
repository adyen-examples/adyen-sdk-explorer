import { Box, Typography, Grid, Link } from '@mui/material';
import { useSelector } from 'react-redux';
import { ComponentBase } from '../../../ComponentBuilder';

export const ReviewContent = () => {
  const { txVariant } = useSelector((state: any) => state.onDeck);
  return (
    <Box>
      <Grid mt={2} container px={7} sx={{ a: { color: '#06f', textDecoration: 'none' } }}>
        <Grid item xs={12}>
          <Typography component={'span'} mt={2} mb={2} variant="h3">
            Step 4: Test and go live
          </Typography>
        </Grid>
        <Grid item xs={12} mt={1}>
          <Typography variant="h6">
            Before going live, use our list of test cards and other payment methods to test your integration. We recommend testing each payment method
            that you intend to offer to your shoppers.
            <br />
            <br />
            You can check the status of a test payment in your Customer Area, under <Box sx={{ fontWeight: 'bold' }}>Transactions &gt; Payments.</Box>
            <br />
            To debug or troubleshoot test payments, you can also use API logs in your test environment.
          </Typography>
        </Grid>
        <Grid item xs={12} mt={2}>
          <Typography component={'span'} variant="h6" sx={{ fontWeight: 'bold', fontSize: '1rem' }}>
            Custom styling
          </Typography>
        </Grid>
        <Grid item xs={12} mt={2}>
          <Typography variant="h6">
            The {txVariant} UI can be styled to match your website and brand. The styling of fonts, colors, layouts, and buttons can be customized
            using CSS.
          </Typography>
        </Grid>
      </Grid>
      <Grid
        item
        direction="row"
        justifyContent="space-between"
        container
        px={7}
        py={1.2}
        mt={2}
        xs={12}
        sx={{
          backgroundColor: 'secondary.light',
          boxShadow: '0 8px 8px rgba(0,17,44,.04), 0 2px 4px rgba(0,17,44,.08)',
          position: 'sticky',
          top: 0,
          zIndex: 1
        }}
      >
        <Grid item>
          <Typography variant="h5">Review & Export</Typography>
        </Grid>
      </Grid>
      <Box>
        <ComponentBase />
      </Box>
    </Box>
  );
};
