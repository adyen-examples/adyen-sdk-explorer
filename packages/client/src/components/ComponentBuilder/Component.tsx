import { useParams } from 'react-router-dom';
import { useInitializeSession } from '../../hooks';
import { Box } from '@mui/material';
import { Alerts } from '../CheckoutBuilder/Alerts';
import { ReactComponent as AdyenIdkIcon } from '../../assets/adyen-idk-icon.svg';
import type { OnDeckPropType } from '../CheckoutBuilder/types';

export interface ComponentConfig {
  txVariant: string;
  checkout: OnDeckPropType;
  local: OnDeckPropType;
  sessions: OnDeckPropType;
}

export const Component = ({ configuration }: { configuration: ComponentConfig }) => {
  const [checkout, result, error] = useInitializeSession({ configuration, endpoint: 'checkout/sessionStart' });
  const pathParams = useParams();
  const product: string | undefined = pathParams.component;

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
    try {
      checkout.create(product, configuration.local).mount('#checkout');
    } catch (error: any) {
      console.error(error);
      return (
        <Box pt={3} sx={{ textAlign: 'center' }}>
          <AdyenIdkIcon />
          <Alerts severityType={'error'} message={error.message ? error.message : 'Error creating component'} />
        </Box>
      );
    }
  }
  return <div id="checkout"></div>;
};
