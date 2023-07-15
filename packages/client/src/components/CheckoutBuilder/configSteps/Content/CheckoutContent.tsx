import { Box, Typography, Grid, Link } from '@mui/material';
import { useScrollToTop } from '../../../../hooks';

export const CheckoutContent = () => {
  const contentContainerStyle = {
    px: 7,
    mt: 2,
    a: { color: 'primary.main', textDecoration: 'none' },
    '.content-link-style': { bgcolor: 'secondary.light', px: 1, py: 0.5, borderRadius: 1, color: 'primary.main' },
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
      color: 'background.grey'
    }
  };
  useScrollToTop('#main-content');

  return (
    <Grid sx={contentContainerStyle}>
      <Grid item xs={12}>
        <Typography component={'span'} mt={2} mb={2} variant="h3">
          Step 2: Create an instance of checkout
        </Typography>
      </Grid>
      <Grid item xs={12} mt={2}>
        <Typography component={'span'} variant="h5">
          Get Adyen Web
        </Typography>
      </Grid>
      <Grid item xs={12} mt={1}>
        <Typography variant="h6">
          Use the <Link href="https://www.npmjs.com/package/@adyen/adyen-web">Adyen Web Node package</Link>, or embed the Adyen Web script and
          stylesheet into your HTML file:
        </Typography>
      </Grid>
      <Grid item xs={12} className="sample-container">
        <Box className="sample-code">
          <code>npm install @adyen/adyen-web --save</code>
        </Box>
      </Grid>
      <Grid item xs={12} mt={3}>
        <Typography variant="h6">
          Import Adyen Web into your application. You can{' '}
          <Link href="https://docs.adyen.com/online-payments/build-your-integration?platform=Web&integration=Drop-in#custom-styling">
            add your own styling
          </Link>{' '}
          by overriding the rules in the CSS file.
        </Typography>
      </Grid>
      <Grid item xs={12} className="sample-container">
        <Box className="sample-code">
          <code>
            import AdyenCheckout from '@adyen/adyen-web';
            <br /> import '@adyen/adyen-web/dist/adyen.css';
          </code>
        </Box>
      </Grid>
      <Grid item xs={12} mt={3}>
        <Typography component={'span'} variant="h5">
          Create a checkout configuration
        </Typography>
      </Grid>
      <Grid item xs={12} mt={1}>
        <Typography variant="h6">Create an object for the global configuration of your integration.</Typography>
      </Grid>
      <Grid item xs={12} mt={1}>
        <Typography variant="h6">
          This section shows the required and recommended parameters. You can also use{' '}
          <Link href="https://docs.adyen.com/online-payments/build-your-integration?platform=Web&integration=Drop-in&tab=npm_recommended__1&version=5.43.0#optional-configuration">
            optional configuration
          </Link>{' '}
          to add features and to customize the checkout flow for your shoppers.
        </Typography>
      </Grid>
      <Grid item xs={12} className="sample-container">
        <Typography className="sample-title" variant="h5">
          `AdyenCheckout` configuration
        </Typography>
        <Box className="sample-code">
          <code>
            const configuration = &#123;
            <Box pl={2}>
              environment: 'test', // 'live' for the live environment.
              <br /> clientKey: 'test_870be2...',
              <br /> analytics: &#123;
              <Box pl={2}>enabled: true</Box>
              &#125;,
              <br /> session: &#123;
              <Box pl={2}>
                id: 'CSD9CAC3...',
                <br /> sessionData: 'Ab02b4c...'
              </Box>
              &#125;,
              <br /> onPaymentCompleted: (result, component) =&gt; &#123;&#125;,
              <br /> onError: (error, component) =&gt; &#123;&#125;,
            </Box>
            &#125;
          </code>
        </Box>
      </Grid>
      <Grid item xs={12} mt={2}>
        <Typography component={'span'} variant="h5">
          Create checkout instance
        </Typography>
      </Grid>
      <Grid item xs={12} mt={2}>
        <Typography variant="h6">
          Create an instance of AdyenCheckout using the{' '}
          <Link href="https://docs.adyen.com/online-payments/build-your-integration?platform=Web&integration=Drop-in&tab=npm_recommended__1&version=5.43.0#configure">
            configuration object
          </Link>{' '}
          you created.
        </Typography>
      </Grid>
      <Grid item xs={12} className="sample-container">
        <Box className="sample-code">
          <code>const checkout = await AdyenCheckout(configuration);</code>
        </Box>
      </Grid>
      <Grid item xs={12} mt={2}>
        <Typography variant="h6">
          Set a parameter in the configuration object below. Note, you can manually add additional key value pairs to this configuration by clicking
          the lock icon.
        </Typography>
      </Grid>
    </Grid>
  );
};
