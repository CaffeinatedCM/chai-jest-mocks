const {
  matcherHint,
  pluralize,
  RECEIVED_COLOR,
  EXPECTED_COLOR
} = require('jest-matcher-utils');

const ensureMock = require('../utils/ensureMock');

const createBeenCalledTimesMatcher = (_chai, utils) => {
  _chai.Assertion.overwriteMethod('beenCalledTimes', (_super) => {
    return function (times) {
      const obj = this._obj;
      ensureMock(obj, 'beenCalledTimes');

      const name = obj.getMockName();

      const message = `
${matcherHint('.to.have.beenCalledTimes', name, times)}

Expected mock function to have been called ${EXPECTED_COLOR(pluralize('time', times))}, but it was called ${RECEIVED_COLOR(pluralize('time',obj.mock.calls.length))}.
      `;
      const negateMessage = `
${matcherHint('.not.to.have.beenCalledTimes', name, times)}

Expected mock function not to be called ${EXPECTED_COLOR(pluralize('time', times))}, but it was called exactly ${RECEIVED_COLOR(pluralize('time',obj.mock.calls.length))}.
      `
      this.assert(obj.mock.calls.length === times, message, negateMessage);
    }
  });
};

module.exports = createBeenCalledTimesMatcher;
