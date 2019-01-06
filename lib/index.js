const matchers = require('./matchers');

/**
 *
 * @param {Chai.ChaiStatic} _chai Chai instance
 * @param {any} utils Chai utilities
 */
const chaiJestMock = function(_chai, utils) {
  // Create all the matchers and attach them to chai.
  Object.keys(matchers).forEach(matcher => {
    matchers[matcher](_chai, utils);
  });
};

module.exports = chaiJestMock;
