const chai = require('chai');
const chaiJestDiff = require('chai-jest-diff').default;
const chaiJestMocks = require('../../lib');

chai.use(chaiJestDiff())
chai.use(chaiJestMocks);

const { expect } = chai;

const ensureModk = require('../../lib/utils/ensureMock');

jest.mock('../../lib/utils/ensureMock')

describe('beenCalledTimes assertion', () => {
  it('calls ensureMock to verify the parameter is a mock', () => {
    expect(() => {
      const mockFn = jest.fn();
      mockFn();
      expect(mockFn).to.have.beenCalledTimes(1);
    }).to.not.throw();
    expect(ensureModk.mock.calls).to.have.lengthOf(1);
  });
});
