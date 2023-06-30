import { ChangeEvent } from 'react';
import { Fragment } from 'react';
import { Grid, Typography, TextField } from '@mui/material';
import type { OptionPropTypes } from './types';

interface TextInputFieldProps extends OptionPropTypes {
  subtitles?: boolean;
  type: string;
}

export const TextInputField = ({ descriptor, onChange, value, isChecked, current, subtitles, type }: TextInputFieldProps) => {
  let textInputFieldValue = value !== undefined ? value : '';
  let additionalLabels;

  if (subtitles) {
    additionalLabels = (
      <Fragment>
        <Typography sx={{ display: 'inline-block' }} variant="subtitle2">
          {descriptor.name}
        </Typography>
        <Typography mx={1} sx={{ display: 'inline-block', fontSize: '0.75rem' }} variant="caption">
          {descriptor.type}
        </Typography>
      </Fragment>
    );
  }

  return (
    <Grid item xs={11}>
      {additionalLabels}
      {isChecked && (
        <TextField
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            let value = type === 'number' ? Number(e.target.value) : e.target.value;
            onChange(e.target.name, value, current);
          }}
          value={textInputFieldValue}
          variant="outlined"
          name={descriptor.name}
          id={descriptor.name}
          size="small"
          hiddenLabel
          type={type === 'number' ? 'number' : 'text'}
          sx={{ bgcolor: 'secondary.light' }}
        />
      )}
    </Grid>
  );
};
