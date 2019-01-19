const {
  matcherHint,
  printReceived,
  printWithType,
  RECEIVED_COLOR
} = require('jest-matcher-utils');
const jestMock = require('jest-mock');

const ensureMock = (received, matcherName) => {
  const message = matcherHint(`[.not].to.have.${matcherName}`, 'jest.fn()', '') +
    '\n\n' +
    `${RECEIVED_COLOR('jest.fn()')} value must be a mock function or spy.\n` +
    `${printWithType('Received',received, printReceived)}`

  if (!jestMock.isMockFunction(received)) {
    throw new Error(message);
  }
}

module.exports = ensureMock;
