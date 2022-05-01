import { Fragment, useState } from 'react';
import { useSelector } from 'react-redux';
import { Divider, Typography, Stepper, Step, StepLabel } from '@mui/material';
import { ProfileForm, ReviewForm, NavButtons } from './configSteps';
import { Config } from './Config';
import type { RootState } from '../../store';

export const ConfigWrapper = () => {
  const descriptors = useSelector((state: RootState) => state.descriptors);
  const { global, local, sessions } = useSelector((state: RootState) => state.onDeck);
  const [activeStep, setActiveStep] = useState(0);

  const steps = ['Profile', 'Global Configuration', 'Component Configuration', 'API Configuration', 'Review your config'];

  let displayStep;

  switch (activeStep) {
    case 0:
      displayStep = <ProfileForm step={activeStep} setActiveStep={setActiveStep} />;
      break;
    case 1:
      displayStep = <Config configuration={global} descriptors={descriptors.global} step={activeStep} setActiveStep={setActiveStep} />;
      break;
    case 2:
      displayStep = <Config configuration={local} descriptors={descriptors.local} step={activeStep} setActiveStep={setActiveStep} />;
      break;
    case 3:
      displayStep = <Config configuration={sessions} descriptors={descriptors.sessions} step={activeStep} setActiveStep={setActiveStep} />;
      break;
    case 4:
      displayStep = <ReviewForm step={activeStep} setActiveStep={setActiveStep} />;
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
      <Fragment>
        {activeStep === steps.length ? (
          <Fragment>
            <Typography variant="h5" gutterBottom>
              Your Checkout is being generated...
            </Typography>
          </Fragment>
        ) : (
          <Fragment>{displayStep}</Fragment>
        )}
      </Fragment>
    </Fragment>
  );
};
