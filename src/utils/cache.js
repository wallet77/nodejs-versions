const fs = require('fs')
const https = require('https')
const moment = require('moment')
const constants = require('../constants')

class CacheSystem {
  constructor () {
    this.allFiles = {}
  }

  async retrieveFile (url, filePath) {
    const fileExists = await this.fileExists(filePath)
    if (!fileExists || this.hasExpired(filePath)) {
      await this.requestFileOnline(url, filePath)
    }
  }

  hasExpired (filePath, TTL) {
    if (process.env.NODE_ENV === 'test') return false

    TTL = TTL || constants.TTL
    if (!Object.prototype.hasOwnProperty.call(this.allFiles, filePath)) {
      return true
    }

    if (moment().diff(moment(this.allFiles[filePath]), 'seconds', true) >= TTL) {
      return true
    }

    return false
  }

  async requestFileOnline (url, filePath) {
    return new Promise((resolve, reject) => {
      const req = https.get(url, res => {
        let data = ''

        // Concat chunk of data
        res.on('data', (chunk) => {
          data += chunk
        })

        res.on('end', () => {
          fs.writeFile(filePath, data, 'utf8', err => {
            if (err) {
              return reject(err)
            }

            this.allFiles[filePath] = new Date()
            resolve()
          })
        })

        res.on('error', err => {
          reject(err)
        })
      })

      req.setTimeout(parseInt(process.env.REQ_TIMEOUT) || constants.timeout, () => {
        reject(new Error(`Request timeout for file ${url}`))
      })
    })
  }

  async fileExists (filePath) {
    return new Promise((resolve, reject) => {
      fs.access(filePath, fs.constants.R_OK, err => {
        if (err) {
          resolve(false)
        } else {
          resolve(true)
        }
      })
    })
  }
}

module.exports = new CacheSystem()
