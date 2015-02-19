'use strict';

module.exports = angular.module('SFApp.sf-config', [ ])
.constant('SYS_CONFIG', {
    BASE_ADDRESS: 'http://0.0.0.0:8002', 
    ARRAY_IP: '192.168.100.238',
    OUTPUT_FILE: 'test.txt'
});