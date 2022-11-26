import { useInitializeSession } from '../../hooks';
import { Alerts } from '../CheckoutBuilder/Alerts';

const Component = ({ configuration }: { configuration: any }) => {
  const [checkout, error] = useInitializeSession({ configuration, endpoint: 'api/sessions/sessionStart' });
  const product = configuration.profile.product;

  console.log('product: ', product);
  

  if (error) {
    return <Alerts severityType={'error'} message={JSON.stringify(error)} />;
  }
  if (checkout) {
    checkout.create(product, configuration.local).mount('#checkout');
  }
  return <div id="checkout"></div>;
};

export default Component;
