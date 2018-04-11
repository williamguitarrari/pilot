// eslint-disable-next-line import/no-extraneous-dependencies
const diff = require('jest-diff')
const { equals } = require('ramda')

expect.extend({
  toBeJsonEqual (received, expected) {
    const rec = JSON.parse(JSON.stringify(received))
    const exp = JSON.parse(JSON.stringify(expected))

    const pass = equals(rec, exp)

    const message = pass
      ? null
      : () => {
        const diffString = diff(exp, rec, { expand: this.expand })

        return `
          Expected object to be:
          ${this.utils.printExpected(exp)}\n
          Received:\n
          ${this.utils.printReceived(rec)}\n\n
          Difference:\n\n
          ${diffString}
        `
      }

    return { pass, message }
  },
})
