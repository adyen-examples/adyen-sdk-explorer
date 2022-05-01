import { Fragment, useState } from 'react';
import { useSelector } from 'react-redux';
import { Divider, Typography, Stepper, Step, StepLabel } from '@mui/material';
import { ProfileForm, ReviewForm, NavButtons } from './configSteps';
import { Config } from './Config';
import type { RootState } from '../../store';
import type { ConfigTypes } from './types';

export const ConfigWrapper = () => {
  const descriptors = useSelector((state: RootState) => state.descriptor);
  const { global, local, sessions } = useSelector((state: RootState) => state.onDeck);
  const [activeStep, setActiveStep] = useState(0);

  const steps = ['Profile', 'Global Configuration', 'Component Configuration', 'API Configuration', 'Review your config'];

  const getStepContent = (step: number) => {
    switch (step) {
      case 0:
        return <ProfileForm step={step} setActiveStep={setActiveStep} />;
      case 1:
        return <Config configuration={global} descriptors={descriptors.global} step={step} setActiveStep={setActiveStep} />;
      case 2:
        return <Config configuration={local} descriptors={descriptors.local} step={step} setActiveStep={setActiveStep} />;
      case 3:
        return <Config configuration={sessions} descriptors={descriptors.sessions} step={step} setActiveStep={setActiveStep} />;
      case 4:
        return <ReviewForm step={step} setActiveStep={setActiveStep} />;
      default:
        throw new Error('Unknown step');
    }
  };

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
      <Fragment>
        {activeStep === steps.length ? (
          <Fragment>
            <Typography variant="h5" gutterBottom>
              Your Checkout is being generated...
            </Typography>
          </Fragment>
        ) : (
          <Fragment>{getStepContent(activeStep)}</Fragment>
        )}
      </Fragment>
    </Fragment>
  );
};
