export type ConfigurationState = {
  id: string;
  owner: string;
  name: string;
  version: number;
  configuration: string;
};

export type UserState = {
  id: string;
  username: string;
  configurations: [ConfigurationState] | [];
};

export type OnDeckPropType = { [key: string]: any };

export type OnDeckState = {
  profile: OnDeckPropType;
  checkout: OnDeckPropType | {};
  local: OnDeckPropType | {};
  sessions: OnDeckPropType | {};
  [key: string]: any;
};

export type Descriptor = {
  name: string;
  description: string;
  properties?: [];
  items?: { type: string } | [];
  type?: string;
  format?: string;
  [key: string]: any;
};

export type DescriptorList = {
  checkout: Descriptor[] | [];
  local: Descriptor[] | [];
  sessions: Descriptor[] | [];
  [key: string]: Descriptor[] | [];
};
