import { useInitializeSession } from '../../hooks';
import { Alerts } from '../CheckoutBuilder/Alerts';

const Component = ({ configuration }: { configuration: any }) => {
  const [checkout, error] = useInitializeSession({ configuration, endpoint: 'api/sessions/sessionStart' });
  const product = configuration.profile.product;

  if (error) {
    return <Alerts severityType={'error'} message={JSON.stringify(error)} />;
  }
  if (checkout) {
    try {
      checkout.create(product, configuration.local).mount('#checkout');
    } catch (error) {
      console.log('My error: ', error);
      console.error('error type', typeof error)
      return <Alerts severityType={'error'} message={JSON.stringify(error)} />;
    }
  }
  return <div id="checkout"></div>;
};

export default Component;
