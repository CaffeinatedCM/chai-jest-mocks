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

  it('passes when the mock was called the expected number of times', () => {
    expect(() => {
      const mockFn = jest.fn();
      mockFn();
      mockFn();
      expect(mockFn).to.have.beenCalledTimes(2);
    }).to.not.throw();
  });

  it('passes when the mock was called less than the specified not number of times', () => {
    expect(() => {
      const mockFn = jest.fn();
      mockFn();
      expect(mockFn).not.to.have.beenCalledTimes(2);
    }).to.not.throw();
  });

  it('passes when the mock was called more than the specified not number of times', () => {
    expect(() => {
      const mockFn = jest.fn();
      mockFn();
      mockFn();
      mockFn();
      expect(mockFn).not.to.have.beenCalledTimes(2);
    }).to.not.throw();
  });

  it('throws when the mock was called less than the expected number of times', () => {
    expect(() => {
      const mockFn = jest.fn();
      mockFn();
      expect(mockFn).to.have.beenCalledTimes(2);
    }).to.throw('\n\u001b[2mexpect(\u001b[22m\u001b[31mjest.fn()\u001b[39m\u001b[2m).to.have.beenCalledTimes(\u001b[22m\u001b[32m2\u001b[39m\u001b[2m)\u001b[22m\n\nExpected mock function to have been called \u001b[32mtwo times\u001b[39m, but it was called \u001b[31mone time\u001b[39m.\n      ');
  });

  it('throws when the mock was called more than the expected number of times', () => {
    expect(() => {
      const mockFn = jest.fn();
      mockFn();
      mockFn();
      mockFn();
      expect(mockFn).to.have.beenCalledTimes(2);
    }).to.throw('\n\u001b[2mexpect(\u001b[22m\u001b[31mjest.fn()\u001b[39m\u001b[2m).to.have.beenCalledTimes(\u001b[22m\u001b[32m2\u001b[39m\u001b[2m)\u001b[22m\n\nExpected mock function to have been called \u001b[32mtwo times\u001b[39m, but it was called \u001b[31mthree times\u001b[39m.\n      ');
  });

  it('throws when the mock was called exactly the specified not number of times', () => {
    expect(() => {
      const mockFn = jest.fn();
      mockFn();
      mockFn();
      expect(mockFn).not.to.have.beenCalledTimes(2);
    }).to.not.throw('AssertionError: \n\u001b[2mexpect(\u001b[22m\u001b[31mjest.fn()\u001b[39m\u001b[2m).not.to.have.beenCalledTimes(\u001b[22m\u001b[32m2\u001b[39m\u001b[2m)\u001b[22m\n\nExpected mock function not to be called \u001b[32mtwo times\u001b[39m, but it was called exactly \u001b[31mtwo times\u001b[39m.\n      ');
  });
});
