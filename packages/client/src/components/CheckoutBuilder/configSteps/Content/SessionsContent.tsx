import { Box, Grid, Link, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { useScrollToTop } from '../../../../hooks';

export const SessionsContent = () => {
  const { txVariant } = useSelector((state: any) => state.onDeck);
  useScrollToTop('#main-content');
  return (
    <Box>
      <Grid mt={2} container px={7} sx={{ a: { color: '#06f', textDecoration: 'none' } }}>
        <Grid item xs={12}>
          <Typography component={'span'} mt={2} mb={2} variant="h3">
            Step 1: Create a payment session
          </Typography>
        </Grid>
        <Grid item xs={12} mt={1}>
          <Typography variant="h6">
            Create a payment session for your{' '}
            <Link
              href="https://docs.adyen.com/api-explorer/Checkout/70/post/sessions"
              sx={{ bgcolor: 'secondary.light', px: 1, py: 0.5, borderRadius: 1, color: '#4C4E52' }}
            >
              {txVariant}
            </Link>{' '}
            integration.
            <br />
            <br /> The response contains encrypted payment session data. The front end then uses the session data to make any required server-side
            calls for the payment flow.
            <br />
            <br /> You get the payment outcome asynchronously, in an{' '}
            <Link href="https://docs.adyen.com/api-explorer/#/Webhooks/latest/post/AUTHORISATION">AUTHORISATION</Link> webhook. Set a parameter in the{' '}
            <Link href="https://docs.adyen.com/online-payments/build-your-integration?platform=Web&integration=Drop-in&version=5.43.0#create-payment-session">
              /sessions
            </Link>{' '}
            request.
          </Typography>
        </Grid>
        <Grid item xs={12} mt={3} sx={{ border: 1, borderRadius: 1, borderColor: '#dce0e5' }}>
          <Typography sx={{ borderBottom: 1, p: 2, borderColor: '#dce0e5', fontWeight: 'bold', color: '#000000', fontSize: '.9rem' }} variant="h6">
            curl
          </Typography>
          <Box
            sx={{
              maxHeight: '25vh',
              overflow: 'scroll',
              fontSize: '0.8rem',
              lineHeight: 1.7,
              px: 3,
              pt: 1,
              bgcolor: 'secondary.light',
              color: '#4C4E52'
            }}
          >
            <code>
              curl https://checkout-test.adyen.com/v70/sessions \<br /> -H "YOUR_API_KEY: YOUR_API_KEY" \<br /> -H "content-type: application/json" \
              <br /> -d '&#123;
              <Box pl={3}>
                "merchantAccount": "YOUR_MERCHANT_ACCOUNT",
                <br /> "amount": &#123;
                <br /> "value": 1000,
                <br /> "currency": "EUR" &#125;,
                <br /> "returnUrl": "https://your-company.com/checkout?shopperOrder=12xy..",
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
                <Link
                  href="https://docs.adyen.com/api-explorer/Checkout/70/post/sessions#responses-201-sessionData"
                  sx={{ bgcolor: 'secondary.light', px: 1, py: 0.5, borderRadius: 1, color: '#4C4E52' }}
                >
                  sessionData
                </Link>
                : the payment session data you need to pass to your front end.
              </li>
              <li>
                <Link
                  href="https://docs.adyen.com/api-explorer/Checkout/70/post/sessions#responses-201-id"
                  sx={{ bgcolor: 'secondary.light', px: 1, py: 0.5, borderRadius: 1, color: '#4C4E52' }}
                >
                  id
                </Link>
                : a unique identifier for the session data.
              </li>
              <li>The request body.</li>
            </ul>
          </Typography>
        </Grid>
        <Grid item xs={12} mt={1}>
          <Typography component={'span'} variant="h5" sx={{ fontWeight: 'bold', fontSize: '1rem' }}>
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
    </Box>
  );
};
