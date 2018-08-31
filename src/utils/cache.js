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
    if (!this.allFiles.hasOwnProperty(filePath)) {
      return true
    }

    if (moment().diff(moment(this.allFiles[filePath]), 'seconds', true) >= TTL) {
      return true
    }

    return false
  }

  async requestFileOnline (url, filePath) {
    return new Promise((resolve, reject) => {
      https.get(url, res => {
        let data = ''

        // Concat chunk of data
        res.on('data', (chunk) => {
          data += chunk
        })

        res.on('end', () => {
          fs.writeFile(filePath, data, 'utf8', err => {
            console.log(err)
            if (err) {
              return reject(err)
            }

            this.allFiles[filePath] = new Date()
            resolve()
          })
        })
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
