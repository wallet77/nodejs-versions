const index = require('../../index')
const assert = require('assert')

describe('E2E : version', function () {
  describe('getLatest', function () {
    it('should get latest version', async () => {
      const res = await index.versions.getLatest()
      assert.equal(res, 'v9.3.0')
    })
  })

  describe('getLatestLTS', function () {
    it('should get latest LTS', async () => {
      const res = await index.versions.getLatestLTS()
      assert.equal(res, 'v8.9.4')
    })
  })

  describe('getVersionsSinceVersion', function () {
    it('should get all versions since current one', async () => {
      const res = await index.versions.getVersionsSinceVersion('v9.2.0')
      assert.equal(res.release[0].version, 'v9.3.0')
      assert.equal(res.release[0].date, '2017-12-12')

      const res2 = await index.versions.getVersionsSinceVersion()

      assert.deepEqual(res2.latest, undefined)
      assert.deepEqual(res2.release.length, 0)
    })
  })

  describe('getVersionsSinceDate', function () {
    it('should return an error cause no date', async () => {
      let res = await index.versions.getVersionsSinceDate()

      assert.deepEqual(res, undefined)

      res = await index.versions.getVersionsSinceDate('toto')
      assert.deepEqual(res, undefined)
    })
  })

  describe('With promises', function () {
    it('should get latest version', (done) => {
      index.versions.getLatestLTS().then((latest) => {
        assert.equal(latest, 'v8.9.4')
        done()
      })
    })
  })
})
