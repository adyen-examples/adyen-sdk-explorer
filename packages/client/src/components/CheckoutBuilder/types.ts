import type { Descriptor } from '../../app/types';

export type ConfigPropTypes = {
  step: number;
  setActiveStep: (step: number) => void;
  descriptors?: Descriptor[];
};
