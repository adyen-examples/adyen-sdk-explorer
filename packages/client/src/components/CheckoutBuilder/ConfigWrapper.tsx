import { Box, Step, StepLabel, Stepper } from '@mui/material';
import { useSelector } from 'react-redux';
import { onDeckActions } from '../../app';
import { useRedirect } from '../../hooks';
import type { RootState } from '../../store';
import { ColorlibStepIcon } from './ColorlibStepIcon';
import { Config } from './Config';
import { ReviewContent } from './configSteps/Content/ReviewContent';

const { updateCheckoutInfo, updateLocalInfo, updateSessionsInfo } = onDeckActions;

export const ConfigWrapper = () => {
  const { checkout, local, sessions, steps, activeStep } = useSelector((state: RootState) => state.onDeck);
  useRedirect({ checkout, local, sessions });
  const stepMap = {
    checkout: <Config name="checkout" configuration={checkout} action={updateCheckoutInfo} />,
    local: <Config name="local" configuration={local} action={updateLocalInfo} />,
    sessions: <Config name="sessions" configuration={sessions} action={updateSessionsInfo} />,
    review: <ReviewContent />
  };

  const displayStep: any = stepMap[steps[activeStep]];
  return (
    <Box>
      <Box sx={{ px: { xs: '15vw', sm: '20vw', md: '10vw', lg: '10vw', xl: '10vw' }, pt: 5 }}>
        <Stepper activeStep={activeStep}>
          {steps.map((label: any) => (
            <Step key={label}>
              <StepLabel
                StepIconProps={{
                  classes: {
                    text: label
                  }
                }}
                StepIconComponent={ColorlibStepIcon}
              />
            </Step>
          ))}
        </Stepper>
      </Box>
      <Box>{displayStep}</Box>
    </Box>
  );
};
