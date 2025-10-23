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
