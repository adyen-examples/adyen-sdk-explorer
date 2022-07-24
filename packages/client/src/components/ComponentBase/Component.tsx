import { useInitializeSession } from '../../hooks';

const Component = ({ configuration }: { configuration: any }) => {
  const [checkout, error] = useInitializeSession({ configuration, endpoint: 'sessions/sessionStart' });
  const product = configuration.profile.product;

  if (error) {
    return <div>{JSON.stringify(error)}</div>;
  }
  if (checkout) {
    checkout.create(product).mount('#checkout');
  }
  return <div id="checkout"></div>;
};

export default Component;
