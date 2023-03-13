import { ChangeEvent, useState } from 'react';
import { useSelector } from 'react-redux';
import { Grid, Typography, FormGroup, FormControlLabel, Checkbox } from '@mui/material';
import { OptionWrapper } from './OptionWrapper';
import type { ActionCreatorWithPayload } from '@reduxjs/toolkit';
import type { RootState } from '../../../../store';
import type { Descriptor } from '../../types';

interface ListOptionsProps {
  name: string;
  configuration: any;
  category: string;
  action: ActionCreatorWithPayload<any>;
}

export const ListOptions = ({ name, configuration, category, action }: ListOptionsProps) => {
  const descriptors = useSelector((state: RootState) => state.descriptors);
  const [filters, setFilters] = useState({
    required: true,
    optional: true
  });

  const { required, optional }: { required: boolean; optional: boolean } = filters;

  const displayDescriptors = descriptors[name].filter(descriptor => {
    if (!required && !optional) {
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

  return (
    <Grid container>
      <Grid item px={7} py={2} mt={2} xs={12} sx={{ backgroundColor: 'secondary.light', boxShadow: 3, position: 'sticky', top: 0 }}>
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
            <Grid item mx={7} xs={12} py={3} key={descriptor.name} sx={{ borderBottom: 1, borderColor: 'primary.border' }}>
              <OptionWrapper descriptor={descriptor} configuration={configuration} action={action} />
            </Grid>
          );
        })}
    </Grid>
  );
};
