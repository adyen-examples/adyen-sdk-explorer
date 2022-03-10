const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const ConfigurationSchema = mongoose.Schema({
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  version: { type: Number, required: true },
  configuration: { type: String, required: true }
});

ConfigurationSchema.methods.apiRepr = () => ({
  id: this._id,
  owner: this.owner || '',
  name: this.name || null,
  version: this.version || [],
  configuration: this.configuration
});

const Configuration = mongoose.model('Configuration', ConfigurationSchema);

module.exports = { Configuration };
