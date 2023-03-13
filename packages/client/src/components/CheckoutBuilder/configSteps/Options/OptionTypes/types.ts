import { Descriptor } from '../../../types';

export interface OptionPropTypes {
  descriptor: Descriptor;
  onChange: any;
  value: any;
  isChecked?: boolean;
  current?: string;
}
