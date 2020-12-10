<div align="center">
<b>NodeJs versions</b><br/>
<br/><br/>
</div>

[![GitHub release](https://badge.fury.io/js/nodejs-versions.svg)](https://github.com/wallet77/nodejs-versions/releases/)
[![GitHub license](https://img.shields.io/github/license/wallet77/nodejs-versions)](https://github.com/wallet77/nodejs-versions/blob/master/LICENSE)
[![CI pipeline](https://github.com/wallet77/nodejs-versions/workflows/Node.js%20CI/badge.svg)](https://github.com/wallet77/nodejs-versions/actions?query=workflow%3A%22Node.js+CI%22)
[![Code coverage](https://codecov.io/gh/wallet77/nodejs-versions/branch/master/graph/badge.svg)](https://codecov.io/gh/wallet77/nodejs-versions)
[![Opened issues](https://img.shields.io/github/issues-raw/wallet77/nodejs-versions)](https://github.com/wallet77/nodejs-versions/issues)
[![Opened PR](https://img.shields.io/github/issues-pr-raw/wallet77/nodejs-versions)](https://github.com/wallet77/nodejs-versions/pulls)
[![DeepScan grade](https://deepscan.io/api/teams/12061/projects/15019/branches/292504/badge/grade.svg)](https://deepscan.io/dashboard#view=project&tid=12061&pid=15019&bid=292504)

![DeepScan grade](https://img.shields.io/david/wallet77/nodejs-versions)

# Purpose

This module basically returns information about NodeJs release since : 
* a specific version
* a specific date
If you don't provide a version it will take into account process.version as current version.

Only 2 dependencies.

# Compatibility

Supported and tested : >= 8.x

| Version       | Supported     | Tested         |
| ------------- |:-------------:|:--------------:|
| 9.x           | yes           | yes            |
| 8.x           | yes           | yes            |
| >= 7.6        | yes           | yes            |

**/!\ This module use async/await, this is why you must have node 7.6+.**

# Installation

```console
$ npm install nodejs-versions --save
```

# Usage

## Basic usage
```javascript
const NodeVersions = require('nodejs-versions');
const latest = await NodeVersions.versions.getLatestLTS();

console.log(latest);
```

Or with promise like 

```javascript
const NodeVersions = require('nodejs-versions');
NodeVersions.versions.getLatestLTS().then((latest) => {
  console.log(latest);
})

```

## Methods

### versions.getAllVersions()

Returns all NodeJs versions with their information.


### versions.getVersionsSinceDate(date)

Returns all releases since a specific date.

#### date
Type: `Date`

A string value that is a date or a date Object


### versions.getVersionsSinceVersion(version)

Returns all releases since a specific version.

#### version
Type: `String`
Default value: process.version

A string value that is a valid version.
Example : 'v2.0.0' or '8.9.4'


### versions.getLatest()

Returns latest NodeJs version


### versions.getLatestLTS()

Returns latest LTS


### changelog.getVersionChangelog(version)

Returns changelog of a specific version.

#### version
Type: `String`
Default value: process.version

A string value that is a valid version.
Example : 'v2.0.0' or '8.9.4'

# Test

```console
$ npm test
```

To generate coverage :

```console
$ npm run test-coverage
```

Coverage report can be found in coverage/.
