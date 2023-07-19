import { Box, Collapse } from '@mui/material';
import type { ActionCreatorWithPayload } from '@reduxjs/toolkit';
import { onDeckActions } from '../../../app';
import { useAppDispatch } from '../../../hooks';
import { ObjectOption } from '../../CheckoutBuilder/configSteps/Options/OptionTypes';
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
          <ObjectOption styleType={'warning'} content={'Warning! You can directly edit the parameters.'} />
        </Box>
      </Collapse>
    );
  };

  return (
    <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }} {...other}>
      <SingleTabHeader
        title={singleTabData?.title}
        clipboardText={`${singleTabData?.prefix + JSON.stringify(singleTabData?.payload) + singleTabData?.postfix}`}
        txVariant={txVariant}
      />
      {showMessages()}
      {(step === 'checkout' || step === 'local') && <SingleCodeTab {...singleTabData} viewOnly={viewOnly} />}
      {step === 'sessions' && <SingleAPITab {...singleTabData} viewOnly={viewOnly} />}
    </Box>
  );
};
