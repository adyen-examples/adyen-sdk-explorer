import { Box, Button, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { onDeckActions } from '../../../app';
import { useAppDispatch } from '../../../hooks';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
const { updateProfileInfo, updateCheckoutInfo, updateLocalInfo, updateSessionsInfo, updateRedirectInfo } = onDeckActions;

type NavButtonsProps = {
  steps: any;
  step: number;
  configuration: any;
  setActiveStep: (step: number) => any;
};

export const NavButtons = ({ steps, step, setActiveStep, configuration }: NavButtonsProps) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const stepsLength = Object.keys(steps).length;

  // This is important we are saying that updating redirectinfo to false is always done on sessions, it should be done on step before review
  const runStepAction = () => {
    switch (steps[step]) {
      case 'profile':
        return dispatch(updateProfileInfo(configuration));
      case 'checkout':
        return dispatch(updateCheckoutInfo(configuration));
      case 'local':
        return dispatch(updateLocalInfo(configuration));
      case 'sessions':
        dispatch(updateRedirectInfo(false));
        return dispatch(updateSessionsInfo(configuration));
      default:
        throw new Error('Unknown step');
    }
  };

  const handleNext = () => {
    runStepAction();
    dispatch(setActiveStep(step + 1));
  };

  const handleBack = () => {
    dispatch(setActiveStep(step - 1));
  };

  const downloadJSON = () => {
    alert('Downloading configuration');
  };

  const exportToJson = () => {
    let filename = 'export.json';
    let contentType = 'application/json;charset=utf-8;';
    const nav = window.navigator as any;
    if (nav && nav.msSaveOrOpenBlob) {
      var blob = new Blob([decodeURIComponent(encodeURI(JSON.stringify(configuration)))], { type: contentType });
      nav.msSaveOrOpenBlob(blob, filename);
    } else {
      var a = document.createElement('a');
      a.download = filename;
      a.href = 'data:' + contentType + ',' + encodeURIComponent(JSON.stringify(configuration));
      a.target = '_blank';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  };

  return (
    <Box>
      <Box sx={{ bgcolor: 'primary.light', display: { xs: 'none', md: 'inline-block' } }}>
        {step !== 0 && <Button onClick={handleBack}>Back</Button>}
        {step !== stepsLength - 1 && (
          <Button variant="contained" onClick={handleNext}>
            Next
          </Button>
        )}
        {step === stepsLength - 1 && (
          <Button variant="contained" onClick={exportToJson}>
            Export
          </Button>
        )}
      </Box>
      <Box sx={{ position: 'fixed', bottom: 20, right: 30, display: { xs: 'inline-block', md: 'none' } }}>
        <IconButton sx={{ bgcolor: 'secondary.gray' }} onClick={handleBack}>
          <NavigateBeforeIcon />
        </IconButton>
        <IconButton sx={{ bgcolor: 'secondary.gray' }} onClick={handleNext}>
          <NavigateNextIcon />
        </IconButton>
      </Box>
    </Box>
  );
};
