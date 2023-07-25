import { Box, Grid, Link, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { useScrollToTop } from '../../../../hooks';

export const ComponentContent = () => {
  const { txVariant } = useSelector((state: any) => state.onDeck);
  const contentContainerStyle = {
    px: 7,
    mt: 2,
    a: { color: 'primary.main', textDecoration: 'none' },
    '.content-link-style': { bgcolor: 'secondary.light', px: 0.6, py: 0.5, borderRadius: 1, color: 'primary.main' },
    '.sample-container': { mt: 3, border: 1, borderRadius: 1, borderColor: 'primary.border' },
    '.sample-title': { borderBottom: 1, p: 2, borderColor: 'primary.border' },
    '.sample-code': {
      maxHeight: '25vh',
      overflow: 'scroll',
      fontSize: '0.8rem',
      lineHeight: 1.7,
      px: 3,
      py: 1,
      bgcolor: 'secondary.light',
      color: 'background.grey',
      borderRadius: 1
    }
  };
  useScrollToTop('#main-content');
  return (
    <Box>
      <Grid container sx={contentContainerStyle}>
        <Grid item xs={12}>
          <Typography component={'span'} mt={2} mb={2} variant="h3">
            Step 3: Initialize the payment session
          </Typography>
        </Grid>
        <Grid item xs={12} mt={2}>
          <Typography component={'span'} variant="h5">
            Create a DOM element for{' '}
            <Box component="span">
              <Link href="https://docs.adyen.com/api-explorer/Checkout/70/post/sessions" className="content-link-style">
                {txVariant}
              </Link>
            </Box>
          </Typography>
        </Grid>
        <Grid item xs={12} mt={1}>
          <Typography variant="h6">
            Create a DOM container element on your checkout page where you want {txVariant} to be rendered and give it a descriptive id. We strongly
            recommend that you don't put it in an <Link href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/iframe">iframe element</Link>,
            because it may cause issues.
          </Typography>
        </Grid>
        <Grid item xs={12} className="sample-container">
          <Box className="sample-code">
            <code>&lt;div id="{txVariant}-container"&gt;&lt;/div&gt;</code>
          </Box>
        </Grid>
        <Grid item xs={12} mt={2}>
          <Typography variant="h6">
            If you are using JavaScript frameworks such as Vue or React, make sure that you use references instead of selectors and that you don't
            re-render the DOM element.
          </Typography>
        </Grid>
        <Grid item xs={12} mt={3}>
          <Typography component={'span'} variant="h6" sx={{ fontWeight: 'bold', fontSize: '1rem' }}>
            Create {txVariant} configuration
          </Typography>
        </Grid>
        <Grid item xs={12} mt={1}>
          <Typography variant="h6">Create an object for the {txVariant} configuration of your integration.</Typography>
        </Grid>
        <Grid item xs={12} className="sample-container">
          <Box className="sample-code">
            <code>const {txVariant}-Configuration = &#123;...&#125;</code>
          </Box>
        </Grid>
        <Grid item xs={12} mt={3}>
          <Typography component={'span'} variant="h6" sx={{ fontWeight: 'bold', fontSize: '1rem' }}>
            Configuration hierarchy
          </Typography>
        </Grid>
        <Grid item xs={12} mt={2}>
          <Typography variant="h6">
            The{' '}
            <Link href="https://docs.adyen.com/payment-methods" className="content-link-style">
              {txVariant}
            </Link>{' '}
            instance only accepts parameters related to itself. You must set global or component-specific configuration either on the main instance,{' '}
            <Link
              href="https://docs.adyen.com/online-payments/build-your-integration?platform=Web&integration=Drop-in&tab=npm_recommended__1&version=5.43.0#adyencheckout-configuration"
              className="content-link-style"
            >
              AdyenCheckout
            </Link>
            , or in the paymentMethodsConfiguration object.
          </Typography>
        </Grid>
        <Grid item xs={12} mt={2}>
          <Typography component={'span'} variant="h6" sx={{ fontWeight: 'bold', fontSize: '1rem' }}>
            Create an instance of {txVariant}
          </Typography>
        </Grid>
        <Grid item xs={12} mt={2}>
          <Typography variant="h6">
            Create an instance of {txVariant} using the configuration object and mount it to the container you created.
          </Typography>
        </Grid>
        <Grid item xs={12} className="sample-container">
          <Box className="sample-code">
            <Box>
              <code>
                const {txVariant}Component = checkout
                <Box pl={5}>
                  .create('{txVariant}','{txVariant}Configuration')
                  <br />
                  .mount('#{txVariant}-container');
                </Box>
              </code>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} my={2}>
          <Typography variant="h6">
            Set a parameter in the {txVariant} configuration object below. Note, you can manually add additional key value pairs to this configuration
            by clicking the lock icon.
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};
