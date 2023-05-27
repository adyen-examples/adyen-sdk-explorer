import { Box, FormControl, InputLabel, MenuItem, Select, TextField, Typography, Slider } from '@mui/material';
import { HuePicker } from 'react-color';
import { onDeckActions } from '../../../../../app';
import { useAppDispatch } from '../../../../../hooks';

export const StyleInputs = (props: any) => {
  const { style, targetClass, ...other } = props;
  const { updateStyleInfo } = onDeckActions;
  const dispatch = useAppDispatch();

  const styleTypes: any = {
    'background-color': {
      type: 'color'
    },
    color: {
      type: 'color'
    },
    'font-size': {
      type: 'input'
    },
    'font-family': {
      type: 'select',
      values: ['Roboto, Helvetica, Arial, sans-serif', 'Arial, Helvetica, sans-serif']
    }
  };

  return (
    <Box {...other}>
      {Object.keys(style).map((cssProperty: any, i) => {
        let styleType = null;
        switch (styleTypes[cssProperty].type) {
          case 'color':
            styleType = (
              <Box>
                <HuePicker
                  color={style[cssProperty]}
                  width={'100%'}
                  onChangeComplete={e => {
                    dispatch(updateStyleInfo({ [targetClass]: { ...style, [cssProperty]: e.hex } }));
                  }}
                />
              </Box>
            );
            break;
          case 'input':
            styleType = (
              <Box>
                <Slider aria-label="font size" />
              </Box>
            );
            break;
          case 'select':
            styleType = (
              <Box>
                <FormControl focused fullWidth size="small" variant="standard">
                  <Select labelId="select-font" value={style[cssProperty]} label="Font">
                    {styleTypes[cssProperty].values.map((value: any, i: any) => {
                      return (
                        <MenuItem value={value} key={i}>
                          {value}
                        </MenuItem>
                      );
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
          <Box key={i}>
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
