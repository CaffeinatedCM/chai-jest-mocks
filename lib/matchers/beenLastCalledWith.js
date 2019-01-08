const {
  matcherHint,
  printExpected
} = require('jest-matcher-utils');

const ensureMock = require('../utils/ensureMock');
const formatReceivedCalls = require('../utils/formatReceivedCalls');

const createBeenLastCalledWithMatcher = (_chai, utils) => {
  _chai.Assertion.overwriteMethod('beenLastCalledWith', (_super) => {
    return function (...args) {
      const obj = this._obj;
      ensureMock(obj, 'beenLastCalledWith');

      const name = obj.getMockName();

      const message = `
${matcherHint('.to.have.beenLastCalledWith', name, printExpected(args))}

Expected mock function to have been last called with ${printExpected(args)}, ${formatReceivedCalls(obj.mock.calls.slice(-1))}
      `;
      const negateMessage = `
${matcherHint('.not.to.have.beenLastCalledWith', name, printExpected(args))}

Expected mock function not to be last called with ${printExpected(args)}, but it was.
      `

      const pass = obj.mock.calls.length > 0 && utils.eql(obj.mock.calls[obj.mock.calls.length -1], args);

      this.assert(pass, message, negateMessage);
    }
  });
};

module.exports = createBeenLastCalledWithMatcher;
