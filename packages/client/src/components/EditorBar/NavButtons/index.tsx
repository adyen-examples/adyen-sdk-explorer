import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import { Box, Button, IconButton, Stack, Dialog, DialogContent, Typography, DialogActions } from '@mui/material';
import { onDeckActions } from '../../../app';
import { useAppDispatch } from '../../../hooks';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

type NavButtonsProps = {
  steps: any;
  step: number;
  configuration: any;
};

export const NavButtons = ({ steps, step, configuration }: NavButtonsProps) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { updateCheckoutInfo, updateLocalInfo, updateSessionsInfo, updateRedirectInfo, updateActiveStep, resetOnDeckInfo } = onDeckActions;
  const stepsLength = Object.keys(steps).length;
  const [open, setOpen] = useState(false);

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
      <Stack direction="row" justifyContent="space-between" spacing={1}>
        {step === stepsLength - 1 && (
          <IconButton
            sx={{ py: 0 }}
            onClick={() => {
              setOpen(true);
            }}
          >
            <AutorenewIcon sx={{ fontSize: '25px', fontWeight: 'bolder', color: 'primary.main' }} />
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
        <Box>
          {step !== 0 && (
            <Button
              sx={{ bgcolor: 'primary.light', '&:hover': { bgcolor: 'primary.main', color: 'primary.light' } }}
              variant="outlined"
              onClick={handleBack}
            >
              Back
            </Button>
          )}
          {step !== stepsLength - 1 && (
            <Button sx={{ ml: 0.5 }} variant="contained" onClick={handleNext}>
              Next
            </Button>
          )}
          {step === stepsLength - 1 && (
            <Button sx={{ ml: 0.5, bgcolor: 'rgb(10, 191, 83)', '&:hover': { bgcolor: '#026440' } }} variant="contained" onClick={exportToJson}>
              Export
            </Button>
          )}
        </Box>
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
