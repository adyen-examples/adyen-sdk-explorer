import { useCheckout } from '../../hooks';
import { ConfigurationSession } from './ConfigurationSession'

const Component = ({ configuration }: { configuration: any }) => {
  const [queryParameters] = useSearchParams();
  const redirectResult: any = queryParameters.get('redirectResult'),
    sessionId: any = queryParameters.get('sessionId');
  const { profile, checkout, local, sessions } = configuration;
  const [adyenCheckout] = useCheckout(configuration);

  if (adyenCheckout) {
    configuration = new ConfigurationSession({
      profile,
      checkout,
      local,
      sessions,
      queryParameters: { redirectResult: redirectResult, sessionId: sessionId }
    });
    adyenCheckout.submitDetails(configuration.redirectResult);
    adyenCheckout.create(configuration.product).mount('#checkout');
  }

  return <div id="checkout">Loading...</div>;
};

export default Component;
