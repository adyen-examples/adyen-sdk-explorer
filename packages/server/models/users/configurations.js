const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const ConfigurationSchema = mongoose.Schema({
  owner: { type: mongoose.SchemaTypes.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  version: { type: Number, required: true },
  configuration: { type: String, required: true }
});

// arrow functions not possible here, since they close over lexically enclosing context (i.e: this remains this)

ConfigurationSchema.methods.apiRepr = function () {
  return {
    id: this._id,
    owner: this.owner || '',
    name: this.name || null,
    version: this.version || [],
    configuration: this.configuration
  };
};

const Configuration = mongoose.model('Configuration', ConfigurationSchema);

module.exports = { Configuration };
