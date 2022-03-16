const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
require('mongoose-type-email');

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
  email: {
    type: mongoose.SchemaTypes.Email,
    required: true
  },
  adyenKey: { type: String, required: false },
  merchantAccounts: [{ type: String, required: false }],
  configurations: [
    {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Configuration',
      required: false
    }
  ]
});

// arrow functions not possible here, since they close over lexically enclosing context (i.e: this remains this)

UserSchema.methods.apiRepr = function () {
  return {
    id: this._id,
    username: this.username || '',
    email: this.email || '',
    adyenKey: this.adyenKey || null,
    merchantAccounts: this.merchantAccounts || [],
    configurations: this.configurations || []
  };
};

UserSchema.methods.validatePassword = function (password) {
  return bcrypt.compare(password, this.password);
};

UserSchema.statics.hashPassword = password => bcrypt.hash(password, 10);

const User = mongoose.model('User', UserSchema);

module.exports = { User };
