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
    if (error) {
      componentWrapper = (
        <Box pt={3} sx={{ textAlign: 'center' }}>
          <AdyenIdkIcon />
          <Alerts severityType={'error'} message={JSON.stringify(error)} />
        </Box>
      );
    } else if (result) {
      componentWrapper = <Alerts severityType={result.status} message={result.resultCode} />;
    } else if (checkout) {
      try {
        checkout
          .create(product, {
            ...configuration.local
          })
          .mount('#checkout');
      } catch (error: any) {
        console.error(error);
        componentWrapper = (
          <Box pt={3} sx={{ textAlign: 'center' }}>
            <AdyenIdkIcon />
            <Alerts severityType={'error'} message={error.message ? error.message : 'Error creating component'} />
          </Box>
        );
      }
    }
  }, [checkout, result, error, activeStep]);

  return (
    <Box sx={configuration?.style}>
      <div id="checkout"></div>
      {componentWrapper}
    </Box>
  );
};
