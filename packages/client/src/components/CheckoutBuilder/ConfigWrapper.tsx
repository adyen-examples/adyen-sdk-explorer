import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import BiotechIcon from '@mui/icons-material/Biotech';
import CodeIcon from '@mui/icons-material/Code';
import PublicIcon from '@mui/icons-material/Public';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Grid, Step, StepLabel, Stepper, Typography } from '@mui/material';
import { StepIconProps } from '@mui/material/StepIcon';
import { styled } from '@mui/material/styles';
import type { ActionCreatorWithPayload } from '@reduxjs/toolkit';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { onDeckActions } from '../../app';
import content from '../../helpers/content.json';
import { useAppDispatch, useRedirect } from '../../hooks';
import type { RootState } from '../../store';
import { Config } from './Config';
import { ProfileForm, ReviewForm } from './configSteps';
import { Alerts } from './Alerts';

const { updateProfileInfo, updateCheckoutInfo, updateLocalInfo, updateSessionsInfo } = onDeckActions;

const ColorlibStepIconRoot = styled('div')<{
  ownerState: { completed?: boolean; active?: boolean };
}>(({ theme, ownerState }) => ({
  color: theme.palette.grey[700],
  zIndex: 1,
  height: 50,
  display: 'flex',
  borderRadius: '50%',
  justifyContent: 'center',
  padding: 0,
  margin: 0,
  alignItems: 'center',
  ...((ownerState.active || ownerState.completed) && {
    color: '#0066ff'
  })
}));

export const ConfigWrapper = () => {
  const descriptors = useSelector((state: RootState) => state.descriptors);
  const [activeStep, setActiveStep] = useState(0);
  const steps = ['Profile', 'Global', 'Component', 'API', 'Review'];
  let displayStep;

  const { profile, checkout, local, sessions } = useSelector((state: RootState) => state.onDeck);
  useRedirect({ profile, checkout, local, sessions }, setActiveStep);
  const dispatch = useAppDispatch();
  const updateStore = (value: any, action: ActionCreatorWithPayload<any>): void => {
    dispatch(action(value));
  };

  const { profilePageContent, globalPageContent, localPageContent, apiPageContent, reviewPageContent }: any = content;

  console.log('STORE', JSON.stringify({ profile, checkout, local, sessions }));

  switch (activeStep) {
    case 0:
      displayStep = (
        <ProfileForm
          key="profile"
          configuration={profile}
          step={activeStep}
          setActiveStep={setActiveStep}
          action={updateProfileInfo}
          updateStore={updateStore}
          content={profilePageContent}
        />
      );
      break;
    case 1:
      displayStep = (
        <Config
          key="checkout"
          configuration={checkout}
          descriptors={descriptors.checkout}
          step={activeStep}
          setActiveStep={setActiveStep}
          action={updateCheckoutInfo}
          updateStore={updateStore}
          content={globalPageContent}
        />
      );
      break;
    case 2:
      displayStep = (
        <Config
          key="local"
          configuration={local}
          descriptors={descriptors.local}
          step={activeStep}
          setActiveStep={setActiveStep}
          action={updateLocalInfo}
          updateStore={updateStore}
          content={localPageContent}
        />
      );
      break;
    case 3:
      displayStep = (
        <Config
          key="sessions"
          configuration={sessions}
          descriptors={descriptors.sessions}
          step={activeStep}
          setActiveStep={setActiveStep}
          action={updateSessionsInfo}
          updateStore={updateStore}
          content={apiPageContent}
        />
      );
      break;
    case 4:
      displayStep = (
        <ReviewForm
          key="review"
          step={activeStep}
          setActiveStep={setActiveStep}
          configuration={{ checkout, local, sessions }}
          content={reviewPageContent}
        />
      );
      break;
    case 5:
      displayStep = (
        <Typography variant="h5" gutterBottom>
          Your Checkout is being generated...
        </Typography>
      );
      break;
    default:
      throw new Error('Unknown step');
  }

  const ColorlibStepIcon = (props: StepIconProps) => {
    const { active, completed, className } = props;

    const icons: { [index: string]: React.ReactElement } = {
      1: <AccountCircleIcon />,
      2: <PublicIcon />,
      3: <BiotechIcon />,
      4: <CodeIcon />,
      5: <ShoppingCartIcon />
    };

    return (
      <ColorlibStepIconRoot ownerState={{ completed, active }} className={className}>
        {icons[String(props.icon)]}
      </ColorlibStepIconRoot>
    );
  };

  return (
    <Grid container>
      <Grid item xs={7} mt={4} mb={1}>
        <Stepper activeStep={activeStep}>
          {steps.map(label => (
            <Step key={label}>
              <StepLabel StepIconComponent={ColorlibStepIcon} />
            </Step>
          ))}
        </Stepper>
      </Grid>
      <Grid item xs={8}>
        {displayStep}
      </Grid>
    </Grid>
  );
};
