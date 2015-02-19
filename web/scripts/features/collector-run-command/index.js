'use strict';

module.exports = angular.module('SFApp.collector-run-command', [])
.service('RunCommandUtilService', ['$resource', '$q', 'SYS_CONFIG', require('./services/runCommandUtilService')])
.service('RunCommandService', ['$resource', '$q', 'SYS_CONFIG', 'RunCommandUtilService', require('./services/runCommandService')]);
