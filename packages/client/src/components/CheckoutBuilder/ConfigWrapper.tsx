import { Grid, Step, StepLabel, Stepper } from '@mui/material';
import type { ActionCreatorWithPayload } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import { onDeckActions } from '../../app';
import content from '../../helpers/content.json';
import { useAppDispatch, useRedirect } from '../../hooks';
import type { RootState } from '../../store';
import { ColorlibStepIcon } from './ColorlibStepIcon';
import { Config } from './Config';
import { ProfileForm, ReviewForm } from './configSteps';

const { updateProfileInfo, updateCheckoutInfo, updateLocalInfo, updateSessionsInfo, updateStep } = onDeckActions;

export const ConfigWrapper = ({ txvariant, steps }: any) => {
  const descriptors = useSelector((state: RootState) => state.descriptors);

  const { profile, checkout, local, sessions, activeStep } = useSelector((state: RootState) => state.onDeck);
  useRedirect({ profile, checkout, local, sessions }, updateStep);
  const dispatch = useAppDispatch();
  const updateStore = (value: any, action: ActionCreatorWithPayload<any>): void => {
    dispatch(action(value));
  };

  const { profilePageContent, globalPageContent, localPageContent, apiPageContent, reviewPageContent }: any = content;

  console.info('STORE', JSON.stringify({ profile, checkout, local, sessions }));
  
  let displayStep;
  const stepMap: any = {
    profile: (
      <ProfileForm
        key="profile"
        configuration={profile}
        step={activeStep}
        setActiveStep={updateStep}
        action={updateProfileInfo}
        updateStore={updateStore}
        content={profilePageContent}
      />
    ),
    checkout: (
      <Config
        key="checkout"
        configuration={checkout}
        descriptors={descriptors.checkout}
        step={activeStep}
        setActiveStep={updateStep}
        action={updateCheckoutInfo}
        updateStore={updateStore}
        content={globalPageContent}
      />
    ),
    local: (
      <Config
        key="local"
        configuration={local}
        descriptors={descriptors.local}
        step={activeStep}
        setActiveStep={updateStep}
        action={updateLocalInfo}
        updateStore={updateStore}
        content={localPageContent}
      />
    ),
    sessions: (
      <Config
        key="sessions"
        configuration={sessions}
        descriptors={descriptors.sessions}
        step={activeStep}
        setActiveStep={updateStep}
        action={updateSessionsInfo}
        updateStore={updateStore}
        content={apiPageContent}
      />
    ),
    review: (
      <ReviewForm
        key="review"
        step={activeStep}
        setActiveStep={updateStep}
        configuration={{ checkout, local, sessions }}
        content={reviewPageContent}
      />
    )
  };

  displayStep = stepMap[steps[activeStep]];

  return (
    <Grid container direction="column" justifyContent="flex-start" alignItems="center" mb={1} mt={4}>
      <Grid item xs={1} sx={{ width: '65%' }}>
        <Stepper activeStep={activeStep}>
          {steps.map((label: any) => (
            <Step key={label}>
              <StepLabel StepIconComponent={ColorlibStepIcon} />
            </Step>
          ))}
        </Stepper>
      </Grid>
      <Grid px={3} item xs={11}>
        {displayStep}
      </Grid>
    </Grid>
  );
};
