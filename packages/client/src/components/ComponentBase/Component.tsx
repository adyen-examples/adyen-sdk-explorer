import { useSearchParams } from 'react-router-dom';
import { useCheckout } from '../../hooks';
import type { EditableCheckoutConfigFields } from '../../hooks/types';
import RedirectComponent from './RedirectComponent';

const Component = ({ configuration }: { configuration: any }) => {
  const [checkout] = useCheckout(configuration);

  if (checkout) {
    console.log('about to mount');
    
    checkout.create('dropin').mount('#checkout');
  }
  return <div id="checkout"></div>;
};

export default Component;
