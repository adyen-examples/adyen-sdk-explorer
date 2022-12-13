import { Button, Grid } from '@mui/material';
import type { ActionCreatorWithPayload } from '@reduxjs/toolkit';
import * as React from 'react';
import { useSelector } from 'react-redux';
import { onDeckActions } from '../../../app';
import { useAppDispatch } from '../../../hooks';
import type { RootState } from '../../../store';
import { NavButtons } from '../../CheckoutBuilder/configSteps';
import { Editor } from '../../CheckoutBuilder/configSteps/Editor';

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
  console.log('Steps: ', steps);
  
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
      break;
    case 'local':
      configuration = local;
      updateConfiguration = (value: any) => {
        updateStore(value, updateLocalInfo);
      };
      break;
    case 'sessions':
      configuration = sessions;
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

  return (
    <Grid
      direction="column"
      justifyContent="space-between"
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
      <Grid item xs={11}>
        <Editor configuration={configuration} handleJsonEditorUpdate={updateConfiguration} />
      </Grid>
      <Grid sx={{ position: 'relative' }} item xs={1}>
        <Grid
          sx={{ height: '100%', position: 'absolute', bottom: '0' }}
          p={1}
          direction="row"
          container
          justifyContent="space-between"
          alignItems="flex-end"
        >
          <Grid item>
            <Button sx={{ bgcolor: '#0abf53' }} variant="contained">
              Edit
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
