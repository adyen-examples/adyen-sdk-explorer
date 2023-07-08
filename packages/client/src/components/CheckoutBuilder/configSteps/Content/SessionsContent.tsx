import { Box, Grid, Link, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { useScrollToTop } from '../../../../hooks';

export const SessionsContent = () => {
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
      color: 'background.grey'
    }
  };
  useScrollToTop('#main-content');
  return (
    <Grid container sx={contentContainerStyle}>
      <Grid item xs={12}>
        <Typography component={'span'} mt={2} mb={2} variant="h3">
          Step 1: Create a payment session
        </Typography>
      </Grid>
      <Grid item xs={12} mt={2}>
        <Typography variant="h5">
          Create a payment session for your{' '}
          <Link href="https://docs.adyen.com/api-explorer/Checkout/70/post/sessions" className="content-link-style">
            {txVariant ? txVariant : '...'}
          </Link>{' '}
          integration.
        </Typography>
        <Typography variant="h6">
          <br /> The response contains encrypted payment session data. The front end then uses the session data to make any required server-side calls
          for the payment flow.
          <br />
          <br /> You get the payment outcome asynchronously, in an{' '}
          <Link href="https://docs.adyen.com/api-explorer/#/Webhooks/latest/post/AUTHORISATION">AUTHORISATION</Link> webhook. Set a parameter in the{' '}
          <Link href="https://docs.adyen.com/online-payments/build-your-integration?platform=Web&integration=Drop-in&version=5.43.0#create-payment-session">
            /sessions
          </Link>{' '}
          request.
        </Typography>
      </Grid>
      <Grid item xs={12} className="sample-container">
        <Typography className="sample-title" variant="h5">
          curl
        </Typography>
        <Box className="sample-code">
          <code>
            curl https://checkout-test.adyen.com/v70/sessions \<br /> -H "YOUR_API_KEY: YOUR_API_KEY" \<br /> -H "content-type: application/json" \
            <br /> -d '&#123;
            <Box pl={3}>
              "merchantAccount": "YOUR_MERCHANT_ACCOUNT",
              <br /> "amount": &#123;
              <Box pl={2}>
                "value": 1000,
                <br /> "currency": "EUR",
                <br />
                &#125;,
              </Box>
              "returnUrl": "https://your-company.com/checkout?shopperOrder=12xy..",
              <br /> "reference": "YOUR_PAYMENT_REFERENCE",
              <br /> "countryCode": "NL"
            </Box>
            &#125;'
          </code>
        </Box>
      </Grid>
      <Grid item xs={12} mt={2}>
        <Typography variant="h6">The response contains:</Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h6">
          <ul>
            <li>
              <Link href="https://docs.adyen.com/api-explorer/Checkout/70/post/sessions#responses-201-sessionData" className="content-link-style">
                sessionData
              </Link>
              : the payment session data you need to pass to your front end.
            </li>
            <li>
              <Link href="https://docs.adyen.com/api-explorer/Checkout/70/post/sessions#responses-201-id" className="content-link-style">
                id
              </Link>
              : a unique identifier for the session data.
            </li>
            <li>The request body.</li>
          </ul>
        </Typography>
      </Grid>
      <Grid item xs={12} mt={1}>
        <Typography component={'span'} variant="h5">
          API error handling
        </Typography>
      </Grid>
      <Grid item xs={12} mt={2}>
        <Typography variant="h6">
          If you don't get an HTTP 201 response, use the errorCode field and the list of API error codes to troubleshoot.
        </Typography>
      </Grid>
      <Grid item xs={12} my={2}>
        <Typography variant="h6">
          Set a parameter in the{' '}
          <Link href="https://docs.adyen.com/online-payments/build-your-integration?platform=Web&integration=Drop-in&version=5.43.0#create-payment-session">
            /sessions
          </Link>{' '}
          request. Note, you can manually add additional key value pairs to this configuration by clicking the lock icon.
        </Typography>
      </Grid>
    </Grid>
  );
};
