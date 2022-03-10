const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const UserSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  adyenKey: { type: String, required: false },
  merchantAccounts: [{ type: String, required: false }],
  configurations: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Configuration',
      required: false
    }
  ]
});

UserSchema.methods.apiRepr = () => ({
  id: this._id,
  username: this.username || '',
  adyenKey: this.adyenKey || null,
  merchantAccounts: this.merchantAccounts || [],
  configurations: this.configurations || []
});

UserSchema.methods.validatePassword = password => bcrypt.compare(password, this.password);

UserSchema.statics.hashPassword = password => bcrypt.hash(password, 10);

const User = mongoose.model('User', UserSchema);

module.exports = { User };
