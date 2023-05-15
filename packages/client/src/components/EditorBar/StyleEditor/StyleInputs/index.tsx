import { Box, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import { HuePicker } from 'react-color';

export const StyleInputs = (props: any) => {
  const { style } = props;

  const styleTypes: any = {
    'background-color': {
      type: 'color'
    },
    color: {
      type: 'color'
    },
    'font-family': {
      type: 'select',
      values: ['Roboto, Helvetica, Arial, sans-serif', 'Arial, Helvetica, sans-serif']
    },
    'font-size': {
      type: 'input'
    }
  };

  return (
    <Box>
      {Object.keys(style).map((cssProperty: any) => {
        let styleType = null;
        switch (styleTypes[cssProperty].type) {
          case 'color':
            styleType = (
              <Box>
                <HuePicker color={style[cssProperty]} width={'100%'} />
              </Box>
            );
            break;
          case 'input':
            styleType = (
              <Box>
                <TextField focused fullWidth id="outlined-basic" variant="standard" />
              </Box>
            );
            break;
          case 'select':
            styleType = (
              <Box>
                <FormControl focused fullWidth size="small" variant="standard">
                  <Select labelId="select-font" value={style[cssProperty]} label="Font">
                    {styleTypes[cssProperty].values.map((value: any) => {
                      return <MenuItem value={value}>{value}</MenuItem>;
                    })}
                  </Select>
                </FormControl>
              </Box>
            );
            break;
          default:
            break;
        }

        return (
          <Box key={cssProperty}>
            <Typography sx={{ fontSize: '.65rem', color: 'primary.light' }} variant="caption">
              {cssProperty}
            </Typography>
            <Box
              sx={{
                color: 'primary.light !important',
                '.MuiInput-root': { fontSize: '.9rem', color: 'primary.light', svg: { color: 'primary.light' } }
              }}
            >
              {styleType}
            </Box>
          </Box>
        );
      })}
    </Box>
  );
};
