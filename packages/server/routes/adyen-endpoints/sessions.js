const express = require('express');
const request = require('request-promise');

const { errorHandler } = require('../helpers');
const { ADYEN_API_KEY, ADYEN_BASE_URL } = require('../../config');

const router = express.Router();

router.post('/sessionStart', async (req, res) => {
  const { version, apiKey, payload } = req.body;
  try {
    const options = {
      url: `${ADYEN_BASE_URL}/${version}/sessions`,
      headers: {
        'Content-type': 'application/json',
        'x-api-key': apiKey || ADYEN_API_KEY
      },
      body: payload,
      json: true
    };

    const response = await request(options);
    res.send(201).json(response);
  } catch (err) {
    errorHandler('/sessionStart', 500, err.message, res);
  }
});

module.exports = { router };
