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
import { useState, useEffect } from 'react';
import ApiConfig from './ApiConfig';
import OptionalConfig from './OptionalConfig';
import ProfileForm from './ProfileForm';
import ReviewForm from './ReviewForm';
import { useNavigate } from 'react-router-dom';

const theme = createTheme();

//Create init config class


const CheckoutBuilder = ({ options: { value, currency, countryCode, component }, onSubmit, onChange }: any) => {
  const [activeStep, setActiveStep] = useState(0);
  const [configuration, setConfiguration] = useState({
    name: '',
    product: '',
    checkout_version: '',
    dropin_version: ''
  });

  const steps = ['Profile', 'Optional Configuration', 'API Configuration', 'Review your config'];

  const getStepContent = (step: number) => {
    switch (step) {
      case 0:
        return <ProfileForm configuration={{...configuration}} setConfiguration={setConfiguration} />;
      case 1:
        return <OptionalConfig configuration={{ ...configuration }} setConfiguration={setConfiguration} />;
      case 2:
        return <ApiConfig configuration={{ ...configuration }} setConfiguration={setConfiguration}/>;
      case 3:
        return <ReviewForm configuration={{ ...configuration }}/>;
      default:
        throw new Error('Unknown step');
    }
  };

  useEffect(() => {
    console.log('configuration from base',configuration);
  });
  // const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   onSubmit();
  // };

  // const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   onChange(e);
  // };
  const test: any = useNavigate();
  const handleNext = () => {
    if(activeStep === steps.length - 1){
      test('dropin',{state: {configuration}});
    }
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
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
