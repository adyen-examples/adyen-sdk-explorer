import { Input } from '../Input';
import { useState } from 'react';
import { Box, Typography } from '@mui/material';

const defaultStyle = {
  'adyen-checkout__payment-method': {
    'background-color': {
      value: '#fff',
      type: 'color'
    },
    'font-size': {
      value: '1rem',
      type: 'input'
    },
    color: {
      value: '#000',
      type: 'color'
    },
    'font-family': {
      value: 'Roboto, Helvetica, Arial, sans-serif',
      type: 'select'
    }
  },
  'adyen-checkout__payment-method--selected': {
    'background-color': {
      value: '#fff',
      type: 'color'
    },
    'font-size': {
      value: '1rem',
      type: 'input'
    },
    color: {
      value: '#000',
      type: 'color'
    },
    'font-family': {
      value: 'Roboto, Helvetica, Arial, sans-serif',
      type: 'select'
    }
  }
};
// We need to store this configuration in the global state
// For now we will just use a local state
// We need wrap the dropin and apply the style from the global state
export const StyleEditor = (props: any) => {
  const [style, setStyle] = useState(defaultStyle);

  return (
    <Box sx={{ p: 0 }}>
      <Input
        data={style}
        handleEditorUpdate={(value: any) => {
          console.log(value);
        }}
        viewOnly={false}
      />
      <Box>
        <Typography>Style</Typography>
      </Box>
    </Box>
  );
};
