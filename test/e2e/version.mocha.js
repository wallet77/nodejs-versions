const index = require('../../index')
const assert = require('assert')

describe('E2E : version', function () {
  describe('getLatest', function () {
    it('should get latest version', async () => {
      let res = await index.versions.getLatest()
      assert.equal(res, 'v9.3.0')
    })
  })

  describe('getLatestLTS', function () {
    it('should get latest LTS', async () => {
      let res = await index.versions.getLatestLTS()
      assert.equal(res, 'v8.9.4')
    })
  })
})
