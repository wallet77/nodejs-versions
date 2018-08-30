'use strict'

const controller = require('../../src/changelog')
const assert = require('assert')

describe('Controller : changelog', function () {
  describe('getVersionChangelog', function () {
    it('should get a changelog for a specific nodejs version', async () => {
      let res = await controller.getVersionChangelog('v8.9.4')
      assert.equal(res.indexOf('<a id="8.9.4">') === 0, true)

      res = await controller.getVersionChangelog('v9.0.0')
      assert.equal(res.indexOf('<a id="9.0.0">') === 0, true)
    })
  })
})
