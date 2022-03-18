const express = require('express');
const request = require('request-promise');
const { errorHandler } = require('../helpers');
const { ADYEN_API_KEY, ADYEN_BASE_URL } = require('../../config');

const router = express.Router();

router.post('/getPaymentMethods', async (req, res) => {
  const { version, apiKey, payload } = req.body;
  try {
    const options = {
      url: `${ADYEN_BASE_URL}/${version}/paymentMethods`,
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
    errorHandler('/getPaymentMethods', 500, err.message, res);
  }
});

router.post('/makePayment', async (req, res) => {
  const { version, apiKey, payload } = req.body;
  try {
    const options = {
      url: `${ADYEN_BASE_URL}/${version}/payments`,
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
    errorHandler('/makePayment', 500, err.message, res);
  }
});

router.post('/additionalDetails', async (req, res) => {
  const { version, apiKey, payload } = req.body;
  try {
    const options = {
      url: `${ADYEN_BASE_URL}/${version}/payments/details`,
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
    errorHandler('/additionalDetails', 500, err.message, res);
  }
});

module.exports = { router };
