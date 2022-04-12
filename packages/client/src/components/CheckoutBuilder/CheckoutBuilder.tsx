import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Stepper from '@mui/material/Stepper';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ApiConfig from './ApiConfig';
import BaseConfiguration from './BaseConfiguration';
import OptionalConfig from './OptionalConfig';
import ProfileForm from './ProfileForm';
import ReviewForm from './ReviewForm';

const theme = createTheme();

const CheckoutBuilder = ({ options: { value, currency, countryCode, component }, onSubmit, onChange }: any) => {
  const [activeStep, setActiveStep] = useState(0);
  const [baseConfiguration, setBaseConfiguration] = useState(
    {configuration : new BaseConfiguration()}
  );
  const navigate: any = useNavigate();

  useEffect(() => {
    console.log('BaseConfiguration', baseConfiguration);
  });

  const handleNext = () => {
    if (activeStep === steps.length - 1) {
      navigate('dropin', { state: baseConfiguration });
    }
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const steps = ['Profile', 'Optional Configuration', 'API Configuration', 'Review your config'];
  const getStepContent = (step: number) => {
    switch (step) {
      case 0:
        return <ProfileForm baseConfiguration={baseConfiguration} setBaseConfiguration={setBaseConfiguration} />;
      case 1:
        return <OptionalConfig baseConfiguration={baseConfiguration} setBaseConfiguration={setBaseConfiguration} />;
      case 2:
      return <ApiConfig baseConfiguration={baseConfiguration} setBaseConfiguration={setBaseConfiguration} />;
      case 3:
        return <ReviewForm baseConfiguration={baseConfiguration} />;
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
          <React.Fragment>
            {activeStep === steps.length ? (
              <React.Fragment>
                <Typography variant="h5" gutterBottom>
                  Your Checkout is being generated...
                </Typography>
              </React.Fragment>
            ) : (
              <React.Fragment>
                {getStepContent(activeStep)}
                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                  {activeStep !== 0 && (
                    <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                      Back
                    </Button>
                  )}
                  <Button variant="contained" onClick={handleNext} sx={{ mt: 3, ml: 1 }}>
                    {activeStep === steps.length - 1 ? 'Build Checkout' : 'Next'}
                  </Button>
                </Box>
              </React.Fragment>
            )}
          </React.Fragment>
        </Paper>
      </Container>
    </ThemeProvider>
  );
};

export default CheckoutBuilder;
