require('dotenv').config();
const path = require('path');
const express = require('express');
const request = require('request-promise');
const { PORT, API_KEY } = require('./config');

const app = express();

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type,Authorization');
    next();
});

const root = path.join(__dirname, 'build');
app.use(express.static(root));
app.get('*', (req, res) => {
    res.sendFile('index.html', { root });
});

app.post('/startSession', express.json(), async (req, res) => {
    try {
        const options = {
            url: 'https://checkout-test.adyen.com/v68/sessions',
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'x-API-key': API_KEY
            },
            body: req.body,
            json: true
        };

        const result = await request(options);
        res.json(result);
    } catch (err) {
        console.log(err.message);
        res.json({ error: err.message });
    }
});

app.listen(PORT, () => {
    console.log('Your app is listening on port', PORT);
});
