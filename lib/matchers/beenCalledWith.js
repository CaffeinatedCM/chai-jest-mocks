const {
  matcherHint,
  printExpected
} = require('jest-matcher-utils');

const ensureMock = require('../utils/ensureMock');
const formatReceivedCalls = require('../utils/formatReceivedCalls');


const createBeenCalledWithMatcher = (_chai, utils) => {
  _chai.Assertion.overwriteMethod('beenCalledWith', (_super) => {
    return function (...args) {
      const obj = this._obj;
      ensureMock(obj, 'beenCalledWith');

      const name = obj.getMockName();

      const message = `
${matcherHint('.to.have.beenCalledWith', name, printExpected(args))}

Expected mock function to have been called with ${printExpected(args)}, ${formatReceivedCalls(obj.mock.calls)}
      `;
      const negateMessage = `
${matcherHint('.not.to.have.beenCalledWith', name, printExpected(args))}

Expected mock function not to be called with ${printExpected(args)}, but it was.
      `

      const pass = obj.mock.calls.reduce((result, call) => {
        if (result) {
          return true;
        }

        return utils.eql(call, args);
      }, false);

      this.assert(pass, message, negateMessage);
    }
  });
};

module.exports = createBeenCalledWithMatcher;
