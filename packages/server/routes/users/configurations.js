const express = require('express');

const { jwtAuth } = require('../auth');
const { User, Configuration } = require('../../models');

const router = express.Router();

router.post('/', jwtAuth, async (req, res) => {
  try {
    const { owner, name, version, configuration } = req.body;

    const existingUser = await User.find({ _id: owner });
    if (!existingUser || !existingUser.length) {
      return res.status(422).json({
        code: 422,
        reason: 'ValidationError',
        message: 'User does not exist',
        location: owner
      });
    }

    const createdConfiguration = await Configuration.create({ owner, name, version, configuration });
    return res.send(200).json({
      id: createdConfiguration.id,
      owner,
      name,
      version,
      configuration
    });
  } catch (err) {
    console.error('CONFIGURATIONS CREATION ERROR', err);
    res.status(500).json({ code: 500, message: 'Internal server error' });
  }
});

router.put('/:id', jwtAuth, async (req, res) => {
  if (!(req.params.id === req.body.id)) {
    const message = `Request patch id (${req.params.id} and request body id (${req.body.id}) must match)`;
    console.error(message);
    res.status(400).json({ message: message });
  }
  try {
    const toUpdate = {};
    const updateableFields = ['name', 'version', 'configuration'];

    updateableFields.forEach(field => {
      if (field in req.body) {
        toUpdate[field] = req.body[field];
      }
    });

    const { adyenKey, merchantAccounts } = await Configuration.findOneAndUpdate({ _id: req.params.id }, { $set: toUpdate }, { new: true }).exec();
    res.send(200).json({ adyenKey: adyenKey.substr(adyenKey.length - 5), merchantAccounts });
  } catch (err) {
    console.error('CONFIGURATIONS UPDATE ERROR', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = { router };
