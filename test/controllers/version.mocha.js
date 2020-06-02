'use strict'

const controller = require('../../src/version')
const cache = require('../../src/utils/cache')
const path = require('path')
const assert = require('assert')

function checkJson (res) {
  assert.equal(Object.prototype.hasOwnProperty.call(res, 'latestLTS'), true)
  assert.equal(Object.prototype.hasOwnProperty.call(res.latestLTS, 'version'), true)
  assert.equal(Object.prototype.hasOwnProperty.call(res.latestLTS, 'date'), true)
  assert.equal(Object.prototype.hasOwnProperty.call(res, 'latest'), true)
  assert.equal(Object.prototype.hasOwnProperty.call(res.latest, 'version'), true)
  assert.equal(Object.prototype.hasOwnProperty.call(res.latest, 'date'), true)

  assert.equal(Object.prototype.hasOwnProperty.call(res, 'lts'), true)
  assert.equal(res.lts.length > 0, true)
  assert.equal(Object.prototype.hasOwnProperty.call(res, 'release'), true)
  assert.equal(res.release.length > 0, true)
}

describe('Controller : version', function () {
  describe('getAllVersions', function () {
    it('should get all versions of nodejs', async () => {
      const res = await controller.getAllVersions()
      checkJson(res)
    })
  })

  describe('getVersionsSinceDate', function () {
    it('should get all versions of nodejs since a date', async () => {
      const res = await controller.getVersionsSinceDate('2018-01-01')
      checkJson(res)
    })
  })

  describe('getVersionsSinceVersion', function () {
    it('should get all versions of nodejs since a date', async () => {
      const res = await controller.getVersionsSinceVersion('7.0.0')
      checkJson(res)
    })
  })

  describe('getAllVersions', function () {
    beforeEach(() => {
      process.env.NODE_ENV = ''
    })

    afterEach(() => {
      const filePath = path.join(__dirname, '../../cache/allVersions.json')
      cache.allFiles[filePath] = new Date('2018-01-01')
      process.env.NODE_ENV = 'test'
      delete process.env.REQ_TIMEOUT
    })

    it('should get all versions of nodejs (with real file)', async () => {
      const res = await controller.getAllVersions()
      checkJson(res)
    })

    it('should try to get all versions but failed cause timeout', async () => {
      process.env.REQ_TIMEOUT = 10
      const res = await controller.getAllVersions()
      assert.equal(res.release.length, 0)
      assert.equal(res.lts.length, 0)
      assert.equal(res.latest, null)
    })
  })
})
