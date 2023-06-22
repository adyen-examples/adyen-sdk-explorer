import LockIcon from '@mui/icons-material/Lock';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import { Box, Grid, IconButton } from '@mui/material';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '../../store';
import { NavButtons } from './NavButtons';
import { MultiTab } from './Tabs/MultiTab';
import { SingleTab } from './Tabs/SingleTab';

interface EditorDimensions {
  buttonHeight: number;
  headerHeight: number;
  editorWidth: number;
}

interface EditorWrapperProps {
  dimensions: EditorDimensions;
  steps: any;
}

export const EditorBar = ({ dimensions, steps }: EditorWrapperProps) => {
  const { buttonHeight, headerHeight, editorWidth } = dimensions;
  const { txVariant, checkout, local, sessions, activeStep, adyenState } = useSelector((state: RootState) => state.onDeck);
  const configuration: any = { txVariant, checkout, local, sessions };

  let step = steps[activeStep];

  let style = {
    position: 'fixed',
    overflow: 'scroll',
    top: 0,
    right: 0,
    borderLeft: 2,
    borderColor: 'secondary.light',
    bgcolor: 'primary.light',
    color: 'secondary.main',
    height: `calc(100% - ${headerHeight}px)`,
    mt: `${headerHeight}px`,
    pb: `${buttonHeight}px`,
    width: `${editorWidth}px`,
    display: {
      xs: 'none',
      sm: 'none',
      md: 'block',
      lg: 'block',
      xl: 'block'
    }
  };

  const [viewOnly, setViewOnly] = useState(true);

  const handleEdit = () => {
    setViewOnly(!viewOnly);
  };

  return (
    <Box>
      <Box sx={style}>
        {(step === 'checkout' || step === 'local' || step === 'sessions') && (
          <SingleTab viewOnly={viewOnly} step={step} txVariant={txVariant} checkout={checkout} local={local} sessions={sessions} />
        )}
        {step === 'review' && <MultiTab txVariant={txVariant} checkout={checkout} local={local} adyenState={adyenState} />}
      </Box>
      <Grid container direction="row" justifyContent="space-between" sx={{ position: 'fixed', bottom: 0, right: 0, width: `${editorWidth}px` }} p={1}>
        {step !== 'review' && (
          <Grid item xs={1}>
            <IconButton
              onClick={handleEdit}
              sx={{
                bgcolor: 'primary.light',
                color: 'rgb(10, 191, 83)',
                elevation: 0
              }}
            >
              {viewOnly ? <LockIcon /> : <LockOpenIcon />}
            </IconButton>
          </Grid>
        )}
        <Grid item xs={step === 'review' ? 12 : false}>
          <NavButtons steps={steps} step={activeStep} configuration={step === 'review' ? configuration : configuration[step]} />
        </Grid>
      </Grid>
    </Box>
  );
};
