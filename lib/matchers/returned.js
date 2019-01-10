const {
  matcherHint
} = require('jest-matcher-utils');

const ensureMock = require('../utils/ensureMock');

const createReturnedMatcher = (_chai, utils) => {
  _chai.Assertion.overwriteMethod('returned', (_super) => {
    return function () {
      const obj = this._obj;
      ensureMock(obj, 'returned');

      const name = obj.getMockName();

      const message = `
${matcherHint('.to.have.returned', name, '')}

Expected mock function to have returned.
      `;
      const negateMessage = `
${matcherHint('.not.to.have.returned', name, '')}

Expected mock function to not return.
      `

      this.assert(obj.mock.results.some(result => !result.isThrow), message, negateMessage);
    }
  });
};

module.exports = createReturnedMatcher;
