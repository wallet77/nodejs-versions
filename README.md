<div align="center">
<b>NodeJs versions</b><br/>
<br/><br/>

<a href="https://badge.fury.io/js/nodejs-versions">
   <img src="https://badge.fury.io/js/nodejs-versions.svg" alt="npm version" height="18">
</a>
</div>


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
| < 7.6         | no            | yes            |
| 6.x           | no            | no             |
| 4.x           | no            | no             |
| 0.12.x        | no            | no             |
| > 0.12.x      | no            | no             |

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
