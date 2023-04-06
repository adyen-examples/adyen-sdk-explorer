import { Input } from '../Input';

const style = {
  'adyen-checkout__payment-method': {
    'background-color': '#fff'
  }
};

export const StyleEditor = (props: any) => {
  return (
    <Input
      data={{}}
      prefix={`CSS:`}
      postfix={''}
      handleEditorUpdate={(value: any) => {
        console.log(value);
      }}
      viewOnly={true}
    />
  );
};
