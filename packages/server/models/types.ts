import { Document, Types } from 'mongoose';

export interface UserDocument extends Document {
  _id?: Types.ObjectId;
  id?: string;
  username: string;
  password: string;
  email: string;
  adyenKey?: string;
  merchantAccounts?: string[];
  configurations?: Types.ObjectId[];
}

export interface ConfigurationDocument extends Document {
  owner: Types.ObjectId;
  name: string;
  version: number;
  configuration: string;
}
