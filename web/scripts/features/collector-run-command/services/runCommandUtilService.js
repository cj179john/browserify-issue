'use strict';

module.exports = function RunCommandUtilService($resource, $q, config) {
        
        var cprocess = nodeRequire("child_process");
        var os = window.navigator.platform;
        var plink_version = -1 == os.indexOf('Mac')? '.\\lib\\plink.exe' : './lib/plink' ; 
 
        return {
            executeCommand: function(command, params) {
                var defer = $q.defer();
                var sshCommand = plink_version + ' -l root -pw Fus10n -ssh ' + params.array_ip;        
                cprocess.exec(sshCommand + ' ' + command, function(error, stdout, stderr) {
                if(error) {
                        defer.reject(error);      
                    }
                    defer.resolve(stdout);
                    defer.resolve(stderr);
                });
                return defer.promise;
            }
        
        };
};
