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
  let codePrefix: any = null;
  let codePostfix: any = null;
  let codeSnippets: any = null;
  let step: any = null;

  const [viewOnly, setViewOnly] = useState(true);
  const handleEdit = () => {
    setViewOnly(!viewOnly);
  };

  const codeBlock = (prefix: string, postfix: string, configurationBlock: any) => (
    <Box>
      <Grid item xs="auto">
        <Box sx={{ color: 'white' }}>
          <pre style={{ marginTop: '0px', marginBottom: '0px' }}>
            <code style={{ fontSize: '13px' }}>{prefix}</code>
          </pre>
        </Box>
      </Grid>
      <Grid item xs="auto">
        <Editor viewOnly={viewOnly} configuration={configurationBlock} handleJsonEditorUpdate={updateConfiguration} />
      </Grid>
      <Grid item xs="auto">
        <Box sx={{ color: 'white' }}>
          <pre style={{ marginTop: '0px', marginBottom: '0px' }}>
            <code style={{ fontSize: '13px' }}>{postfix}</code>
          </pre>
        </Box>
      </Grid>
    </Box>
  );

  switch (steps[activeStep]) {
    case 'profile':
      configuration = { profile };
      updateConfiguration = (value: any) => {
        updateStore(value, updateProfileInfo);
      };
      step = 'profile';
      break;
    case 'checkout':
      configuration = { checkout };
      updateConfiguration = (value: any) => {
        updateStore(value, updateCheckoutInfo);
      };
      codeSnippets = {
        checkout: {
          prefix: `
    const checkout = await AdyenCheckout(`,
          postfix: `    );
 
    checkout.create('${profile.product}', {...});`
        }
      };
      step = 'checkout';
      break;
    case 'local':
      configuration = { local };
      updateConfiguration = (value: any) => {
        updateStore(value, updateLocalInfo);
      };
      codeSnippets = {
        local: {
          prefix: `
    const checkout = await AdyenCheckout({...});
            
    checkout.create('${profile.product}',`,
          postfix: `    );`
        }
      };
      step = 'local';
      break;
    case 'sessions':
      configuration = { sessions };
      updateConfiguration = (value: any) => {
        updateStore(value, updateSessionsInfo);
      };
      codeSnippets = {
        sessions: {
          prefix: `
    Request:`,
          postfix: ``
        }
      };
      step = 'sessions';
      break;
    case 'review':
      configuration = { checkout, local, sessions };
      codeSnippets = {
        checkout: {
          prefix: `
    const checkout = await AdyenCheckout(`,
          postfix: `    );`
        },
        local: {
          prefix: `
    checkout.create('${profile.product}',`,
          postfix: `    );`
        },
        sessions: {
          prefix: `
    Request:`,
          postfix: `    Response:`
        }
      };
      step = 'review';
      break;
    default:
      throw new Error('Unknown step');
  }

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
      {codeSnippets &&
        Object.entries(codeSnippets).map(([key, value]: any) => {
          return codeBlock(value.prefix, value.postfix, configuration[key]);
        })}
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
            <Button
              onClick={handleEdit}
              sx={{
                display: `${step === 'review' ? 'none' : 'inline-flex'}`,
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
      </Grid>
    </Grid>
  );
};
