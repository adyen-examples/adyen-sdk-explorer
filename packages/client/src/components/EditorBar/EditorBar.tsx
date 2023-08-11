import LockIcon from '@mui/icons-material/Lock';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import { Box, IconButton } from '@mui/material';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '../../store';
import { DesktopNavButtons } from './Buttons/DesktopNavButtons';
import { MobileNavButtons } from './Buttons/MobileNavButtons';
import { ResetButton } from './Buttons/ResetButton';
import { MultiTab } from './Tabs/MultiTab';
import { SingleTab } from './Tabs/SingleTab';

interface EditorDimensions {
  buttonHeight: number;
  headerHeight: number;
  editorWidth: number;
}

interface EditorWrapperProps {
  dimensions: EditorDimensions;
}

export const EditorBar = ({ dimensions }: EditorWrapperProps) => {
  const { buttonHeight, headerHeight, editorWidth } = dimensions;
  const { txVariant, checkout, local, sessions, activeStep, steps, adyenState } = useSelector((state: RootState) => state.onDeck);
  const configuration: any = { checkout, local, sessions };
  let step = steps[activeStep];
  const [viewOnly, setViewOnly] = useState(true);

  let desktopStyle = {
    position: 'fixed',
    top: `${headerHeight}px`,
    bottom: `${buttonHeight}px`,
    right: 0,
    borderLeft: 2,
    borderColor: 'secondary.light',
    bgcolor: 'primary.light',
    color: 'secondary.main',
    height: `calc(100% - ${headerHeight}px - ${buttonHeight}px)`,
    maxHeight: `calc(100% - ${headerHeight}px - ${buttonHeight}px)`,
    display: {
      xs: 'none',
      sm: 'none',
      md: 'flex',
      lg: 'flex',
      xl: 'flex'
    },
    flexDirection: 'column',
    width: `${editorWidth}px`,
    '#icon-button': {
      color: 'success.main'
    },
    '#desktop-button-container': {
      position: 'fixed',
      height: `${buttonHeight}px`,
      bottom: 0,
      right: 0,
      width: `${editorWidth}px`,
      bgcolor: 'background.default',
      color: 'secondary.main',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderLeft: 2,
      borderTop: 2,
      borderColor: 'secondary.light',
      pl: 1,
      pr: 2
    }
  };

  const mobileStyle = {
    position: 'fixed',
    bottom: 0,
    right: 0,
    display: { xs: 'inline-block', md: 'none' },
    bgcolor: 'primary.light',
    color: 'secondary.gray',
    alignItems: 'center',
    px: 1
  };

  const handleEdit = () => {
    setViewOnly(!viewOnly);
  };

  return (
    <Box>
      <Box sx={desktopStyle}>
        {(step === 'checkout' || step === 'local' || step === 'sessions') && (
          <SingleTab viewOnly={viewOnly} step={step} txVariant={txVariant} checkout={checkout} local={local} sessions={sessions} />
        )}
        {step === 'review' && <MultiTab txVariant={txVariant} checkout={checkout} local={local} adyenState={adyenState} />}
        <Box id="desktop-button-container">
          {step !== 'review' && (
            <IconButton id="icon-button" onClick={handleEdit}>
              {viewOnly ? <LockIcon /> : <LockOpenIcon />}
            </IconButton>
          )}
          {step === 'review' && <ResetButton steps={steps} step={activeStep} configuration={configuration} txVariant={txVariant} />}
          <DesktopNavButtons steps={steps} step={activeStep} configuration={step === 'review' ? configuration : configuration[step]} />
        </Box>
      </Box>
      <Box sx={mobileStyle}>
        <MobileNavButtons
          steps={steps}
          txVariant={txVariant}
          step={activeStep}
          configuration={step === 'review' ? configuration : configuration[step]}
        />
      </Box>
    </Box>
  );
};
