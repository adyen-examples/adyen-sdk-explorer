import { Box, Collapse, LinearProgress } from '@mui/material';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ReactComponent as AdyenIdkIcon } from '../../assets/adyen-idk-icon.svg';
import { useInitializeSession } from '../../hooks';
import { Alerts } from '../CheckoutBuilder/Alerts';
import type { OnDeckPropType } from '../CheckoutBuilder/types';

export interface ComponentConfig {
  checkout: OnDeckPropType;
  local: OnDeckPropType;
  sessions: OnDeckPropType;
  style: any;
  txVariant: string;
}

export const Component = ({ configuration }: { configuration: ComponentConfig }) => {
  const [checkout, result, error] = useInitializeSession({ configuration, endpoint: 'api/sessions/sessionStart' });
  const { local } = configuration;
  const pathParams = useParams();
  const product: string | undefined = pathParams.component;
  const [createError, setCreateError] = useState<string | null>(null);

  const showMessages = () => {
    return (
      <Box>
        <Collapse orientation="vertical" in={!!error || !!createError || !!result} timeout={700}>
          {error && (
            <Box sx={{ textAlign: 'center' }}>
              <Alerts severityType={'error'} message={JSON.stringify(error)} />
            </Box>
          )}
          {createError && (
            <Box sx={{ textAlign: 'center' }}>
              <Alerts severityType={'error'} message={createError} />
            </Box>
          )}
          {result && (
            <Box sx={{ textAlign: 'center' }}>
              <Alerts severityType={result.status} message={result.resultCode} />
            </Box>
          )}
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
    if (checkout) {
      try {
        checkout
          .create(product, {
            ...local
          })
          .mount('#checkout');
      } catch (error: any) {
        console.error(error);
        setCreateError(error.message);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checkout, local]);

  return (
    <Box sx={configuration?.style}>
      {!checkout && !error && !result && <LinearProgress />}
      {showMessages()}
      <Box p={3}>
        <div id="checkout"></div>
      </Box>
    </Box>
  );
};
