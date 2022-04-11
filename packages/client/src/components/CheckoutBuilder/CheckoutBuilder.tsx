import { useState, Fragment } from 'react';
import { useSelector } from 'react-redux';
import { Container, Paper, Step, StepLabel, Stepper, ThemeProvider, Typography, createTheme } from '@mui/material';
import { useApi } from '../../hooks';
import ApiConfig from './ApiConfig';
import OptionalConfig from './OptionalConfig';
import ProfileForm from './ProfileForm';
import ReviewForm from './ReviewForm';
import type { RootState } from '../../store';

const theme = createTheme();

//Create init config class

const CheckoutBuilder = ({ options: { value, currency, countryCode, component }, onSubmit, onChange }: any) => {
  useApi('http://localhost:8080/configurations', 'GET');
  const [activeStep, setActiveStep] = useState(0);
  const { global, local, sessions } = useSelector((state: RootState) => state.descriptor);

  const steps = ['Profile', 'Optional Configuration', 'API Configuration', 'Review your config'];

  const getStepContent = (step: number) => {
    switch (step) {
      case 0:
        return <ProfileForm step={step} setActiveStep={setActiveStep} />;
      case 1:
        return <OptionalConfig step={step} setActiveStep={setActiveStep} descriptors={[global, local]} />;
      case 2:
        return <ApiConfig step={step} setActiveStep={setActiveStep} descriptors={[sessions]} />;
      case 3:
        return <ReviewForm step={step} setActiveStep={setActiveStep} />;
      default:
        throw new Error('Unknown step');
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="lg" sx={{ mb: 2 }}>
        <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
          <Typography component="h1" variant="h4" align="center">
            Checkout Builder
          </Typography>
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
        </Paper>
      </Container>
    </ThemeProvider>
  );
};

export default CheckoutBuilder;
