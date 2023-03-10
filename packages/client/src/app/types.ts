export interface ConfigurationState {
  id: string;
  owner: string;
  name: string;
  version: number;
  configuration: string;
}

export interface UserState {
  id: string;
  username: string;
  configurations: [ConfigurationState] | [];
}

export interface OnDeckPropType {
  [key: string]: any;
}

export interface OnDeckState {
  profile: OnDeckPropType;
  checkout: OnDeckPropType | {};
  local: OnDeckPropType | {};
  sessions: OnDeckPropType | {};
  sessionsResponse: OnDeckPropType | {};
  isRedirect: boolean;
  activeStep: number;
  [key: string]: any;
}

export interface Descriptor {
  name: string;
  description: string;
  properties?: [];
  items?: { type: string } | [];
  type?: string;
  format?: string;
  [key: string]: any;
}

export interface DescriptorList {
  checkout: Descriptor[] | [];
  local: Descriptor[] | [];
  sessions: Descriptor[] | [];
  [key: string]: Descriptor[] | [];
}

export interface sdkExplorerState {
  txvariant: string;
  steps: [];
  activeStep: number;
  [key: string]: any;
}
