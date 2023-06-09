import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { Box, Grid, IconButton, Typography } from '@mui/material';
import type { ActionCreatorWithPayload } from '@reduxjs/toolkit';
import { onDeckActions } from '../../../app';
import { useAppDispatch } from '../../../hooks';
import { SingleAPITab } from './APITab/SingleAPITab';
import { SingleCodeTab } from './CodeTab/SingleCodeTab';

export const SingleTab = (props: any) => {
  const { viewOnly, step, profile, checkout, local, sessions, ...other } = props;

  const SingleTabHeader = ({ title, clipboardText }: any) => {
    return (
      <Grid justifyContent="space-between" alignItems="flex-start" sx={{ bgcolor: 'secondary.light', px: 4, pt: 1 }} container>
        <Grid item xs={6}>
          <Box
            sx={{
              bgcolor: '#00112C',
              px: 1,
              py: 1,
              display: 'inline-block',
              width: '80px',
              textAlign: 'center',
              borderTopLeftRadius: 4,
              borderTopRightRadius: 4,
              color: 'primary.light'
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
        postfix: `); checkout.create('${profile.product}', {...});`,
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

        
checkout.create('${profile.product}',`,
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
