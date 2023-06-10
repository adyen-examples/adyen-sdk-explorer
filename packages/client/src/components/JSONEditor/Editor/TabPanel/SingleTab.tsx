import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import type { ActionCreatorWithPayload } from '@reduxjs/toolkit';
import { useAppDispatch } from '../../../../hooks';
import { Box } from '@mui/material';
import { Input } from '../Input';
import { SingleTabHeader } from './SingleTabHeader';
import { onDeckActions } from '../../../../app';

import type { RootState } from '../../../../store';
import type { OnDeckPropType } from '../../../CheckoutBuilder/types';

interface DisplayProps {
  title: string;
  prefix: string;
  postfix: string;
  data: OnDeckPropType;
  action: any;
}

interface SingleTabProps {
  step: string;
  viewOnly: boolean;
}

export const SingleTab: any = ({ step, viewOnly }: SingleTabProps) => {
  const { txVariant, checkout, local, sessions } = useSelector((state: RootState) => state.onDeck);
  const { updateCheckoutInfo, updateLocalInfo, updateSessionsInfo } = onDeckActions;
  const [display, setDisplay] = useState<DisplayProps>({
    title: '',
    prefix: '',
    postfix: '',
    data: {},
    action: null
  });
  const dispatch = useAppDispatch();

  const updateStore: (value: any, action: ActionCreatorWithPayload<any>) => void = (value, action) => {
    dispatch(action(value));
  };

  useEffect(() => {
    switch (step) {
      case 'checkout':
        setDisplay({
          title: 'JS',
          prefix: `
          const checkout = await AdyenCheckout(`,
          postfix: `    );
        
          checkout.create('${txVariant}', {...});`,
          data: checkout,
          action: updateCheckoutInfo
        });
        break;
      case 'local':
        setDisplay({
          title: 'JS',
          prefix: `
          const checkout = await AdyenCheckout({...});
                  
          checkout.create('${txVariant}',`,
          postfix: `    );`,
          data: local,
          action: updateLocalInfo
        });
        break;
      case 'sessions':
        setDisplay({
          title: 'API',
          prefix: `
          const checkout = await AdyenCheckout({...});
                  
          checkout.create('${txVariant}',`,
          postfix: `    );`,
          data: sessions,
          action: updateSessionsInfo
        });
        break;
      default:
        throw new Error('Unknown step');
    }
  }, [step, txVariant, checkout, local, sessions, updateCheckoutInfo, updateLocalInfo, updateSessionsInfo]);

  return (
    <Box>
      <SingleTabHeader title={display.title} clipboardText={`${display.prefix + JSON.stringify(display.data) + display.postfix}`} />
      <Input
        data={display.data}
        prefix={display.prefix}
        postfix={display.postfix}
        handleEditorUpdate={(value: any) => {
          updateStore(value, display.action);
        }}
        viewOnly={viewOnly}
      />
    </Box>
  );
};
