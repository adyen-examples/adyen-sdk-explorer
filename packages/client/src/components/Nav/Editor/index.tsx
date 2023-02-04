import { Box, Button, Grid, Typography } from '@mui/material';
import type { ActionCreatorWithPayload } from '@reduxjs/toolkit';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { onDeckActions } from '../../../app';
import { useAppDispatch } from '../../../hooks';
import type { RootState } from '../../../store';
import { NavButtons } from '../../CheckoutBuilder/configSteps';
import { Input } from './Input';
import { Review } from './Review';

interface EditorWrapperProps {
  dimensions: object;
}

export const EditorWrapper = ({ dimensions }: any) => {
  const { buttonHeight, headerHeight, editorWidth } = dimensions;
  const { profile, checkout, local, sessions, sessionsResponse, activeStep } = useSelector((state: RootState) => state.onDeck);
  const configuration: any = { profile, checkout, local, sessions };
  const { steps } = useSelector((state: RootState) => state.sdkExplorer);
  const { updateProfileInfo, updateCheckoutInfo, updateLocalInfo, updateSessionsInfo, updateStep } = onDeckActions;
  const dispatch = useAppDispatch();
  const updateStore = (value: any, action: ActionCreatorWithPayload<any>): void => {
    dispatch(action(value));
  };

  const [viewOnly, setViewOnly] = useState(true);
  const handleEdit = () => {
    setViewOnly(!viewOnly);
  };

  const fixes = {
    checkout: {
      prefix: `
  const checkout = await AdyenCheckout(`,
      postfix: `    );

  checkout.create('${profile.product}', {...});`
    },
    local: {
      prefix: `
  const checkout = await AdyenCheckout({...});
          
  checkout.create('${profile.product}',`,
      postfix: `    );`
    },
    sessions: {
      prefix: `
  Request:`,
      postfix: ''
    }
  };

  let editor = null;
  let step = null;
  let category = null;

  switch (steps[activeStep]) {
    case 'checkout':
      editor = (
        <Input
          data={checkout}
          prefix={fixes.checkout.prefix}
          postfix={fixes.checkout.postfix}
          handleEditorUpdate={(value: any) => {
            updateStore(value, updateCheckoutInfo);
          }}
          viewOnly={viewOnly}
        />
      );
      category = 'Code';
      step = 'checkout';
      break;
    case 'local':
      editor = (
        <Input
          data={local}
          prefix={fixes.local.prefix}
          postfix={fixes.local.postfix}
          handleEditorUpdate={(value: any) => {
            updateStore(value, updateLocalInfo);
          }}
          viewOnly={viewOnly}
        />
      );
      step = 'local';
      category = 'Code';
      break;
    case 'sessions':
      editor = (
        <Input
          data={sessions}
          prefix={fixes.sessions.prefix}
          postfix={fixes.sessions.postfix}
          handleEditorUpdate={(value: any) => {
            updateStore(value, updateSessionsInfo);
          }}
          viewOnly={viewOnly}
        />
      );
      step = 'sessions';
      category = 'API';
      break;
    case 'review':
      editor = <Review data={{ profile, checkout, local, sessions, sessionsResponse }} fixes={fixes} />;
      step = 'review';
      break;
    default:
      throw new Error('Unknown step');
  }

  return (
    <Box>
      <Box
        sx={{
          borderLeft: 2,
          borderColor: 'secondary.light',
          position: 'fixed',
          top: 0,
          right: 0,
          bgcolor: 'primary.light',
          height: `calc(100% - ${headerHeight}px)`,
          mt: `${headerHeight}px`,
          pb: `${buttonHeight}px`,
          width: `${editorWidth}px`,
          display: {
            xs: 'none',
            sm: 'none',
            md: 'block',
            lg: 'block',
            xl: 'block'
          }
        }}
      >
        {category && (
          <Box px={3} py={2} sx={{ backgroundColor: 'secondary.light' }}>
            <Typography variant="h5">{category}</Typography>
          </Box>
        )}
        {editor}
      </Box>
      <Grid container direction="row" justifyContent="space-between" sx={{ position: 'fixed', bottom: 0, right: 0, width: `${editorWidth}px` }} p={1}>
        <Grid
          item
          sx={{
            display: {
              xs: 'none',
              sm: 'none',
              md: 'block'
            }
          }}
        >
          <Button
            onClick={handleEdit}
            sx={{
              display: `${step === 'review' ? 'none' : 'inline-block'}`,
              bgcolor: `${viewOnly ? '#0abf53' : '#ff5722'}`,
              '&:hover': { bgcolor: `${viewOnly ? '#388e3c' : '#bf360c'}` }
            }}
            variant="contained"
          >
            {viewOnly ? 'Edit' : 'View Only'}
          </Button>
        </Grid>
        <Grid item>
          <NavButtons
            steps={steps}
            step={activeStep}
            setActiveStep={updateStep}
            configuration={step === 'review' ? configuration : configuration[step]}
          />
        </Grid>
      </Grid>
    </Box>
  );
};
