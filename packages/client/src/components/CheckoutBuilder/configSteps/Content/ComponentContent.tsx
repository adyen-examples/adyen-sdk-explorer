import { Box, Typography, Grid, Link } from '@mui/material';
import { useSelector } from 'react-redux';

export const ComponentContent = () => {
  const { txVariant } = useSelector((state: any) => state.onDeck);
  return (
    <Box>
      <Grid mt={2} container px={7} sx={{ a: { color: '#06f', textDecoration: 'none' } }}>
        <Grid item xs={12}>
          <Typography component={'span'} mt={2} mb={2} variant="h3">
            Step 3: Initialize the payment session
          </Typography>
        </Grid>
        <Grid item xs={12} mt={2}>
          <Typography component={'span'} variant="h5" sx={{ fontWeight: 'bold', fontSize: '1rem' }}>
            Create a DOM element for{' '}
            <Box component="span" sx={{ bgcolor: 'secondary.light', px: 1, py: 0.5, borderRadius: 1, color: '#00112c' }}>
              {txVariant}
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
        <Grid item xs={12} mt={3} sx={{ border: 1, borderRadius: 1, borderColor: '#dce0e5' }}>
          <Box
            sx={{
              maxHeight: '25vh',
              overflow: 'scroll',
              fontSize: '0.8rem',
              lineHeight: 1.7,
              px: 3,
              py: 1,
              bgcolor: 'secondary.light',
              color: '#4C4E52'
            }}
          >
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
            Create a {txVariant} configuration
          </Typography>
        </Grid>
        <Grid item xs={12} mt={1}>
          <Typography variant="h6">Create an object for the {txVariant} configuration of your integration.</Typography>
        </Grid>
        <Grid item xs={12} mt={3} sx={{ border: 1, borderRadius: 1, borderColor: '#dce0e5' }}>
          <Box
            sx={{
              maxHeight: '25vh',
              overflow: 'scroll',
              fontSize: '0.8rem',
              lineHeight: 1.7,
              px: 3,
              py: 1,
              bgcolor: 'secondary.light',
              color: '#4C4E52'
            }}
          >
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
            You must set global or component-specific configuration either on the main instance,{' '}
            <Link
              href="https://docs.adyen.com/online-payments/build-your-integration?platform=Web&integration=Drop-in&tab=npm_recommended__1&version=5.43.0#adyencheckout-configuration"
              sx={{ bgcolor: 'secondary.light', px: 1, py: 0.5, borderRadius: 1, color: '#4C4E52' }}
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
        <Grid item xs={12} mt={2} sx={{ border: 1, borderRadius: 1, borderColor: '#dce0e5' }}>
          <Box
            sx={{
              maxHeight: '25vh',
              fontSize: '0.8rem',
              lineHeight: 1.7,
              px: 3,
              py: 1,
              bgcolor: 'secondary.light',
              color: '#4C4E52',
              display: 'block',
              overflowX: 'scroll'
            }}
          >
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
