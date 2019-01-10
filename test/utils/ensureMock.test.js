const expect = require('chai').expect;

const {
  matcherHint,
  printReceived,
  printWithType,
  RECEIVED_COLOR
} = require('jest-matcher-utils');

const ensureMock = require('../../lib/utils/ensureMock');

describe('ensureMock', () => {
  it('does not throw when a jest mock is passed in', () => {
    expect(() => ensureMock(jest.fn(), 'testMatcher')).to.not.throw();
  });

  const cases = [['a regular function', () => true],['a number', 3], ['a string', 'hello world'], ['an object', { foo: 'bar'}]]

  it.each(cases)('throws when %s is passed in', (testCase, arg) => {
    const expectedMessage = matcherHint(`[.not].to.have.testMatcher`, 'jest.fn()', '') +
      '\n\n' +
      `${RECEIVED_COLOR('jest.fn()')} value must be a mock function or spy.\n` +
      `${printWithType('Received',arg, printReceived)}`;

    expect(() => ensureMock(arg, 'testMatcher')).to.throw(expectedMessage);
  });
});
