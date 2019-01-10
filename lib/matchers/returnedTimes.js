const {
  matcherHint,
  EXPECTED_COLOR,
  RECEIVED_COLOR,
  pluralize
} = require('jest-matcher-utils');

const ensureMock = require('../utils/ensureMock');

const createReturnedTimesMatcher = (_chai, utils) => {
  _chai.Assertion.overwriteMethod('returnedTimes', (_super) => {
    return function (times) {
      const obj = this._obj;
      ensureMock(obj, 'returned');

      const name = obj.getMockName();

      const returnTimes = obj.mock.results.filter(result => !result.isThrow).length;
      const message = `
${matcherHint('.to.have.returnedTimes', name, times)}

Expected mock function to have returned ${EXPECTED_COLOR(pluralize('time', times))}, but it returned ${RECEIVED_COLOR(pluralize('time', returnTimes))}
      `;
      const negateMessage = `
${matcherHint('.not.to.have.returnedTimes', name, times)}

Expected mock function to not return ${EXPECTED_COLOR(pluralize('time', times))}.
      `

      this.assert(returnTimes === times , message, negateMessage);
    }
  });
};

module.exports = createReturnedTimesMatcher;
