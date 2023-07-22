import { Box, BoxProps, Button, Stack } from '@mui/material';
import { onDeckActions } from '../../../app';
import { useAppDispatch } from '../../../hooks';

interface NavButtonsProps extends BoxProps {
  steps: any;
  step: number;
  configuration: any;
}

export const DesktopNavButtons = (props: NavButtonsProps) => {
  const { steps, step, configuration, ...other } = props;
  const dispatch = useAppDispatch();
  const { updateCheckoutInfo, updateLocalInfo, updateSessionsInfo, updateRedirectInfo, updateActiveStep } = onDeckActions;
  const stepsLength = Object.keys(steps).length;

  const style = {
    '#desktop-nav': {
      display: 'inline-block'
    },
    '#back-button': { bgcolor: 'primary.light', '&:hover': { bgcolor: 'primary.main', color: 'primary.light' } },
    '#next-button': { ml: 0.5, '&:hover': { bgcolor: 'primary.main', color: 'primary.light' } },
    '#export-button': { ml: 0.5, bgcolor: 'success.main', '&:hover': { bgcolor: 'primary.light', color: 'success.main' } }
  };

  const runStepAction = () => {
    switch (steps[step]) {
      case 'checkout':
        return dispatch(updateCheckoutInfo(configuration));
      case 'local':
        return dispatch(updateLocalInfo(configuration));
      case 'sessions':
        return dispatch(updateSessionsInfo(configuration));
      case 'review':
        return dispatch(updateRedirectInfo(false));
      default:
        throw new Error('Unknown step');
    }
  };

  const handleNext = () => {
    runStepAction();
    dispatch(updateActiveStep(step + 1));
  };

  const handleBack = () => {
    runStepAction();
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
    <Box sx={style} {...other}>
      <Stack direction="row" justifyContent="space-between" spacing={1}>
        <Box id="desktop-nav">
          {step !== 0 && (
            <Button id="back-button" variant="outlined" onClick={handleBack}>
              Back
            </Button>
          )}
          {step !== stepsLength - 1 && (
            <Button id="next-button" variant="contained" onClick={handleNext}>
              Next
            </Button>
          )}
          {step === stepsLength - 1 && (
            <Button id="export-button" variant="contained" onClick={exportToJson}>
              Export
            </Button>
          )}
        </Box>
      </Stack>
    </Box>
  );
};
