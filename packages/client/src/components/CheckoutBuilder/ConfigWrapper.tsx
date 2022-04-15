import { Fragment, useState } from 'react';
import { useSelector } from 'react-redux';
import { Divider, Typography, Stepper, Step, StepLabel } from '@mui/material';
import { ProfileForm, EditOptions, ReviewForm, NavButtons } from './configSteps';
import type { RootState } from '../../store';
import type { ConfigTypes } from './types';

export const ConfigWrapper = () => {
  const descriptors = useSelector((state: RootState) => state.descriptor);
  const { optional, sessions } = useSelector((state: RootState) => state.onDeck);
  const [config, setConfig] = useState({ ...optional, sessions });
  const [activeStep, setActiveStep] = useState(0);

  const steps = ['Profile', 'Optional Configuration', 'API Configuration', 'Review your config'];

  const handleUpdateConfig = (key: string, value: {}) => {
    console.log('HANDLE UPDATE CONFIG', key, value);
    setConfig(prevState => ({
      ...prevState,
      [key]: value
    }));
  };

  const getStepContent = (step: number) => {
    switch (step) {
      case 0:
        return <ProfileForm step={step} setActiveStep={setActiveStep} />;
      case 1:
        return (
          <Fragment>
            <EditOptions name={'global'} updateConfig={handleUpdateConfig} section={config.global} descriptors={descriptors.global} />
            <EditOptions name={'local'} updateConfig={handleUpdateConfig} section={config.local} descriptors={descriptors.local} />
            <NavButtons step={step} setActiveStep={setActiveStep} configuration={{ optional: { global: config.global, local: config.local } }} />
          </Fragment>
        );
      case 2:
        return (
          <Fragment>
            <EditOptions name={'sessions'} updateConfig={handleUpdateConfig} section={config.sessions} descriptors={descriptors.sessions} />
            <NavButtons step={step} setActiveStep={setActiveStep} configuration={sessions} />
          </Fragment>
        );
      case 3:
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
