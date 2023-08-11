import { Box, Typography, Grid, Link, BoxProps } from '@mui/material';
import { useSelector } from 'react-redux';
import { ComponentBase } from '../../../ComponentBuilder';
import { AdyenAlert } from '../Options/OptionTypes';

export const ReviewContent = (props: BoxProps) => {
  const { txVariant } = useSelector((state: any) => state.onDeck);
  const { ...other } = props;
  const reviewContentStyle = {
    '.content-link-style': { bgcolor: 'secondary.light', px: 0.6, py: 0.5, borderRadius: 1, color: 'primary.main' },
    '#review-content': { a: { color: 'primary.main', textDecoration: 'none' } },
    '#review-component-base': {
      backgroundColor: 'secondary.light',
      boxShadow: '0 8px 8px rgba(0,17,44,.04), 0 2px 4px rgba(0,17,44,.08)',
      position: 'sticky',
      top: 0,
      zIndex: 1
    }
  };

  return (
    <Box {...other} sx={reviewContentStyle}>
      <Grid id="review-content" mt={2} container px={7}>
        <Grid item xs={12}>
          <Typography component={'span'} mt={2} mb={2} variant="h3">
            Step 4: Test and go live
          </Typography>
        </Grid>
        <Grid item xs={12} mt={2}>
          <Typography variant="h6">
            Before going live, use our list of{' '}
            <Link className="content-link-style" href="https://docs.adyen.com/development-resources/testing/test-card-numbers">
              test cards and other payment methods
            </Link>
            to test your integration. We recommend testing each payment method that you intend to offer to your shoppers.
            <br />
            <br />
            You can check the status of a test payment in your
            <Link href="https://ca-test.adyen.com/" className="content-link-style">
              Customer Area,
            </Link>
            under{' '}
            <Box component="span" sx={{ fontWeight: 'bold' }}>
              Transactions &gt; Payments.
            </Box>{' '}
            To debug or troubleshoot test payments, you can also use API logs.
          </Typography>
        </Grid>
        <Grid item xs={12} mt={2}>
          <Typography component={'span'} variant="h5">
            Custom styling
          </Typography>
        </Grid>
        <Grid item xs={12} mt={2}>
          <Typography variant="h6">
            The {txVariant} UI can be styled to match your website and brand. The styling of fonts, colors, layouts, and buttons can be customized
            using CSS.
          </Typography>
        </Grid>
        <Grid item xs={12} mt={2}>
          <AdyenAlert
            styleType="warning"
            content="Some payment methods have their own unique CSS classes that aren't shown under the CSS tab. For a full list of classes that you can style, inspect this page using your browser's developer tools."
          />
        </Grid>
      </Grid>
      <Grid id="review-component-base" item direction="row" justifyContent="space-between" container px={7} py={1.2} mt={2} xs={12}>
        <Grid item>
          <Typography variant="h6" sx={{ fontWeight: 'bold', fontSize: '1rem', color: 'secondary.main' }}>
            Review & Export
          </Typography>
        </Grid>
      </Grid>
      <Box>
        <ComponentBase />
      </Box>
    </Box>
  );
};
