const readline = require('readline')
const fs = require('fs')
const constants = require('./constants')
const cache = require('./utils/cache')

class ChangelogController {
  async getVersionChangelog (versionParam) {
    const version = versionParam ? versionParam.replace('v', '') : process.version
    const versionParts = version.split('.')

    const filePath = require('path').join(__dirname, '../', `${constants.cacheDir}${constants.changelogDir}CHANGELOG_V${versionParts[0]}.md`)
    const url = `https://raw.githubusercontent.com/nodejs/node/master/doc/changelogs/CHANGELOG_V${versionParts[0]}.md`

    await cache.retrieveFile(url, filePath)

    return this.extractVersion(version, filePath)
  }

  extractVersion (version, file) {
    return new Promise(resolve => {
      let start = false
      let output = ''

      const lineReader = readline.createInterface({
        input: fs.createReadStream(file)
      })

      lineReader.on('line', function (line) {
        if (start && line.indexOf('<a id="') >= 0) {
          start = false
        }

        if (line.indexOf('<a id="' + version + '"></a>') >= 0) {
          start = true
        }

        if (start) {
          output += line + '<br/>'
        }
      })

      lineReader.on('close', function () {
        resolve(output)
      })
    }).catch(function (e) {
      throw new Error('Error when extracting version : ' + e.message)
    })
  }
}

module.exports = new ChangelogController()
