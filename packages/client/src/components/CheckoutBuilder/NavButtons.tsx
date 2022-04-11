import { useNavigate } from 'react-router-dom';
import { Box, Button } from '@mui/material';
import { onDeckActions } from '../../app';
import { useAppDispatch } from '../../hooks';

const { updateProfileInfo, updateOptionalInfo, updateSessionsInfo } = onDeckActions;

type NavButtonsProps = {
  step: number;
  configuration: any;
  setActiveStep: (step: number) => void;
};

export const NavButtons = ({ step, setActiveStep, configuration }: NavButtonsProps) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  console.log('NAV BUTTON CONFIG', configuration);

  const runStepAction = () => {
    switch (step) {
      case 0:
        return dispatch(updateProfileInfo(configuration));
      case 1:
        return dispatch(updateOptionalInfo(configuration));
      case 2:
        return dispatch(updateSessionsInfo(configuration));
      case 3:
        return navigate('dropin');
      default:
        throw new Error('Unknown step');
    }
  };

  const handleNext = () => {
    runStepAction();
    setActiveStep(step + 1);
  };

  const handleBack = () => {
    setActiveStep(step - 1);
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
      {step !== 0 && (
        <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
          Back
        </Button>
      )}
      <Button variant="contained" onClick={handleNext} sx={{ mt: 3, ml: 1 }}>
        {step === 3 ? 'Build Checkout' : 'Next'}
      </Button>
    </Box>
  );
};
