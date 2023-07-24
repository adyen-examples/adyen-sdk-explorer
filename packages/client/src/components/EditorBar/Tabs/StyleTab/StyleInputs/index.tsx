import { Box, FormControl, MenuItem, Select, Slider, Typography } from '@mui/material';
import { HuePicker } from 'react-color';
import { onDeckActions } from '../../../../../app';
import { useAppDispatch } from '../../../../../hooks';

export const StyleInputs = (props: any) => {
  const { style, classStyle, targetClass, ...other } = props;
  const { updateStyleInfo } = onDeckActions;
  const dispatch = useAppDispatch();

  const styleTypes: any = {
    backgroundColor: {
      type: 'color'
    },
    color: {
      type: 'color'
    },
    fontSize: {
      type: 'input'
    },
    fontFamily: {
      type: 'select',
      values: ['Roboto', 'Helvetica', 'Arial', 'sans-serif', 'Poppins, sans-serif']
    },
    transition: {
      type: 'none'
    },
    padding: {
      type: 'none'
    },
    border: {
      type: 'none'
    }
  };

  return (
    <Box {...other}>
      {Object.keys(classStyle).map((cssProperty: any, i) => {
        let styleType = null;
        switch (styleTypes[cssProperty].type) {
          case 'color':
            styleType = (
              <Box>
                <HuePicker
                  color={classStyle[cssProperty]}
                  width={'100%'}
                  onChangeComplete={e => {
                    dispatch(updateStyleInfo({ ...style, [targetClass]: { ...classStyle, [cssProperty]: e.hex } }));
                  }}
                />
              </Box>
            );
            break;
          case 'input':
            styleType = (
              <Box>
                <Slider
                  aria-label="font size"
                  onChange={(e, value) => {
                    dispatch(updateStyleInfo({ ...style, [targetClass]: { ...classStyle, [cssProperty]: value } }));
                  }}
                  max={40}
                />
              </Box>
            );
            break;
          case 'select':
            styleType = (
              <Box>
                <FormControl focused fullWidth size="small" variant="standard">
                  <Select
                    labelId="select-font"
                    value={classStyle[cssProperty]}
                    label="Font"
                    defaultValue="Roboto, Helvetica, Arial, sans-serif"
                    onChange={e => {
                      dispatch(updateStyleInfo({ ...style, [targetClass]: { ...classStyle, [cssProperty]: e.target.value } }));
                    }}
                  >
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
            <Typography sx={{ fontSize: '.65rem', color: 'secondary.main' }} variant="caption">
              {cssProperty}
            </Typography>
            <Box
              sx={{
                color: 'primary.light !important',
                '.MuiInput-root': { fontSize: '.9rem', color: 'secondary.main', svg: { color: 'primary.light' } }
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
