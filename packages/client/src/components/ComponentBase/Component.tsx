import { useInitializeSession } from '../../hooks';
import { Alerts } from '../CheckoutBuilder/Alerts';

const Component = ({ configuration }: { configuration: any }) => {
  const [checkout, result, error] = useInitializeSession({ configuration, endpoint: 'api/sessions/sessionStart' });
  const product = configuration.profile.product;

  if (error) {
    return <Alerts severityType={'error'} message={JSON.stringify(error)} />;
  } else if (result) {
    return <Alerts severityType={result.status} message={result.resultCode} />;
  } else if (checkout) {
    try {
      checkout.create(product, configuration.local).mount('#checkout');
    } catch (error: any) {
      console.error(error);
      return <Alerts severityType={'error'} message={error.message ? error.message : 'Error creating component'} />;
    }
  }
  return <div id="checkout"></div>;
};

export default Component;
