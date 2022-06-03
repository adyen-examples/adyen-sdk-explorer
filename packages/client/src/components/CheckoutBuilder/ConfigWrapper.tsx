import { Fragment, useState } from 'react';
import { useSelector } from 'react-redux';
import { Divider, Typography, Stepper, Step, StepLabel } from '@mui/material';
import { ProfileForm, ReviewForm } from './configSteps';
import { Config } from './Config';
import { useAppDispatch } from '../../hooks';
import { onDeckActions } from '../../app';
import type { ActionCreatorWithPayload } from '@reduxjs/toolkit';
import type { RootState } from '../../store';
import type { OnDeckState } from '../../app/types';

const { updateProfileInfo, updateGlobalInfo, updateLocalInfo, updateSessionsInfo } = onDeckActions;

//TODO[Bug]: Rendering components twice if head to drop-in and hit back

export const ConfigWrapper = () => {
  const descriptors = useSelector((state: RootState) => state.descriptors);
  const { profile, global, local, sessions } = useSelector((state: RootState) => state.onDeck);
  const [activeStep, setActiveStep] = useState(0);

  const dispatch = useAppDispatch();

  const updateStore = (value: any, action: ActionCreatorWithPayload<any>): void => {
    dispatch(action(value));
  };

  const steps = ['Profile', 'Global Configuration', 'Component Configuration', 'API Configuration', 'Review your config'];

  let displayStep;

  switch (activeStep) {
    case 0:
      displayStep = (
        <ProfileForm
          key="profile"
          configuration={profile}
          step={activeStep}
          setActiveStep={setActiveStep}
          action={updateProfileInfo}
          updateStore={updateStore}
        />
      );
      break;
    case 1:
      displayStep = (
        <Config
          key="global"
          configuration={global}
          descriptors={descriptors.global}
          step={activeStep}
          setActiveStep={setActiveStep}
          action={updateGlobalInfo}
          updateStore={updateStore}
        />
      );
      break;
    case 2:
      displayStep = (
        <Config
          key="local"
          configuration={local}
          descriptors={descriptors.local}
          step={activeStep}
          setActiveStep={setActiveStep}
          action={updateLocalInfo}
          updateStore={updateStore}
        />
      );
      break;
    case 3:
      displayStep = (
        <Config
          key="sessions"
          configuration={sessions}
          descriptors={descriptors.sessions}
          step={activeStep}
          setActiveStep={setActiveStep}
          action={updateSessionsInfo}
          updateStore={updateStore}
        />
      );
      break;
    case 4:
      displayStep = <ReviewForm key="review" step={activeStep} setActiveStep={setActiveStep} configuration={{ global, local, sessions }} />;
      break;
    case 5:
      displayStep = (
        <Typography variant="h5" gutterBottom>
          Your Checkout is being generated...
        </Typography>
      );
      break;
    default:
      throw new Error('Unknown step');
  }

  return (
    <Fragment>
      <Typography variant="h6">{steps[activeStep]}</Typography>
      <Divider />
      <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
        {steps.map(label => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      {displayStep}
    </Fragment>
  );
};
