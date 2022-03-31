import { useState, Fragment } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Container, Paper, Step, StepLabel, Stepper, ThemeProvider, Typography, createTheme } from '@mui/material';
import { useApi } from '../../hooks';
import ApiConfig from './ApiConfig';
import OptionalConfig from './OptionalConfig';
import ProfileForm from './ProfileForm';
import ReviewForm from './ReviewForm';

const theme = createTheme();

//Create init config class

const CheckoutBuilder = ({ options: { value, currency, countryCode, component }, onSubmit, onChange }: any) => {
  useApi('http://localhost:8080/configurations', 'GET');
  const test: any = useNavigate();
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
        return <ProfileForm configuration={{ ...configuration }} setConfiguration={setConfiguration} />;
      case 1:
        return <OptionalConfig configuration={{ ...configuration }} setConfiguration={setConfiguration} />;
      case 2:
        return <ApiConfig configuration={{ ...configuration }} setConfiguration={setConfiguration} />;
      case 3:
        return <ReviewForm configuration={{ ...configuration }} />;
      default:
        throw new Error('Unknown step');
    }
  };

  const handleNext = () => {
    if (activeStep === steps.length - 1) {
      test('dropin', { state: { configuration } });
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
          <Fragment>
            {activeStep === steps.length ? (
              <Fragment>
                <Typography variant="h5" gutterBottom>
                  Your Checkout is being generated...
                </Typography>
              </Fragment>
            ) : (
              <Fragment>
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
              </Fragment>
            )}
          </Fragment>
        </Paper>
      </Container>
    </ThemeProvider>
  );
};

export default CheckoutBuilder;
