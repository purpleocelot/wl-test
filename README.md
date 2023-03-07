## WL Tech Test

## David Lawton

Although overkill for a simple console app, I used Nest.js for this test because the CLI tool quickly creates a Node app with a well structured Angular-like architecture, provides dependency injection, and also includes a testing framework.

Puppeteer.js was chosen to do the webpage scraping because it renders the target webpage in a headless chrome browser, meaning that any javascript generated content will also be captured. Providing tests for the puppeteer scraping routines is beyond the scope of this test, so they have been placed in a separate service allowing them to be mocked when testing code that consumes them. All other code is unit tested.

## Installing the app dependencies

Open a terminal in the project root and type:

```bash
$ npm i
```

## Running the app

```bash
$ npm run start
```

## Running the Tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

