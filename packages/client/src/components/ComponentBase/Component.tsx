import { useSearchParams } from 'react-router-dom';
import { useCheckout } from '../../hooks';
import type { EditableCheckoutConfigFields } from '../../hooks/types';

// { type, options }: { type: string; options: EditableCheckoutConfigFields }

const Component = ({ type, options }: { type: string; options: any }) => {
  //TODO: move to own redirect handling component with useRedirect
  const [redirectInfo] = useSearchParams();
  const redirectResult = {
    redirectResult: redirectInfo.get('redirectResult'),
    redirectSessionId: redirectInfo.get('sessionId')
  };
  console.log('About to useCheckout hook');
  // Here we are using the useCheckout hook which uses the compareCheckoutData, we may need one for sessions
  // So either we create a component for each, or we just pass in useCheckout and such
  // I think we use the state as the example we had. 
  
  const [checkout] = useCheckout(options);

  if (checkout) {
    checkout.create(type).mount('#checkout');
  }
  return <div id="checkout"></div>;
};

export default Component;
