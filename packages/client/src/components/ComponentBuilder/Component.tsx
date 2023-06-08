import { useInitializeSession } from '../../hooks';
import { Box } from '@mui/material';
import { Alerts } from '../CheckoutBuilder/Alerts';
import { ReactComponent as AdyenIdkIcon } from '../../assets/adyen-idk-icon.svg';
import type { OnDeckPropType } from '../CheckoutBuilder/types';
import { useEffect } from 'react';

export interface ComponentConfig {
  profile: OnDeckPropType;
  checkout: OnDeckPropType;
  local: OnDeckPropType;
  sessions: OnDeckPropType;
  style: any;
}

export const Component = ({ configuration }: { configuration: ComponentConfig }) => {
  const [checkout, result, error, activeStep] = useInitializeSession({ configuration, endpoint: 'api/sessions/sessionStart' });
  const product = configuration.profile.product;
  let componentWrapper = null;

  useEffect(() => {
    if (checkout) {
      try {
        checkout
          .create(product, {
            ...configuration.local
          })
          .mount('#checkout');
      } catch (error: any) {
        //here need you need to send to global error handler
        console.error(error);
        componentWrapper = (
          <Box pt={3} sx={{ textAlign: 'center' }}>
            <AdyenIdkIcon />
            <Alerts severityType={'error'} message={error.message ? error.message : 'Error creating component'} />
          </Box>
        );
      }
    }
  }, [checkout]);

  if (error) {
    return (
      <Box sx={{ textAlign: 'center' }}>
        <Alerts severityType={'error'} message={JSON.stringify(error)} />
        <Box pt={2}>
          <AdyenIdkIcon />
        </Box>
      </Box>
    );
  } else if (result) {
    return <Alerts severityType={result.status} message={result.resultCode} />;
  }

  return (
    <Box sx={configuration?.style}>
      <div id="checkout"></div>
    </Box>
  );
};
