# Run this integration in seconds using [Gitpod](https://gitpod.io/)

- Open your [Adyen Test Account](https://ca-test.adyen.com/ca/ca/overview/default.shtml) and create a set of [API keys](https://docs.adyen.com/user-management/how-to-get-the-api-key).
- Go to [gitpod account variables](https://gitpod.io/variables).
- Set the `ADYEN_API_KEY`, `ADYEN_CLIENT_KEY`, `ADYEN_HMAC_KEY` and `ADYEN_MERCHANT_ACCOUNT variables`.
- Click the button below!

[![Open in Gitpod](https://gitpod.io/button/open-in-gitpod.svg)](https://gitpod.io/#https://github.com/ossiggy/adyen-web-demo)

_NOTE: To allow the Adyen Drop-In and Components to load, you have to add gitpod.io as allowed origin for your chosen set of [API Credentials](https://ca-test.adyen.com/ca/ca/config/api_credentials_new.shtml)_

# Adyen SDK Explorer

## What this is

This is a tool to help you configure and use the Adyen web components before writing any of your own code, while providing you with the exact code you will need to replicate it.

## Configuration

You will need to create `.env` files in both the `client` and `server` directories. The exact variables you will need are contained in the respective `env-example` files in these directories.

## Installation

From the root directory, run `npm install`. This should take care of all the necessary packages you will need.

## Using this repo

You have two choices on how to start this repository. If you would like to run it all at once, you can run `npm start` from the root directory. This will create a build of the front end, start the server, and serve it from there.

If you would like to run the front-end and back-end separately, you can cd into each of them and run them both with `npm start`.
