import AutorenewIcon from '@mui/icons-material/Autorenew';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { Box, BoxProps, Button, Dialog, DialogActions, DialogContent, IconButton, Stack, Typography } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { onDeckActions } from '../../../app';
import { useAppDispatch } from '../../../hooks';

interface NavButtonsProps extends BoxProps {
  steps: any;
  step: number;
  configuration: any;
}

export const NavButtons = (props: NavButtonsProps) => {
  const { steps, step, configuration, ...other } = props;
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { updateCheckoutInfo, updateLocalInfo, updateSessionsInfo, updateRedirectInfo, updateActiveStep, resetOnDeckInfo } = onDeckActions;
  const stepsLength = Object.keys(steps).length;
  const [open, setOpen] = useState(false);

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
    <Box {...other}>
      <Stack direction="row" justifyContent="space-between" spacing={1}>
        {step === stepsLength - 1 && (
          <IconButton
            id="reset-button"
            onClick={() => {
              setOpen(true);
            }}
          >
            <AutorenewIcon id="reset-button-icon" />
          </IconButton>
        )}
        <Dialog
          open={open}
          onClick={() => {
            setOpen(false);
          }}
        >
          <DialogContent>
            <Typography variant="h6">Are you sure you want to reset the configuration? All changes will be lost.</Typography>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => {
                setOpen(false);
              }}
            >
              No
            </Button>
            <Button
              onClick={() => {
                setOpen(false);
                dispatch(resetOnDeckInfo());
                navigate(`/${configuration.txVariant}`);
              }}
              autoFocus
            >
              Yes
            </Button>
          </DialogActions>
        </Dialog>
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
      <Box id="mobile-nav">
        <IconButton id="mobile-nav-buttons" onClick={handleBack}>
          <NavigateBeforeIcon />
        </IconButton>
        <IconButton id="mobile-nav-buttons" onClick={handleNext}>
          <NavigateNextIcon />
        </IconButton>
      </Box>
    </Box>
  );
};
