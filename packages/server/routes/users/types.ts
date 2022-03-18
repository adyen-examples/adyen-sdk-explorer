export type ConfigToUpdate = {
  name?: string;
  version?: number;
  configuration?: string;
};

export type UserToUpdate = {
  adyenKey?: string;
  merchantAccounts?: string[];
  configurations?: string[];
};
