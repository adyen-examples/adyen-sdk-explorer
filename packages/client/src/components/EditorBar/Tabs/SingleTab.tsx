import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { Box, Grid, IconButton, Typography } from '@mui/material';
import type { ActionCreatorWithPayload } from '@reduxjs/toolkit';
import { onDeckActions } from '../../../app';
import { useAppDispatch } from '../../../hooks';
import { SingleAPITab } from './APITab/SingleAPITab';
import { SingleCodeTab } from './CodeTab/SingleCodeTab';

export const SingleTab = (props: any) => {
  const { viewOnly, step, txVariant, checkout, local, sessions, ...other } = props;
  console.log('SingleTab:: txVariant', txVariant);
  const SingleTabHeader = ({ title, clipboardText }: any) => {
    return (
      <Grid
        justifyContent="space-between"
        alignItems="flex-start"
        sx={{ bgcolor: 'secondary.light', px: 4, pt: 1, boxShadow: '0 8px 8px rgba(0,17,44,.04), 0 2px 4px rgba(0,17,44,.08)' }}
        container
      >
        <Grid item xs={6}>
          <Box
            sx={{
              bgcolor: 'secondary.light',
              px: 1,
              py: 1,
              display: 'inline-block',
              width: '80px',
              textAlign: 'center',
              borderTopLeftRadius: 4,
              borderTopRightRadius: 4,
              color: 'secondary.main'
            }}
          >
            <Typography variant="h6" sx={{ fontSize: '.75rem', fontWeight: 'bold' }}>
              {title}
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={6} sx={{ textAlign: 'right' }}>
          <IconButton
            sx={{ py: 0 }}
            onClick={() => {
              navigator.clipboard.writeText(clipboardText);
            }}
          >
            <ContentCopyIcon sx={{ fontSize: '17px', fontWeight: 'bold' }} />
          </IconButton>
        </Grid>
      </Grid>
    );
  };
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
          console.log('updating store');
          updateStore(value, updateLocalInfo);
        },
        payload: local,
        subtitle: 'CODE'
      };
      break;
    case 'sessions':
      singleTabData = {
        title: 'API',
        postfix: '',
        handler: (value: any) => {
          console.log('updating store');
          updateStore(value, updateSessionsInfo);
        },
        payload: sessions,
        subtitle: 'REQUEST'
      };
      break;
  }

  return (
    <Box {...other}>
      <SingleTabHeader
        title={singleTabData?.title}
        clipboardText={`${singleTabData?.prefix + JSON.stringify(singleTabData?.payload) + singleTabData?.postfix}`}
      />
      {(step === 'checkout' || step === 'local') && <SingleCodeTab {...singleTabData} viewOnly={viewOnly} />}
      {step === 'sessions' && <SingleAPITab {...singleTabData} viewOnly={viewOnly} />}
    </Box>
  );
};
