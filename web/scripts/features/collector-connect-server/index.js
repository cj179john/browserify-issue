'use strict';

module.exports = angular.module('SFApp.collector-connect-server', [])
.service('ConnectServerUtilService', ['$resource', '$q', 'SYS_CONFIG', require('./services/connectServerUtilService')])
.service('ConnectServerService', ['$resource', '$q', 'SYS_CONFIG', 'ConnectServerUtilService', require('./services/connectServerService')]);