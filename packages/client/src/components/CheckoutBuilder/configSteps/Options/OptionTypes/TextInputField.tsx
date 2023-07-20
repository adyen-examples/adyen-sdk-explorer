import { ChangeEvent } from 'react';
import { Fragment } from 'react';
import { Grid, Typography, TextField } from '@mui/material';
import { SelectField } from './SelectField';
import type { OptionPropTypes } from './types';

export interface TextInputFieldProps extends OptionPropTypes {
  subtitles?: boolean;
  type?: 'number' | 'text' | undefined;
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

  let display;

  if (descriptor.enum) {
    display = <SelectField onChange={onChange} descriptor={descriptor} value={value} current={current} />;
  } else {
    display = (
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
    );
  }

  return (
    <Grid item xs={11}>
      {additionalLabels}
      {isChecked && display}
    </Grid>
  );
};
