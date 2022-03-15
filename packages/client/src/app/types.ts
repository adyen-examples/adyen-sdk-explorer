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
