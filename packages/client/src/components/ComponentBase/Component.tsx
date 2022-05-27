import { useSearchParams } from 'react-router-dom';
import { useCheckout } from '../../hooks';
import type { EditableCheckoutConfigFields } from '../../hooks/types';

// { type, options }: { type: string; options: EditableCheckoutConfigFields }
// return <Component type={product} options={{global,local,session: {id: configuration.data.id, sessionData: configuration.data.sessionData}}} />;
  //TODO: move to own redirect handling component with useRedirect

const Component = ({ options }: { options: any }) => {
  const {configuration} = options;
  const [redirectInfo] = useSearchParams();
  const redirectResult = {
    redirectResult: redirectInfo.get('redirectResult'),
    redirectSessionId: redirectInfo.get('sessionId')
  };
  console.log('About to useCheckout hook');
  console.log('configuration', configuration);
  
  const [checkout] = useCheckout(options);

  if (checkout) {
    checkout.create(configuration.product).mount('#checkout');
  }
  return <div id="checkout"></div>;
};

export default Component;
