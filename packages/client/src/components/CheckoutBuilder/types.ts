import type { Descriptor, GlobalOnDeckState, LocalOnDeckState, SessionsOnDeckState } from '../../app/types';

export type ConfigTypes = GlobalOnDeckState | LocalOnDeckState | SessionsOnDeckState | { [key: string]: any };

export type ConfigPropTypes = {
  name: string;
  updateConfig: (key: string, value: {}) => void;
  section: ConfigTypes;
  descriptors: Descriptor[];
  [key: string]: any;
};
