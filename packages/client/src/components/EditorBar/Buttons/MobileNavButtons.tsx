import AutorenewIcon from '@mui/icons-material/Autorenew';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { Box, BoxProps, Button, Dialog, DialogActions, DialogContent, SpeedDial, SpeedDialAction, SpeedDialIcon, Typography } from '@mui/material';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { onDeckActions } from '../../../app';
import { useAppDispatch } from '../../../hooks';
import { RootState } from '../../../store';

interface NavButtonsProps extends BoxProps {
  steps: any;
  step: number;
  configuration: any;
}

export const MobileNavButtons = (props: NavButtonsProps) => {
  const { defaultSessionProps } = useSelector((state: RootState) => state.onDeck);
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

  return (
    <Box {...other}>
      <SpeedDial
        ariaLabel="Mobile navigation buttons"
        sx={{
          position: 'absolute',
          bottom: '2vh',
          right: '0',
          'button.MuiSpeedDial-fab': {
            width: '40px',
            height: '40px',
            bgcolor: 'success.main',
            color: 'primary.light',
            '&:hover': { bgcolor: 'success.main' }
          },
          'button.MuiSpeedDialAction-fab': {
            color: 'success.main'
          }
        }}
        icon={<SpeedDialIcon />}
      >
        {step !== 0 && <SpeedDialAction key="Back" icon={<NavigateBeforeIcon />} tooltipTitle="Back" onClick={handleBack} />}
        {step !== stepsLength - 1 && <SpeedDialAction key="Next" icon={<NavigateNextIcon />} tooltipTitle="Next" onClick={handleNext} />}
        <SpeedDialAction
          key="Reset"
          icon={<AutorenewIcon />}
          tooltipTitle="Reset"
          onClick={() => {
            setOpen(true);
          }}
        />
      </SpeedDial>
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
              dispatch(updateSessionsInfo(defaultSessionProps));
              navigate(`/${configuration.txVariant}`);
            }}
            autoFocus
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};
