import type { Descriptor, DescriptorList, GlobalOnDeckState, LocalOnDeckState, SessionsOnDeckState } from '../../app/types';

export type ConfigTypes = GlobalOnDeckState | LocalOnDeckState | SessionsOnDeckState | { [key: string]: any };

export type ConfigPropTypes = {
  step: number;
  configuration: ConfigTypes;
  descriptors: Descriptor[];
  setActiveStep: (step: number) => void;
};

export type { Descriptor };
