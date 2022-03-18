import { Schema, SchemaTypes, model } from 'mongoose';

import { ConfigurationDocument } from '../types';

export interface Configuration extends ConfigurationDocument {
  apiRepr(): ConfigurationDocument;
}

export const ConfigurationSchema: Schema = new Schema({
  owner: { type: SchemaTypes.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  version: { type: Number, required: true },
  configuration: { type: String, required: true }
});

// arrow functions not possible here, since they close over lexically enclosing context (i.e: this remains this)

ConfigurationSchema.method('apiRepr', function () {
  return {
    id: this._id.toString(),
    owner: this.owner || '',
    name: this.name || null,
    version: this.version || [],
    configuration: this.configuration
  };
});

export const Configuration = model<Configuration>('Configuration', ConfigurationSchema);

export default Configuration;
