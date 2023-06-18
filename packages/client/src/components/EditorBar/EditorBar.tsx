import { Box, Button, Grid } from '@mui/material';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { onDeckActions } from '../../app';
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
  const { updateActiveStep } = onDeckActions;

  console.log('EditorBar:: txVariant', txVariant);

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
        <Grid
          item
          sx={{
            display: {
              xs: 'none',
              sm: 'none',
              md: 'block'
            }
          }}
        >
          <Button
            onClick={handleEdit}
            sx={{
              display: `${step === 'review' ? 'none' : 'inline-block'}`,
              bgcolor: `${viewOnly ? '#0abf53' : '#ff5722'}`,
              '&:hover': { bgcolor: `${viewOnly ? '#388e3c' : '#bf360c'}` }
            }}
            variant="contained"
          >
            <Box sx={{ fontSize: '15px', verticalAlign: 'middle', display: 'inline-block' }}>{viewOnly ? 'Edit' : 'View'}</Box>
          </Button>
        </Grid>
        <Grid item>
          <NavButtons steps={steps} step={activeStep} configuration={step === 'review' ? configuration : configuration[step]} />
        </Grid>
      </Grid>
    </Box>
  );
};
