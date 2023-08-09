import { Box, Collapse, LinearProgress, CssBaseline } from '@mui/material';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ReactComponent as AdyenIdkIcon } from '../../assets/adyen-idk-icon.svg';
import { useInitializeSession } from '../../hooks';
import { AdyenAlert } from '../CheckoutBuilder/configSteps/Options/OptionTypes';
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
      <Box mx={7} mt={2}>
        <Collapse orientation="vertical" in={!!error || !!createError || !!result} timeout={700}>
          {error && <AdyenAlert styleType="error" content={JSON.stringify(error)} />}
          {createError && <AdyenAlert styleType="error" content={createError} />}
          {result && <AdyenAlert styleType={result.status} content={result.resultCode} />}
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
      {!error && !result && checkout && (
        <Box mx={7} my={2} px={1} py={1} sx={{ borderRadius: 3, bgcolor: 'secondary.light', border: 1, borderColor: 'primary.light' }}>
          <CssBaseline />
          <div id="checkout"></div>
        </Box>
      )}
    </Box>
  );
};
