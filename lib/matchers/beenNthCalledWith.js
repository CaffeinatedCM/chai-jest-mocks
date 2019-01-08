const {
  matcherHint,
  printExpected
} = require('jest-matcher-utils');

const ensureMock = require('../utils/ensureMock');
const formatReceivedCalls = require('../utils/formatReceivedCalls');

const createBeenNthCalledWithMatcher = (_chai, utils) => {
  _chai.Assertion.overwriteMethod('beenNthCalledWith', (_super) => {
    return function (nth, ...args) {
      const obj = this._obj;
      ensureMock(obj, 'beenNthCalledWith');

      const name = obj.getMockName();

      const message = `
${matcherHint('.to.have.beenNthCalledWith', name, `${printExpected(nth)}, ${printExpected(args)}`)}

Expected mock function to have been ${prettyNth(nth)} called with ${printExpected(args)}, ${formatReceivedCalls(obj.mock.calls.slice(nth - 1, nth))}
      `;
      const negateMessage = `
${matcherHint('.not.to.have.beenNthCalledWith', name, `${printExpected(nth)}, ${printExpected(args)}`)}

Expected mock function not to be ${prettyNth(nth)} called with ${printExpected(args)}, but it was.
      `

      const pass = obj.mock.calls.length > 0 && utils.eql(obj.mock.calls[nth - 1], args);

      this.assert(pass, message, negateMessage);
    }
  });
};

const prettyNth = (nth) => {
  if (nth === 1) {
    return '1st';
  } else if (nth === 2) {
    return '2nd';
  } else if (nth === 3) {
    return '3rd';
  }
  return `${nth}th`;
}

module.exports = createBeenNthCalledWithMatcher;
