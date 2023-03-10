import { ChangeEvent } from 'react';
import { Grid, Typography, TextField } from '@mui/material';
import type { OptionPropTypes } from './types';

export const StringOption = ({ descriptor, onChange, value, isChecked, current }: OptionPropTypes) => {
  return (
    <Grid item xs={11}>
      {
        <Typography sx={{ display: 'inline-block' }} variant="subtitle2">
          {descriptor.name}
        </Typography>
      }
      {
        <Typography mx={1} sx={{ display: 'inline-block', fontSize: '0.75rem' }} variant="caption">
          {descriptor.type}
        </Typography>
      }
      {isChecked && (
        <TextField
          onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(e.target.name, e.target.value, current)}
          value={value}
          sx={{ display: 'block', py: 0 }}
          variant="filled"
          name={descriptor.name}
          id={descriptor.name}
          size="small"
          hiddenLabel
        />
      )}
    </Grid>
  );
};
