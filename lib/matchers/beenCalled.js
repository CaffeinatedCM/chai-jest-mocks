const {
  matcherHint
} = require('jest-matcher-utils');

const ensureMock = require('../utils/ensureMock');
const formatReceivedCalls = require('../utils/formatReceivedCalls');


const createBeenCalledMatcher = (_chai, utils) => {
  _chai.Assertion.overwriteMethod('beenCalled', (_super) => {
    return function () {
      const obj = this._obj;
      ensureMock(obj, 'beenCalled');

      const name = obj.getMockName();

      const message = `
${matcherHint('.to.have.beenCalled', name, '')}

Expected mock function to have been called, but it was not called.
      `;
      const negateMessage = `
${matcherHint('.not.to.have.beenCalled', name, '')}

Expected mock function not to be called ${formatReceivedCalls(obj.mock.calls)}
      `
      this.assert(obj.mock.calls.length > 0, message, negateMessage);
    }
  });
};

module.exports = createBeenCalledMatcher;
