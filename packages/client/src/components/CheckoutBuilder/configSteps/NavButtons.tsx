import { Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { onDeckActions } from '../../../app';
import { useAppDispatch } from '../../../hooks';

const { updateProfileInfo, updateCheckoutInfo, updateLocalInfo, updateSessionsInfo, updateRedirectInfo } = onDeckActions;

type NavButtonsProps = {
  step: number;
  configuration: any;
  setActiveStep: (step: number) => void;
};

export const NavButtons = ({ step, setActiveStep, configuration }: NavButtonsProps) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const runStepAction = () => {
    switch (step) {
      case 0:
        return dispatch(updateProfileInfo(configuration));
      case 1:
        return dispatch(updateCheckoutInfo(configuration));
      case 2:
        return dispatch(updateLocalInfo(configuration));
      case 3:
        dispatch(updateRedirectInfo(false));
        return dispatch(updateSessionsInfo(configuration));
      case 4:
        return navigate('dropin', { state: configuration });
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
    <Box sx={{ bgcolor: 'secondary.main' }}>
      {step !== 0 && <Button onClick={handleBack}>Back</Button>}
      {step !== 4 && (
        <Button variant="contained" onClick={handleNext}>
          Next
        </Button>
      )}
      {step === 4 && (
        <Button variant="contained" onClick={exportToJson}>
          Export
        </Button>
      )}
    </Box>
  );
};
