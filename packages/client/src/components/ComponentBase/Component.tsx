import { useCheckout } from '../../hooks';
import { useInitializeCheckout } from '../../hooks';
import { ConfigurationSession } from './ConfigurationSession'

const Component = ({ configuration }: { configuration: any }) => {
  const { profile, checkout, local, sessions } = configuration;
  const [data] = useInitializeCheckout({ payload: { profile, checkout, local, sessions }, endpoint: 'sessions/sessionStart' });
  const [adyenCheckout] = useCheckout(configuration, data);

  if (data.error) {
    return <div>{JSON.stringify(data.error)}</div>;
  }
  if (adyenCheckout) {
    localStorage.setItem('configuration', JSON.stringify({ profile, checkout, local, sessions }));
    const checkoutConfiguration = new ConfigurationSession({ profile, checkout, local, sessions, data });
    console.log('non redirect flow: configuration', configuration);

    adyenCheckout.create(configuration.product).mount('#checkout');
  }
  return <div id="checkout">Loading...</div>;
};

export default Component;
