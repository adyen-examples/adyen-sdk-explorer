import { Box, Button, Grid } from '@mui/material';
import { useState } from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import type { RootState } from '../../../store';
import { NavButtons } from '../NavButtons';
import { MultiTabEditor, SingleTab } from './TabPanel';
import { OnDeckPropType } from '../../CheckoutBuilder/types';

interface EditorDimensions {
  buttonHeight: number;
  headerHeight: number;
  editorWidth: number;
}

interface EditorWrapperProps {
  dimensions: EditorDimensions;
}

interface ConfigurationPropType {
  [key: string]: OnDeckPropType;
}

export const EditorWrapper = ({ dimensions }: EditorWrapperProps) => {
  const { buttonHeight, headerHeight, editorWidth } = dimensions;
  const { profile, checkout, local, sessions, steps, activeStep } = useSelector((state: RootState) => state.onDeck, shallowEqual);
  const configuration: ConfigurationPropType = { profile, checkout, local, sessions };

  let step = steps[activeStep];

  const [viewOnly, setViewOnly] = useState(true);
  const [tab, setTab] = useState(0);

  const handleEdit = () => {
    setViewOnly(!viewOnly);
  };

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTab(newValue);
  };

  const display = step === 'review' ? <MultiTabEditor tab={tab} handleChange={handleChange} /> : <SingleTab step={step} viewOnly={viewOnly} />;

  return (
    <Box>
      <Box
        sx={{
          borderLeft: 2,
          borderColor: 'secondary.light',
          position: 'fixed',
          top: 0,
          right: 0,
          bgcolor: 'primary.light',
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
        }}
      >
        {display}
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
            {viewOnly ? 'Edit' : 'View Only'}
          </Button>
        </Grid>
        <Grid item>
          <NavButtons steps={steps} step={activeStep} configuration={step === 'review' ? configuration : configuration[step]} />
        </Grid>
      </Grid>
    </Box>
  );
};
