import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Box } from '@mui/material';
import { Alerts } from '../CheckoutBuilder/Alerts';
import { ConfigurationSession } from './ConfigurationSession';
import { useCheckout } from '../../hooks';
import { ReactComponent as AdyenIdkIcon } from '../../assets/adyen-idk-icon.svg';

export const RedirectComponent = ({ configuration }: { configuration: any }) => {
  const [queryParameters] = useSearchParams();
  const redirectResult: any = queryParameters.get('redirectResult'),
    sessionId: any = queryParameters.get('sessionId');
  const [error, setError] = useState(null);
  const [result, setResult] = useState<any>(null);
  const sessions = new ConfigurationSession({
    ...configuration,
    queryParameters: { redirectResult: redirectResult, sessionId: sessionId },
    setState: { error: setError, result: setResult }
  });
  const [checkout] = useCheckout(sessions);
  const product = configuration.profile.product;

  console.log('This is the error: ', error);

  if (error) {
    return (
      <Box pt={3} sx={{ textAlign: 'center' }}>
        <AdyenIdkIcon />
        <Alerts severityType={'error'} message={JSON.stringify(error)} />
      </Box>
    );
  } else if (result) {
    return <Alerts severityType={result.status} message={result.resultCode} />;
  } else if (checkout) {
    checkout.submitDetails(sessions.redirectResult);
    checkout.create(product, configuration.local).mount('#checkout');
  }

  return (
    <Box sx={configuration?.style}>
      <div id="checkout"></div>
    </Box>
  );
};
