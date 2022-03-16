const express = require('express');
const { jwtAuth } = require('../auth');
const { runUserValidation } = require('../helpers');

const router = express.Router();

const { User } = require('../../models');

router.get('/:id', jwtAuth, async (req, res) => {
  try {
    const existingUser = await User.find({ _id: req.body.id });
    if (!existingUser || !existingUser.length) {
      return res.status(404).json({
        code: 404,
        reason: 'Not found',
        message: 'User by this ID does not exist',
        location: req.body.id
      });
    }

    const { username, adyenKey, merchantAccounts, configurations } = existingUser.apiRepr();
    res.status(201).send({
      username,
      adyenKey: adyenKey.substr(adyenKey.length - 5),
      merchantAccounts,
      configurations
    });
  } catch (err) {
    console.error('ERROR GETTING USER', err);
  }
});

router.post('/', async (req, res) => {
  try {
    const invalidEntry = await runUserValidation(req.body);
    if (invalidEntry) {
      return res.status(422).json({
        code: 422,
        reason: 'ValidationError',
        message: invalidEntry.message,
        location: invalidEntry.location
      });
    }

    const { username, password, email } = req.body;
    const hashedPassword = await User.hashPassword(password);

    const createdUser = await User.create({ username, password: hashedPassword, email });
    const { id } = createdUser.apiRepr();
    return res.status(200).json({
      id,
      username,
      email
    });
  } catch (err) {
    console.error('USER CREATION ERROR', err);
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
    const updateableFields = ['adyenKey', 'merchantAccounts'];

    updateableFields.forEach(field => {
      if (field in req.body) {
        toUpdate[field] = req.body[field];
      }
    });

    const { adyenKey, merchantAccounts } = await User.findOneAndUpdate({ _id: req.params.id }, { $set: toUpdate }, { new: true }).exec();
    res.status(200).json({ adyenKey: adyenKey.substr(adyenKey.length - 5), merchantAccounts });
  } catch (err) {
    console.error('USER UPDATE ERROR', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = { router };
