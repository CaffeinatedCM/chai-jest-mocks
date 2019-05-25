declare module Chai {
  interface Assertion {
    beenCalled(): void;
    beenCalledTimes(times: number): void;
    beenCalledWith(...args: any[]): void;
    beenLastCalledWith(...args: any[]): void;
    beenNthCalledWith(n: number, ...args: any[]): void;
    returned(): void;
    returnedTimes(times: number): void;
  }
}