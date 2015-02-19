'use strict';

module.exports = angular.module('SFApp.collector-form', [])
.controller('CollectorFormController', ['$scope', 'RunCommandService', 'ConnectServerService', require('./controllers/collectorFormController')]);
