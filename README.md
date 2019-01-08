# chai-jest-mocks
[![npm version](https://badge.fury.io/js/chai-jest-mocks.svg)](https://badge.fury.io/js/chai-jest-mocks)

Chai plugin that adds assertions for jest mock functions

### __NOTE__ this is still very much a work in progress, more matchers and better documentation (and tests) are coming!

## Installation
On the command line:
```
$ npm install --save-dev chai-jest-mock
```

## Usage

First, tell `chai` that you want to use `chai-jest-mock`
```
const chai = require('chai');
const chaiJestMock = require('chai-jest-mock');

chai.use(chaiJestMock);
```

Then you will have access to the new assertions:

```
// Expect a mock to be called
expect(mockFn).to.have.beenCalled();

// Expect a mock to have been called a certain number of times
expect(mockFn).to.have.beenCalledTimes(4);

// Expect a mock to have been called with specific arguments
expect(mockFn).to.have.beenCalledWith('hello', 'world');
```
