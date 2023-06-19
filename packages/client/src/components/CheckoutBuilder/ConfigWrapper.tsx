import { Grid, Step, StepLabel, Stepper } from '@mui/material';
import { useSelector } from 'react-redux';
import { onDeckActions } from '../../app';
import { useRedirect } from '../../hooks';
import { ColorlibStepIcon } from './ColorlibStepIcon';
import { Config } from './Config';
import { ProfileForm, ReviewForm } from './configSteps';
import { profilePageContent, globalPageContent, localPageContent, apiPageContent, reviewPageContent } from './helpers/content';
import type { RootState } from '../../store';

const { updateCheckoutInfo, updateLocalInfo, updateSessionsInfo } = onDeckActions;

export const ConfigWrapper = () => {
  const { profile, checkout, local, sessions, steps, activeStep } = useSelector((state: RootState) => state.onDeck);
  useRedirect({ checkout, local, sessions });

  const stepMap = {
    profile: <ProfileForm key="profile" content={profilePageContent} configuration={profile} />,
    checkout: <Config name="checkout" content={globalPageContent} configuration={checkout} action={updateCheckoutInfo} />,
    local: <Config name="local" content={localPageContent} configuration={local} action={updateLocalInfo} />,
    sessions: <Config name="sessions" content={apiPageContent} configuration={sessions} action={updateSessionsInfo} />,
    review: <ReviewForm key="review" configuration={{ checkout, local, sessions }} content={reviewPageContent} />
  };

  const displayStep: any = stepMap[steps[activeStep]];
  return (
    <Grid container direction="column" justifyContent="flex-start" alignItems="center" mb={1} mt={4}>
      <Grid item xs={1} sx={{ width: '65%' }}>
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
      </Grid>
      <Grid item xs={11}>
        {displayStep}
      </Grid>
    </Grid>
  );
};
