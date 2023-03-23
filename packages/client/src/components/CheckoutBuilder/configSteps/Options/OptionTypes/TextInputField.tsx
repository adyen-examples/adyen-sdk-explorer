import { ChangeEvent } from 'react';
import { Fragment } from 'react';
import { Grid, Typography, TextField } from '@mui/material';
import type { OptionPropTypes } from './types';

interface TextInputFieldProps extends OptionPropTypes {
  subtitles?: boolean;
}

export const TextInputField = ({ descriptor, onChange, value, isChecked, current, subtitles }: TextInputFieldProps) => {
  let textInputFieldValue = value || '';

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
          onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(e.target.name, e.target.value, current)}
          value={textInputFieldValue}
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
