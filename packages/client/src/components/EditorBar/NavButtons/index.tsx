import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { Box, Button, IconButton, Stack } from '@mui/material';
import { onDeckActions } from '../../../app';
import { useAppDispatch } from '../../../hooks';

type NavButtonsProps = {
  steps: any;
  step: number;
  configuration: any;
};

export const NavButtons = ({ steps, step, configuration }: NavButtonsProps) => {
  const dispatch = useAppDispatch();
  const { updateCheckoutInfo, updateLocalInfo, updateSessionsInfo, updateRedirectInfo, updateActiveStep } = onDeckActions;
  const stepsLength = Object.keys(steps).length;

  // This is important we are saying that updating redirectinfo to false is always done on sessions, it should be done on step before review
  const runStepAction = () => {
    switch (steps[step]) {
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
    dispatch(updateActiveStep(step + 1));
  };

  const handleBack = () => {
    dispatch(updateActiveStep(step - 1));
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
      <Stack spacing={1} direction="row" sx={{ background: 'transparent', display: { xs: 'none', md: 'inline-block' } }}>
        {step !== 0 && (
          <Button sx={{ bgcolor: 'primary.light', '&:hover': { bgcolor: 'primary.main', color: 'primary.light' } }} variant="outlined" onClick={handleBack}>
            Back
          </Button>
        )}
        {step !== stepsLength - 1 && (
          <Button variant="contained" onClick={handleNext}>
            Next
          </Button>
        )}
        {step === stepsLength - 1 && (
          <Button sx={{ bgcolor: '#ff5722', '&:hover': { bgcolor: '#8B4000' } }} variant="contained" onClick={exportToJson}>
            Export
          </Button>
        )}
      </Stack>
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
