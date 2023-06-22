import { ChangeEvent, useState } from 'react';
import { useSelector } from 'react-redux';
import type { ActionCreatorWithPayload } from '@reduxjs/toolkit';
import { Grid, Typography, FormGroup, FormControlLabel, Checkbox, Box } from '@mui/material';
import { OptionWrapper } from './OptionWrapper';
import type { RootState } from '../../../../store';
import type { Descriptor } from '../../types';
import { ObjectOption } from './OptionTypes';

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

  if (!displayDescriptors || !displayDescriptors.length) {
    emptyDisplay = (
      <Box mb={1} mt={4} px={6} sx={{ width: '100%' }}>
        <ObjectOption content="No configurations found. Use editor pane for custom fields." />
      </Box>
    );
  }

  return (
    <Grid container>
      <Grid
        item
        px={7}
        py={1.4}
        mt={2}
        xs={12}
        sx={{
          backgroundColor: 'secondary.light',
          boxShadow: '0 8px 8px rgba(0,17,44,.04), 0 2px 4px rgba(0,17,44,.08)',
          position: 'sticky',
          top: 0,
          zIndex: 1
        }}
      >
        <Grid direction="row" justifyContent="space-between" container>
          <Grid item>
            <Typography variant="h5">{category}</Typography>
          </Grid>
          <Grid item>
            <FormGroup row sx={{ '& .MuiCheckbox-root': { py: 0, px: 0.5 } }}>
              <FormControlLabel
                control={
                  <Checkbox
                    size="small"
                    name="Required"
                    checked={required}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                      handleToggle(e.target.name);
                    }}
                    disabled={!optional}
                  />
                }
                label={
                  <Typography sx={{ display: 'inline-block', fontSize: '0.67rem', color: '#00112c', fontWeight: '300' }} variant="caption">
                    Required
                  </Typography>
                }
              />
              <FormControlLabel
                control={
                  <Checkbox
                    size="small"
                    name="Optional"
                    checked={optional}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                      handleToggle(e.target.name);
                    }}
                    disabled={!required}
                  />
                }
                label={
                  <Typography sx={{ display: 'inline-block', fontSize: '0.67rem', color: '#00112c', fontWeight: '300' }} variant="caption">
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
            <Grid item mx={7} xs={12} pt={3} pb={2} key={descriptor.name} sx={{ borderBottom: 1, borderColor: 'primary.border' }}>
              <OptionWrapper descriptor={descriptor} configuration={configuration} action={action} />
            </Grid>
          );
        })}
      {emptyDisplay}
    </Grid>
  );
};
