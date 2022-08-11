import { useInitializeSession } from '../../hooks';
import { Alerts } from '../CheckoutBuilder/Alerts';

const Component = ({ configuration }: { configuration: any }) => {
  console.log('configuration inside component',configuration);
  
  const [checkout, error] = useInitializeSession({ configuration, endpoint: 'sessions/sessionStart' });
  const product = configuration.profile.product;

  if (error) {
    return <Alerts severityType={'error'} message={JSON.stringify(error)} />
  }
  if (checkout) {
    checkout.create(product).mount('#checkout');
  }
  return <div id="checkout"></div>;
};

export default Component;
