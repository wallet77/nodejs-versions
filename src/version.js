const compareVersions = require('compare-versions')
const moment = require('moment')
const cache = require('./utils/cache')
const constants = require('./constants')
const path = require('path')

class VersionController {
  async getAllVersionsInfo () {
    const filePath = process.env.NODE_ENV === 'test' ? path.join(__dirname, '../test/', `${constants.samplesDir}data.json`) : path.join(__dirname, '../', `${constants.cacheDir}allVersions.json`)
    const url = `https://nodejs.org/dist/index.json`

    await cache.retrieveFile(url, filePath)

    try {
      return require(filePath)
    } catch (e) {
      console.error(e)
      return null
    }
  }

  async getAllVersions () {
    const data = await this.getAllVersionsInfo()

    const response = {
      release: [],
      latest: null,
      lts: []
    }

    if (!data) return response

    for (let i = 0; i < data.length; i++) {
      const current = data[i]
      const currentRelease = {
        version: current.version,
        date: current.date
      }

      response.release.push(currentRelease)

      if (current.lts) {
        response.lts.push(currentRelease)
      }
    }

    response.latest = response.release[0]
    response.latestLTS = response.lts[0]

    return response
  }

  async getVersionsSinceDate (dateParam) {
    if (!dateParam) return console.warn('No date provided !')
    if (!moment(new Date(dateParam)).isValid()) return console.warn('Bad format date !')

    const data = await this.getAllVersionsInfo()

    if (!data) return {}

    const date = moment(dateParam)
    const response = {
      release: [],
      latest: null,
      lts: []
    }

    for (let i = 0; i < data.length; i++) {
      const current = data[i]

      const currentRelease = {
        version: current.version,
        date: current.date
      }

      if (moment(currentRelease.date).isAfter(date)) {
        response.release.push(currentRelease)

        if (current.lts) {
          response.lts.push(currentRelease)
        }
      }
    }

    response.latest = response.release[0]
    response.latestLTS = response.lts[0]

    return response
  }

  async getVersionsSinceVersion (versionParam) {
    const data = await this.getAllVersionsInfo()

    if (!data) return {}

    const version = versionParam ? versionParam.replace('v', '') : process.version
    const response = {
      release: [],
      latest: null,
      lts: []
    }

    for (let i = 0; i < data.length; i++) {
      const current = data[i]
      const currentRelease = {
        version: current.version,
        date: current.date
      }

      if (compareVersions(current.version, version) === 1) {
        response.release.push(currentRelease)

        if (current.lts) {
          response.lts.push(currentRelease)
        }
      }
    }

    response.latest = response.release[0]
    response.latestLTS = response.lts[0]

    return response
  }

  async getLatest () {
    const res = await this.getAllVersions()
    return res.latest.version
  }

  async getLatestLTS () {
    const res = await this.getAllVersions()
    return res.latestLTS.version
  }
}

module.exports = new VersionController()
