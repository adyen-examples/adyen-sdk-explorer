import { Step, StepLabel, Stepper, Typography } from '@mui/material';
import type { ActionCreatorWithPayload } from '@reduxjs/toolkit';
import { Fragment, useState } from 'react';
import { useSelector } from 'react-redux';
import { onDeckActions } from '../../app';
import { useAppDispatch, useRedirect } from '../../hooks';
import type { RootState } from '../../store';
import { Config } from './Config';
import { ProfileForm, ReviewForm } from './configSteps';

const { updateProfileInfo, updateCheckoutInfo, updateLocalInfo, updateSessionsInfo } = onDeckActions;

//TODO[Bug]: Rendering components twice if head to drop-in and hit back

export const ConfigWrapper = () => {
  const descriptors = useSelector((state: RootState) => state.descriptors);
  const [activeStep, setActiveStep] = useState(0);

  const { profile, checkout, local, sessions } = useSelector((state: RootState) => state.onDeck);
  useRedirect({ profile, checkout, local, sessions },setActiveStep); 
  const dispatch = useAppDispatch();
  const updateStore = (value: any, action: ActionCreatorWithPayload<any>): void => {
    dispatch(action(value));
  };

  const steps = ['Profile', 'Global', 'Component', 'API', 'Review'];
  let displayStep;

  console.log('STORE', JSON.stringify({ profile, checkout, local, sessions }));
  
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
          key="checkout"
          configuration={checkout}
          descriptors={descriptors.checkout}
          step={activeStep}
          setActiveStep={setActiveStep}
          action={updateCheckoutInfo}
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
      displayStep = <ReviewForm key="review" step={activeStep} setActiveStep={setActiveStep} configuration={{ checkout, local, sessions }} />;
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
