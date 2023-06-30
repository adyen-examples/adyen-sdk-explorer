import { Grid } from '@mui/material';
import { ArrayOption, BooleanOption, ObjectOption, NestedOption, TextInputField } from './OptionTypes';
import type { Descriptor } from '../../types';

interface InitializeOptionProps {
  descriptor: Descriptor;
  onChange: (item: string, value: any, current?: any) => void;
  value: any;
  isChecked: boolean;
  sx?: object;
}

export const InitializeOption = (props: InitializeOptionProps) => {
  const { descriptor } = props;
  let optionsDisplay = null;

  if (descriptor.properties) {
    optionsDisplay = <NestedOption {...props} />;
  } else if (descriptor.type === 'string') {
    optionsDisplay = <TextInputField {...props} type="text"/>;
  } else if (descriptor.type === 'boolean' && descriptor.name) {
    optionsDisplay = <BooleanOption {...props} />;
  } else if (descriptor.type === 'array' && descriptor.name) {
    optionsDisplay = <ArrayOption {...props} />;
  } else if (descriptor.type === 'object' && !descriptor.properties) {
    optionsDisplay = <ObjectOption content="Custom configuration use case. Use the JSON Editor pane." />;
  } else if (descriptor.type === 'integer') {
    optionsDisplay = <TextInputField {...props} type="number" />;
  }

  return (
    <Grid item xs={12}>
      {optionsDisplay}
    </Grid>
  );
};
