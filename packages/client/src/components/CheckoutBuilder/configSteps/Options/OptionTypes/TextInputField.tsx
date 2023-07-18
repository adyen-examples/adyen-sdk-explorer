import { Box, Typography } from '@mui/material';
import { ChangeEvent, Fragment } from 'react';
import { AdyenInputTheme } from './AdyenInputTheme';
import type { OptionPropTypes } from './types';

interface TextInputFieldProps extends OptionPropTypes {
  subtitles?: boolean;
  type: 'number' | 'text' | undefined;
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
    <Box>
      {additionalLabels}
      {isChecked && (
        <AdyenInputTheme
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            let value = type === 'number' ? Number(e.target.value) : e.target.value;
            onChange(e.target.name, value, current);
          }}
          value={textInputFieldValue}
          name={descriptor.name}
          id={descriptor.name}
          type={type === 'number' ? 'number' : 'text'}
          sx={{
            width: '50%',
            '& .MuiInputBase-input': {
              py: 1
            }
          }}
        />
      )}
    </Box>
  );
};
