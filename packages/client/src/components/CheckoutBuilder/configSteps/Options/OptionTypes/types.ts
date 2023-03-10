import { Descriptor } from '../../../types';

export interface OptionPropTypes {
  descriptor: Descriptor;
  onChange: any;
  value: string;
  isChecked: boolean;
  current?: string;
}
