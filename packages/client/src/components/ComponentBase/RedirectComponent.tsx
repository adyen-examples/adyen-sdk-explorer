import { useSearchParams } from 'react-router-dom';
import { useCheckout } from '../../hooks';
import ConfigurationSession from './ConfigurationSession';
import { useState } from 'react';
import { Alerts } from '../CheckoutBuilder/Alerts';

const RedirectComponent = ({ configuration }: { configuration: any }) => {
  const [queryParameters] = useSearchParams();
  const redirectResult: any = queryParameters.get('redirectResult'),
    sessionId: any = queryParameters.get('sessionId');
  const [error, setError] = useState(null);
  const [success,setSuccess] = useState(null);
  const sessions = new ConfigurationSession({
    ...configuration,
    queryParameters: { redirectResult: redirectResult, sessionId: sessionId },setState: {error: setError}
  });
  const [checkout] = useCheckout(sessions);
  const product = configuration.profile.product;

  if (error) {
    return <Alerts severityType={'error'} message={JSON.stringify(error)} />
  } else if (success) {
    return <Alerts severityType={'success'} message={'success'} />
  } else if (checkout) {
    checkout.submitDetails(sessions.redirectResult);
    checkout.create(product,configuration.local).mount('#checkout');
  }

  return <div id="checkout"></div>;
};

export default RedirectComponent;
