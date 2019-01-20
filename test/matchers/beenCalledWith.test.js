const chai = require('chai');
const chaiJestDiff = require('chai-jest-diff').default;
const chaiJestMocks = require('../../lib');

chai.use(chaiJestDiff())
chai.use(chaiJestMocks);

const { expect } = chai;

const ensureModk = require('../../lib/utils/ensureMock');

jest.mock('../../lib/utils/ensureMock')

describe('beenCalledWith assertion', () => {
  it('calls ensureMock to verify the parameter is a mock', () => {
    expect(() => {
      const mockFn = jest.fn();
      mockFn();
      expect(mockFn).to.have.beenCalledWith();
    }).to.not.throw();
    expect(ensureModk.mock.calls).to.have.lengthOf(1);
  });

  it('passes when the mock function was called with the specified parameters', () => {
    expect(() => {
      const mockFn = jest.fn();
      mockFn('hello', 'world');
      expect(mockFn).to.have.beenCalledWith('hello', 'world');
    }).to.not.throw();
  });

  it('passes when the mock function was called with the specified parameters at least once', () => {
    expect(() => {
      const mockFn = jest.fn();
      mockFn('hello', 'world');
      mockFn('goodbye', 'world');
      mockFn('hello', 'test');
      expect(mockFn).to.have.beenCalledWith('hello', 'world');
    }).to.not.throw();
  });

  it('passes when the mock function was not called with the specified not parameters', () => {
    expect(() => {
      const mockFn = jest.fn();
      mockFn('hello', 'test');
      expect(mockFn).not.to.have.beenCalledWith('hello', 'world');
    }).to.not.throw();
  });

  it('throws when the mock function was not called with the specified parameters', () => {
    expect(() => {
      const mockFn = jest.fn();
      mockFn('hello', 'test');
      expect(mockFn).to.have.beenCalledWith('hello', 'world');
    }).to.throw('\n\u001b[2mexpect(\u001b[22m\u001b[31mjest.fn()\u001b[39m\u001b[2m).to.have.beenCalledWith(\u001b[22m\u001b[32m\u001b[32m["hello", "world"]\u001b[32m\u001b[39m\u001b[2m)\u001b[22m\n\nExpected mock function to have been called with \u001b[32m["hello", "world"]\u001b[39m, but it was called with:\n  \u001b[31m["hello", "test"]\u001b[39m\n      ');
  });

  it('throws when the mock function was called with the expect specified not parameters', () => {
    expect(() => {
      const mockFn = jest.fn();
      mockFn('hello', 'world');
      expect(mockFn).not.to.have.beenCalledWith('hello', 'world');
    }).to.throw('\n\u001b[2mexpect(\u001b[22m\u001b[31mjest.fn()\u001b[39m\u001b[2m).not.to.have.beenCalledWith(\u001b[22m\u001b[32m\u001b[32m["hello", "world"]\u001b[32m\u001b[39m\u001b[2m)\u001b[22m\n\nExpected mock function not to be called with \u001b[32m["hello", "world"]\u001b[39m, but it was.\n      ');
  });
});
