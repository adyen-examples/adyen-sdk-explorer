import { compare, hash } from 'bcryptjs';
import { Schema, SchemaTypes, Model, model } from 'mongoose';

import { UserDocument } from '../types';

export interface User extends UserDocument {
  validatePassword(password: string): boolean;
  apiRepr(): UserDocument;
}

export interface UserModel extends Model<User> {
  hashPassword(password: string): string;
}

export const UserSchema: Schema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  adyenKey: { type: String, required: false },
  merchantAccounts: [{ type: String, required: false }],
  configurations: [
    {
      type: SchemaTypes.ObjectId,
      ref: 'Configuration',
      required: false
    }
  ]
});

// arrow functions not possible here, since they close over lexically enclosing context (i.e: this remains this)

UserSchema.method('apiRepr', function () {
  return {
    id: this._id.toString(),
    username: this.username || '',
    email: this.email || '',
    adyenKey: this.adyenKey || null,
    merchantAccounts: this.merchantAccounts || [],
    configurations: this.configurations || []
  };
});

UserSchema.method('validatePassword', function (password: string): boolean {
  return compare(password, this.password);
});

UserSchema.static('hashPassword', (password: string): string => hash(password, 10));

export const User: UserModel = model<User, UserModel>('User', UserSchema);

export default User;
