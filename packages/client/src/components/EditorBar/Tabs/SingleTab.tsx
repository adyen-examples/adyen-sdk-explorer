import { Box, Collapse } from '@mui/material';
import type { ActionCreatorWithPayload } from '@reduxjs/toolkit';
import { onDeckActions } from '../../../app';
import { useAppDispatch } from '../../../hooks';
import { AdyenAlert } from '../../CheckoutBuilder/configSteps/Options/OptionTypes';
import { SingleAPITab } from './APITab/SingleAPITab';
import { SingleCodeTab } from './CodeTab/SingleCodeTab';
import { SingleTabHeader } from './Header/SingleTabHeader';

export const SingleTab = (props: any) => {
  const { viewOnly, step, txVariant, checkout, local, sessions, ...other } = props;
  const dispatch = useAppDispatch();

  const updateStore = (value: any, action: ActionCreatorWithPayload<any>): void => {
    dispatch(action(value));
  };
  const { updateCheckoutInfo, updateLocalInfo, updateSessionsInfo } = onDeckActions;
  const style = { flex: 1, display: 'flex', flexDirection: 'column', height: 0, bgcolor: 'background.default' };
  let singleTabData = null;
  switch (step) {
    case 'checkout':
      singleTabData = {
        title: 'JS',
        prefix: 'const checkout = await AdyenCheckout(',
        postfix: `); checkout.create('${txVariant}', {...});`,
        handler: (value: any) => {
          updateStore(value, updateCheckoutInfo);
        },
        payload: checkout,
        subtitle: 'CODE'
      };
      break;
    case 'local':
      singleTabData = {
        title: 'JS',
        prefix: `const checkout = await AdyenCheckout({...});        

checkout.create('${txVariant}',`,
        postfix: ');',
        handler: (value: any) => {
          updateStore(value, updateLocalInfo);
        },
        payload: local,
        subtitle: 'CODE'
      };
      break;
    case 'sessions':
      singleTabData = {
        title: 'Request',
        postfix: '',
        handler: (value: any) => {
          updateStore(value, updateSessionsInfo);
        },
        payload: sessions,
        subtitle: 'REQUEST'
      };
      break;
  }

  const showMessages = () => {
    return (
      <Collapse orientation="vertical" in={!viewOnly} timeout={700}>
        <Box mx={2} mt={2}>
          <AdyenAlert styleType={'warning'} content={'Warning! You can directly edit the parameters.'} />
        </Box>
      </Collapse>
    );
  };

  return (
    <Box sx={style} {...other}>
      <SingleTabHeader title={singleTabData?.title} clipboardText={JSON.stringify(singleTabData?.payload)} txVariant={txVariant} />
      {showMessages()}
      {(step === 'checkout' || step === 'local') && <SingleCodeTab {...singleTabData} viewOnly={viewOnly} />}
      {step === 'sessions' && <SingleAPITab {...singleTabData} viewOnly={viewOnly} />}
    </Box>
  );
};
