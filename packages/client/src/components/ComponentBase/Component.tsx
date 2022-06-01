import { useCheckout } from '../../hooks';

const Component = ({ configuration }: { configuration: any }) => {
  const [checkout] = useCheckout(configuration);

  if (checkout) {
    checkout.create(configuration.product).mount('#checkout');
  }
  return <div id="checkout"></div>;
};

export default Component;
