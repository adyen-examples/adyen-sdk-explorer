import AutorenewIcon from '@mui/icons-material/Autorenew';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { Box, Grid, IconButton, Typography } from '@mui/material';
import type { ActionCreatorWithPayload } from '@reduxjs/toolkit';
import { useNavigate } from 'react-router-dom';
import { onDeckActions } from '../../../app';
import { useAppDispatch } from '../../../hooks';
import { SingleAPITab } from './APITab/SingleAPITab';
import { SingleCodeTab } from './CodeTab/SingleCodeTab';

export const SingleTab = (props: any) => {
  const { viewOnly, step, txVariant, checkout, local, sessions, ...other } = props;
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const SingleTabHeader = ({ title, clipboardText }: any) => {
    return (
      <Grid
        justifyContent="space-between"
        alignItems="flex-start"
        sx={{ bgcolor: 'secondary.light', px: 4, pt: 0.8, boxShadow: '0 8px 8px rgba(0,17,44,.04), 0 2px 4px rgba(0,17,44,.08)' }}
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
              textAlign: 'left',
              color: 'secondary.main'
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: 'bold', fontSize: '0.95rem', color: '#00112c' }}>
              {title}
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={6} sx={{ textAlign: 'right' }}>
          <IconButton
            sx={{ py: 0 }}
            onClick={() => {
              dispatch(resetOnDeckInfo());
              navigate(`/${txVariant}`);
            }}
          >
            <AutorenewIcon sx={{ fontSize: '17px', fontWeight: 'bold' }} />
          </IconButton>
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

  const updateStore = (value: any, action: ActionCreatorWithPayload<any>): void => {
    dispatch(action(value));
  };
  const { updateCheckoutInfo, updateLocalInfo, updateSessionsInfo, resetOnDeckInfo } = onDeckActions;

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
