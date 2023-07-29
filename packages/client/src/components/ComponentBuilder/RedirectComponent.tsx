import { Box, Collapse, LinearProgress } from '@mui/material';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { onDeckActions } from '../../app';
import { ReactComponent as AdyenIdkIcon } from '../../assets/adyen-idk-icon.svg';
import { useAppDispatch, useCheckout } from '../../hooks';
import { ObjectOption } from '../CheckoutBuilder/configSteps/Options/OptionTypes';
import { ConfigurationSession } from './ConfigurationSession';

const { updateAdyenStateInfo } = onDeckActions;

export const RedirectComponent = ({ configuration }: { configuration: any }) => {
  const [queryParameters] = useSearchParams();
  const redirectResult: any = queryParameters.get('redirectResult'),
    sessionId: any = queryParameters.get('sessionId');
  const [error, setError] = useState(null);
  const [result, setResult] = useState<any>(null);
  const dispatch = useAppDispatch();
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

  const showMessages = () => {
    return (
      <Box mx={7} mt={2}>
        <Collapse orientation="vertical" in={!!error || !!result} timeout={700}>
          {error && <ObjectOption styleType="error" content={JSON.stringify(error)} />}
          {result && <ObjectOption styleType={result.status} content={result.resultCode} />}
        </Collapse>
        {error && (
          <Box sx={{ textAlign: 'center', mt: 2 }}>
            <AdyenIdkIcon />
          </Box>
        )}
      </Box>
    );
  };

  useEffect(() => {
    let ignore = false;
    if (checkout && !error && !ignore) {
      checkout.submitDetails({ details: { redirectResult: redirectResult } });
    }

    return () => {
      ignore = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checkout, error]);
  console.log('RedirectComponent');
  return (
    <Box sx={configuration?.style}>
      {showMessages()}
      {!error && !result && <LinearProgress />}
    </Box>
  );
};
