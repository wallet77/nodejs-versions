'use strict'

const cache = require('../../src/utils/cache')
const assert = require('assert')

describe('Utils : cache', () => {
  describe('hasExpired', () => {

    beforeEach(() => {
      process.env.NODE_ENV = ''
    })

    afterEach(() => {
      process.env.NODE_ENV = 'test'
    })

    const filePath = '../../cache/allVersions.json'

    it('should check file has expired (default TTL)', () => {
      let res = cache.hasExpired(filePath)
      assert.equal(res, true)

      cache.allFiles[filePath] = new Date('2018-01-01')
      res = cache.hasExpired(filePath)
      assert.equal(res, true)
    })

    it('should check file has expired (custom TTL)', async () => {
      cache.allFiles[filePath] = new Date()
      let res = cache.hasExpired(filePath, 1)
      assert.equal(res, false)

      const testPromise = new Promise(function (resolve, reject) {
        setTimeout(() => {
          res = cache.hasExpired(filePath, 1)
          resolve(res)
        }, 1200)
      })

      const result = await testPromise
      assert.equal(result, true)
    })
  })

  describe('fileExists', () => {
    it('should check if file exists', async () => {
      const filePath = './test/samples/data.json'
      const res = await cache.fileExists(filePath)
      assert.equal(res, true)
    })

    it('should check if file doesn not exist', async () => {
      const filePath = './test/samples/data.js'
      const res = await cache.fileExists(filePath)
      assert.equal(res, false)
    })
  })
})
