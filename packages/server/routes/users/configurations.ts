import { Router } from 'express';

import { jwtAuth, isAuthorizedForAction } from '../auth';
import { User, Configuration } from '../../models';

const router = Router();

router.get('/:userId', jwtAuth, isAuthorizedForAction, async (req, res) => {
  try {
    const existingUser = await User.find({ _id: req.params.userId });
    if (!existingUser || !existingUser.length) {
      return res.status(422).json({
        code: 422,
        reason: 'Not found',
        message: 'User does not exist',
        location: req.params.userId
      });
    }

    const relatedConfigurations = await Configuration.find({ owner: req.params.userId });
    if (!relatedConfigurations || !relatedConfigurations.length) {
      return res.status(422).json({
        code: 422,
        reason: 'Not found',
        message: 'No related configurations',
        location: req.params.userId
      });
    }

    res.status(201).json(relatedConfigurations.map(config => config.apiRepr()));
  } catch (err) {
    console.error('ERROR GETTING CONFIGS', err);
    res.status(500).json({ code: 500, message: 'Internal server error' });
  }
});

router.get('/:userId/:id', jwtAuth, isAuthorizedForAction, async (req, res) => {
  try {
    const existingConfiguration = await Configuration.find({ _id: req.params.id });
    if (!existingConfiguration || !existingConfiguration.length) {
      return res.status(404).json({
        code: 404,
        reason: 'Not found',
        message: 'Configuration by this ID does not exist',
        location: req.body.id
      });
    }

    res.status(201).json(existingConfiguration[0].apiRepr());
  } catch (err) {
    console.error('ERROR GETTING CONFIGURATION', err);
    res.status(500).json({ code: 500, message: 'Internal server error' });
  }
});

router.post('/:userId', jwtAuth, isAuthorizedForAction, async (req, res) => {
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
    res.status(200).json(createdConfiguration.apiRepr());
  } catch (err) {
    console.error('CONFIGURATIONS CREATION ERROR', err);
    res.status(500).json({ code: 500, message: 'Internal server error' });
  }
});

router.put('/:userId/:id', jwtAuth, isAuthorizedForAction, async (req, res) => {
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

    const { owner, name, version, configuration } = await Configuration.findOneAndUpdate(
      { _id: req.body.id },
      { $set: toUpdate },
      { new: true }
    ).exec();
    res.send(200).json({ id: req.body.id, owner, name, version, configuration });
  } catch (err) {
    console.error('CONFIGURATIONS UPDATE ERROR', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

export { router };
