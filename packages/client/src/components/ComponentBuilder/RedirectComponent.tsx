import { Box } from '@mui/material';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { onDeckActions } from '../../app';
import { ReactComponent as AdyenIdkIcon } from '../../assets/adyen-idk-icon.svg';
import { useAppDispatch, useCheckout } from '../../hooks';
import { Alerts } from '../CheckoutBuilder/Alerts';
import { ConfigurationSession } from './ConfigurationSession';

const { updateAdyenStateInfo } = onDeckActions;

export const RedirectComponent = ({ configuration }: { configuration: any }) => {
  const [queryParameters] = useSearchParams();
  const redirectResult: any = queryParameters.get('redirectResult'),
    sessionId: any = queryParameters.get('sessionId');
  const [error, setError] = useState(null);
  const [result, setResult] = useState<any>(null);
  const dispatch = useAppDispatch();
  const { local, txVariant } = configuration;
  const sessions = new ConfigurationSession({
    ...configuration,
    queryParameters: { redirectResult: redirectResult, sessionId: sessionId },
    setState: {
      error: setError,
      result: setResult,
      adyenState: (data: any) => {
        dispatch(updateAdyenStateInfo(data));
      }
    }
  });
  const [checkout] = useCheckout(sessions);

  useEffect(() => {
    if (checkout && !error) {
      checkout.submitDetails({ details: { redirectResult: redirectResult } });
      checkout.create(txVariant, local).mount('#checkout');
    }
  }, [checkout, txVariant, local, redirectResult, error]);

  if (error) {
    return (
      <Box sx={{ textAlign: 'center' }}>
        <Alerts severityType={'error'} message={JSON.stringify(error)} />
        <AdyenIdkIcon />
      </Box>
    );
  } else if (result) {
    return (
      <Box>
        <Alerts severityType={result?.status} message={result?.resultCode} />
      </Box>
    );
  }

  return (
    <Box sx={configuration?.style}>
      <div id="checkout"></div>
    </Box>
  );
};
