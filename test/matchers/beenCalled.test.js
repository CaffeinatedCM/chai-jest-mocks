const chai = require('chai');
const chaiJestDiff = require('chai-jest-diff').default;
const chaiJestMocks = require('../../lib');

chai.use(chaiJestDiff())
chai.use(chaiJestMocks);

const { expect } = chai;

const ensureModk = require('../../lib/utils/ensureMock');

jest.mock('../../lib/utils/ensureMock')

describe('beenCalled assertion', () => {
  it('calls ensureMock to verify the parameter is a mock', () => {
    expect(() => {
      const mockFn = jest.fn();
      mockFn();
      expect(mockFn).to.have.beenCalled();
    }).to.not.throw();
    expect(ensureModk.mock.calls).to.have.lengthOf(1);
  });

  it('passes when the mock was called as expected', () => {
    expect(() => {
      const mockFn = jest.fn();
      mockFn();
      expect(mockFn).to.have.beenCalled();
    }).to.not.throw();
  });

  it('passes when the mock was not called as expected', () => {
    expect(() => {
      const mockFn = jest.fn();
      expect(mockFn).not.to.have.beenCalled();
    }).to.not.throw();
  })

  it('throws when the mock was not called as expected', () => {
    expect(() => {
      const mockFn = jest.fn();
      expect(mockFn).to.have.beenCalled();
    }).to.throw('\n\u001b[2mexpect(\u001b[22m\u001b[31mjest.fn()\u001b[39m\u001b[2m).to.have.beenCalled(\u001b[22m\u001b[2m)\u001b[22m\n\nExpected mock function to have been called, but it was not called.\n      ');
  });

  it('throws when the mock was called when expected not to be', () => {
    expect(() => {
      const mockFn = jest.fn();
      mockFn('test');
      expect(mockFn).not.to.have.beenCalled();
    }).to.throw('\n\u001b[2mexpect(\u001b[22m\u001b[31mjest.fn()\u001b[39m\u001b[2m).not.to.have.beenCalled(\u001b[22m\u001b[2m)\u001b[22m\n\nExpected mock function not to be called but it was called with:\n  \u001b[31m["test"]\u001b[39m\n      ');
  });
});
