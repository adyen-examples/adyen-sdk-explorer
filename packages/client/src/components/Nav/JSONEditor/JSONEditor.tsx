import { Button, Grid, Box } from '@mui/material';
import type { ActionCreatorWithPayload } from '@reduxjs/toolkit';
import * as React from 'react';
import { useSelector } from 'react-redux';
import { onDeckActions } from '../../../app';
import { useAppDispatch } from '../../../hooks';
import type { RootState } from '../../../store';
import { NavButtons } from '../../CheckoutBuilder/configSteps';
import { Editor } from '../../CheckoutBuilder/configSteps/Editor';
import { useEffect, useState } from 'react';

export const JSONEditor = ({ headerHeight, editorWidth }: any) => {
  const { profile, checkout, local, sessions, activeStep } = useSelector((state: RootState) => state.onDeck);
  const { steps } = useSelector((state: RootState) => state.sdkExplorer);
  const { updateProfileInfo, updateCheckoutInfo, updateLocalInfo, updateSessionsInfo, updateStep } = onDeckActions;
  const dispatch = useAppDispatch();
  const updateStore = (value: any, action: ActionCreatorWithPayload<any>): void => {
    dispatch(action(value));
  };

  let configuration: any = null;
  let updateConfiguration: any = null;
  let codePrefix = null;
  let codePostfix = null;

  const [viewOnly, setViewOnly] = useState(true);
  const handleEdit = () => {
    console.log('handlEdit called');
    
    setViewOnly(!viewOnly);
  };

  switch (steps[activeStep]) {
    case 'profile':
      configuration = profile;
      updateConfiguration = (value: any) => {
        updateStore(value, updateProfileInfo);
      };
      break;
    case 'checkout':
      configuration = checkout;
      updateConfiguration = (value: any) => {
        updateStore(value, updateCheckoutInfo);
      };
      codePrefix = `
    const checkout = await AdyenCheckout(`;
      codePostfix = `    );
 
    checkout.create('${profile.product}', {...});`;
      break;
    case 'local':
      configuration = local;
      updateConfiguration = (value: any) => {
        updateStore(value, updateLocalInfo);
      };
      codePrefix = `
    const checkout = await AdyenCheckout({...});
      
    checkout.create('${profile.product}',`;
      codePostfix = `    );`;
      break;
    case 'sessions':
      configuration = sessions;
      codePrefix = `
      Request:`;
      updateConfiguration = (value: any) => {
        updateStore(value, updateSessionsInfo);
      };
      break;
    case 'review':
      configuration = { checkout, local, sessions };
      updateConfiguration = (value: any) => {
        console.error('Updating from review');
      };
      break;
    default:
      console.log('activeStep');
      throw new Error('Unknown step');
  }
  console.log('profile, ', profile);

  return (
    <Grid
      direction="column"
      justifyContent="flex-start"
      alignItems="stretch"
      container
      sx={{
        position: 'fixed',
        top: 0,
        right: 0,
        bgcolor: 'secondary.main',
        height: `calc(100% - ${headerHeight}px)`,
        mt: `${headerHeight}px`,
        width: `${editorWidth}px`
      }}
    >
      {codePrefix && (
        <Grid item xs="auto">
          <Box sx={{ color: 'white' }}>
            <pre style={{ marginTop: '0px', marginBottom: '0px' }}>
              <code style={{ fontSize: '13px' }}>{codePrefix}</code>
            </pre>
          </Box>
        </Grid>
      )}
      <Grid item xs="auto">
        <Editor viewOnly={viewOnly} configuration={configuration} handleJsonEditorUpdate={updateConfiguration} />
      </Grid>
      {codePostfix && (
        <Grid item xs="auto">
          <Box sx={{ color: 'white' }}>
            <pre style={{ marginTop: '0px', marginBottom: '0px' }}>
              <code style={{ fontSize: '13px' }}>{codePostfix}</code>
            </pre>
          </Box>
        </Grid>
      )}
      <Grid sx={{ position: 'relative' }} item xs>
        <Grid
          sx={{ height: '100%', position: 'absolute', bottom: '0' }}
          p={1}
          direction="row"
          container
          justifyContent="space-between"
          alignItems="flex-end"
        >
          <Grid item>
            <Button onClick={handleEdit} sx={{ bgcolor: `${viewOnly ? '#0abf53' : '#ff5722'}` }} variant="contained">
              {viewOnly ? 'Edit' : 'View Only'}
            </Button>
          </Grid>
          <Grid item>
            <NavButtons steps={steps} step={activeStep} setActiveStep={updateStep} configuration={configuration} />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};
