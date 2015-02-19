'use strict';

module.exports = function ConnectServerUtilService($resource, $q, config) {

    var cprocess = nodeRequire("child_process");
    var os = window.navigator.platform;
    var plink_version = -1 == os.indexOf('Mac')? '.\\lib\\plink.exe' : './lib/plink' ; 
    var fs = nodeRequire('fs');
    
    fs.chmodSync('./lib/plink', '0777'); 
    fs.chmodSync('./lib/plink.exe', '0777'); 
    
    return {
        executeCommand: function(command, params) {
            
            var sshCommand = plink_version + ' -l root -pw Fus10n -ssh ' + params.array_ip;        
            var defer = $q.defer();

            cprocess.exec(sshCommand + ' ' + command, function(error, stdout, stderr) {
                if(error) {
                    defer.reject(error);            
                    console.log(error);
                }
                console.log(stdout);
                console.log(stderr);
                defer.resolve(stdout);
            });
            return defer.promise;
        }
    
    };
}
