import { Grid, Step, StepLabel, Stepper } from '@mui/material';
import { useSelector } from 'react-redux';
import { onDeckActions } from '../../app';
import { useAppDispatch, useRedirect } from '../../hooks';
import { ColorlibStepIcon } from './ColorlibStepIcon';
import { Config } from './Config';
import { ProfileForm, ReviewForm } from './configSteps';
import { profilePageContent, globalPageContent, localPageContent, apiPageContent, reviewPageContent } from './helpers/content';
import type { RootState } from '../../store';

export const ConfigWrapper = () => {
  const { steps } = useSelector((state: RootState) => state.sdkExplorer);
  const onDeck = useSelector((state: RootState) => state.onDeck);

  const { profile, checkout, local, sessions, activeStep } = onDeck;
  useRedirect({ checkout, local, sessions });

  let displayStep;
  const stepMap: any = {
    profile: <ProfileForm key="profile" content={profilePageContent} configuration={profile} />,
    checkout: <Config name="checkout" content={globalPageContent} configuration={checkout} />,
    local: <Config name="local" content={localPageContent} configuration={local} />,
    sessions: <Config name="sessions" content={apiPageContent} configuration={sessions} />,
    review: <ReviewForm key="review" configuration={{ checkout, local, sessions }} content={reviewPageContent} />
  };

  displayStep = stepMap[steps[activeStep]];

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
