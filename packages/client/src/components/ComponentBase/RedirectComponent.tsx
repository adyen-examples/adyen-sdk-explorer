import { useSearchParams } from 'react-router-dom';
import { useCheckout } from '../../hooks';
import ConfigurationSession from './ConfigurationSession';

const RedirectComponent = ({ configuration }: { configuration: any }) => {
  const [queryParameters] = useSearchParams();
  const redirectResult: any = queryParameters.get('redirectResult'),
    sessionId: any = queryParameters.get('sessionId');
  const sessions = new ConfigurationSession({
    ...configuration,
    queryParameters: { redirectResult: redirectResult, sessionId: sessionId }
  });
  const [checkout] = useCheckout(sessions);
  const product = configuration.profile.product;

  if (checkout) {
    checkout.submitDetails(sessions.redirectResult);
    checkout.create(product).mount('#checkout');
  }
  
  return <div id="checkout"></div>;
};

export default RedirectComponent;
