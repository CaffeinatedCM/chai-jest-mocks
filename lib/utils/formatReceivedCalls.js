const {
  pluralize,
  printReceived,
  RECEIVED_COLOR
} = require('jest-matcher-utils');

const formatReceivedCalls = (calls) => {
  if (calls.length) {
    const count = calls.length - 3;
    const printedCalls = calls.slice(0, 3).map(call => printReceived(call)).join(',');
    return (
      'but it was called ' +
      'with:\n  ' +
      printedCalls +
      (count > 0
        ? '\nand ' + RECEIVED_COLOR(pluralize('more call', count)) + '.'
        : '')
    );
  } else {
    return `but it was ${RECEIVED_COLOR('not called')}.`;
  }
};

module.exports = formatReceivedCalls;
