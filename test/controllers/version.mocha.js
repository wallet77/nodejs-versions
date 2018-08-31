'use strict'

const controller = require('../../src/version')
const cache = require('../../src/utils/cache')
const path = require('path')
const assert = require('assert')

function checkJson (res) {
  assert.equal(res.hasOwnProperty('latestLTS'), true)
  assert.equal(res.latestLTS.hasOwnProperty('version'), true)
  assert.equal(res.latestLTS.hasOwnProperty('date'), true)
  assert.equal(res.hasOwnProperty('latest'), true)
  assert.equal(res.latest.hasOwnProperty('version'), true)
  assert.equal(res.latest.hasOwnProperty('date'), true)

  assert.equal(res.hasOwnProperty('lts'), true)
  assert.equal(res.lts.length > 0, true)
  assert.equal(res.hasOwnProperty('release'), true)
  assert.equal(res.release.length > 0, true)
}

describe('Controller : version', function () {
  describe('getAllVersions', function () {
    it('should get all versions of nodejs', async () => {
      let res = await controller.getAllVersions()
      checkJson(res)
    })
  })

  describe('getVersionsSinceDate', function () {
    it('should get all versions of nodejs since a date', async () => {
      let res = await controller.getVersionsSinceDate('2018-01-01')
      checkJson(res)
    })
  })

  describe('getVersionsSinceVersion', function () {
    it('should get all versions of nodejs since a date', async () => {
      let res = await controller.getVersionsSinceVersion('7.0.0')
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
    })

    it('should get all versions of nodejs (with real file)', async () => {
      let res = await controller.getAllVersions()
      checkJson(res)
    })
  })
})
