import { useSearchParams } from 'react-router-dom';
import { useCheckout } from '../../hooks';
import type { EditableCheckoutConfigFields } from '../../hooks/types';

const Component = ({ type, options }: { type: string; options: EditableCheckoutConfigFields }) => {
  //TODO: move to own redirect handling component with useRedirect
  const [redirectInfo] = useSearchParams();
  const redirectResult = {
    redirectResult: redirectInfo.get('redirectResult'),
    redirectSessionId: redirectInfo.get('sessionId')
  };
  const [checkout] = useCheckout(options);

  if (checkout) {
    checkout.create(type).mount('#checkout');
  }
  return <div id="checkout"></div>;
};

export default Component;
