import { Fragment } from 'react';
import { Grid } from '@mui/material';
import { TextInputField } from './TextInputField';
import type { Descriptor } from '../../../types';
import type { OptionPropTypes } from './types';

export const NestedOption = ({ descriptor, onChange, value }: OptionPropTypes) => {
  return (
    <Fragment>
      <Grid container sx={{ border: '1px solid', borderColor: 'primary.border', borderRadius: 1, bgcolor: 'secondary.light' }} p={4}>
        {descriptor.properties &&
          descriptor.properties.map((prop: Descriptor) => {
            return (
              <Grid item xs={7} key={prop.name}>
                <TextInputField
                  current={descriptor.name}
                  descriptor={prop}
                  onChange={onChange}
                  value={value[prop.name]}
                  isChecked={value !== undefined}
                />
              </Grid>
            );
          })}
      </Grid>
    </Fragment>
  );
};
