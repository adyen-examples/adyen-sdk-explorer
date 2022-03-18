import { Router } from 'express';
import { jwtAuth, isAuthorizedForAction } from '../auth';
import { runUserValidation } from '../helpers';

const router = Router();

import { User } from '../../models';

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

router.get('/:userId', jwtAuth, isAuthorizedForAction, async (req, res) => {
  try {
    const existingUser = await User.find({ _id: req.params.userId });
    if (!existingUser || !existingUser.length) {
      return res.status(404).json({
        code: 404,
        reason: 'Not found',
        message: 'User by this ID does not exist',
        location: req.params.userId
      });
    }

    const { id, username, email, adyenKey, merchantAccounts, configurations } = existingUser[0].apiRepr();
    res.status(201).send({
      id,
      username,
      email,
      adyenKey: adyenKey && adyenKey.length ? adyenKey.substr(adyenKey.length - 5) : '',
      merchantAccounts,
      configurations
    });
  } catch (err) {
    console.error('ERROR GETTING USER', err);
  }
});

router.put('/:userId', jwtAuth, isAuthorizedForAction, async (req, res) => {
  if (!(req.params.userId === req.body.id)) {
    const message = `Request patch id (${req.params.userId} and request body id (${req.body.id}) must match)`;
    console.error(message);
    res.status(400).json({ message: message });
  }

  try {
    const toUpdate = {};
    const updateableFields = ['adyenKey', 'merchantAccounts', 'configurations'];

    updateableFields.forEach(field => {
      if (field in req.body) {
        toUpdate[field] = req.body[field];
      }
    });

    const { adyenKey, merchantAccounts, configurations } = await User.findOneAndUpdate(
      { _id: req.body.id },
      { $set: toUpdate },
      { new: true }
    ).exec();

    res.status(200).json({ id: req.body.id, adyenKey: adyenKey.substr(adyenKey.length - 5), merchantAccounts, configurations });
  } catch (err) {
    console.error('USER UPDATE ERROR', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

export { router };
