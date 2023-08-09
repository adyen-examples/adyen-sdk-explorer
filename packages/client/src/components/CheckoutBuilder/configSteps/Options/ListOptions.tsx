import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Box, Checkbox, CssBaseline, Fab, FormControlLabel, FormGroup, Grid, Typography } from '@mui/material';
import type { ActionCreatorWithPayload } from '@reduxjs/toolkit';
import { ChangeEvent, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useIsInViewPort } from '../../../../hooks';
import type { RootState } from '../../../../store';
import type { Descriptor } from '../../types';
import { AdyenAlert } from './OptionTypes';
import { OptionWrapper } from './OptionWrapper';

interface ListOptionsProps {
  name: string;
  configuration: any;
  category: string;
  action: ActionCreatorWithPayload<any>;
}

export const ListOptions = ({ name, configuration, category, action }: ListOptionsProps) => {
  const optionDescriptors = useSelector((state: RootState) => state.descriptors[name]);
  const [filters, setFilters] = useState({
    required: true,
    optional: true
  });
  const parametersRef = useRef<any>(null);
  const isInViewport = useIsInViewPort(parametersRef);

  const { required, optional } = filters;

  const displayDescriptors = optionDescriptors.filter(descriptor => {
    if (required && optional) {
      return true;
    }
    return required ? descriptor.required : !descriptor.required;
  });

  const handleToggle = (name: string) => {
    if (name === 'Required') {
      setFilters({ ...filters, required: !required });
    } else if (name === 'Optional') {
      setFilters({ ...filters, optional: !optional });
    }
  };

  let emptyDisplay;

  const style = {
    '#list-parameters': {
      backgroundColor: 'secondary.light',
      boxShadow: '0 8px 8px background.shadow, 0 2px 4px primary.shadow',
      position: 'sticky',
      top: 0,
      zIndex: 1
    },
    '#floating-button': {
      position: 'fixed',
      bottom: 10,
      left: { xs: '28%', sm: '35%', md: '25%', lg: '45%' },
      textAlign: 'center',
      zIndex: 2,
      borderRadius: '100px',
      button: { '&:hover': { bgcolor: 'alert.info', color: 'primary.light' } }
    },
    '.required-label': { display: 'inline-block', fontSize: '0.67rem', color: 'secondary.main', fontWeight: '300' },
    '#parameter-title': { color: 'primary.light', textTransform: 'capitalize', fontWeight: 'bold' }
  };

  if (!displayDescriptors || !displayDescriptors.length) {
    emptyDisplay = (
      <Box mb={1} mt={4} px={6} sx={{ width: '100%' }}>
        <AdyenAlert styleType="warning" content="No configurations found. Use editor pane for custom fields." />
      </Box>
    );
  }

  return (
    <Grid sx={style} container>
      {!isInViewport && (
        <Box id="floating-button">
          <CssBaseline />
          <Fab
            variant="extended"
            size="medium"
            color="primary"
            aria-label="add"
            onClick={() => {
              parametersRef?.current?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            <Typography variant="h6" id="parameter-title">
              {name} Parameters
            </Typography>
            <KeyboardArrowDownIcon />
          </Fab>
        </Box>
      )}
      <Grid item ref={parametersRef} px={7} py={1.4} mt={2} xs={12} id="list-parameters">
        <Grid direction="row" justifyContent="space-between" container>
          <Grid item>
            <Typography variant="h6" sx={{ fontWeight: 'bold', fontSize: '1rem', color: 'secondary.main' }}>
              {category}
            </Typography>
          </Grid>
          <Grid item>
            <FormGroup row sx={{ '& .MuiCheckbox-root': { py: 0, px: 0.5 } }}>
              <FormControlLabel
                control={
                  <Checkbox
                    size="small"
                    name="Required"
                    className="checkbox"
                    checked={required}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                      handleToggle(e.target.name);
                    }}
                    disabled={!optional}
                  />
                }
                label={
                  <Typography className="required-label" variant="caption">
                    Required
                  </Typography>
                }
              />
              <FormControlLabel
                control={
                  <Checkbox
                    size="small"
                    name="Optional"
                    className="checkbox"
                    checked={optional}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                      handleToggle(e.target.name);
                    }}
                    disabled={!required}
                  />
                }
                label={
                  <Typography className="required-label" variant="caption">
                    Optional
                  </Typography>
                }
              />
            </FormGroup>
          </Grid>
        </Grid>
      </Grid>
      {displayDescriptors &&
        displayDescriptors.map((descriptor: Descriptor) => {
          return (
            <Grid item mx={7} xs={12} py={3} key={descriptor.name} sx={{ borderBottom: 1, borderColor: 'primary.border' }}>
              <OptionWrapper descriptor={descriptor} configuration={configuration} action={action} />
            </Grid>
          );
        })}
      {emptyDisplay}
    </Grid>
  );
};
