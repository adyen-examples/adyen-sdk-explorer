import { EditorPrePostFix } from '../EditorPrePostFix';
import { useState } from 'react';
import { Box, Typography, TextField, FormControl, InputLabel, Select, MenuItem, Button } from '@mui/material';
import { HuePicker } from 'react-color';
import { StyleDrawers } from './StyleDrawers';

const defaultStyle = {
  'adyen-checkout__payment-method': {
    'background-color': '#fff',
    color: '#000',
    'font-family': 'Roboto, Helvetica, Arial, sans-serif',
    'font-size': '1rem'
  },
  'adyen-checkout__payment-method--selected': {
    'background-color': '#fff',
    color: '#000',
    'font-family': 'Roboto, Helvetica, Arial, sans-serif',
    'font-size': '1rem'
  }
};

// We need to store this configuration in the global state
// For now we will just use a local state
// We need wrap the dropin and apply the style from the global state
export const StyleEditor = (props: any) => {
  const [style, setStyle]: any = useState(defaultStyle);

  return (
    <Box sx={{ p: 0 }}>
      <Box sx={{ borderBottom: 1, borderColor: 'primary.light', bgcolor: '#00112C' }}>
        <Typography sx={{ fontSize: '.7rem', px: 2, color: 'primary.light' }} variant="caption">
          STYLE
        </Typography>
      </Box>
      <Box>
        <EditorPrePostFix
          data={style}
          handleEditorUpdate={(value: any) => {
            console.log(value);
          }}
          viewOnly={true}
        />
      </Box>
      <Box>
        <Box sx={{ borderTop: 1, borderBottom: 1, borderColor: 'primary.light', bgcolor: '#00112C' }}>
          <Typography sx={{ fontSize: '.7rem', px: 2, color: 'primary.light' }} variant="caption">
            PALETTE
          </Typography>
        </Box>
        {Object.keys(style).map((sdkClass: any, i: any) => {
          return <StyleDrawers sdkClass={sdkClass} style={style} key={i} />;
        })}
      </Box>
    </Box>
  );
};
