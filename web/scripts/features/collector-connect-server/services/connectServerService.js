'use strict';

module.exports = function ConnectServerService($resource, $q, config, util) {

    return {
        connectServer: function(params) {
            var command = 'echo ARRAY CONNECTED';
            var promise = util.executeCommand(command, params);   
            var expected_result = 'ARRAY CONNECTED';
            var result = $q.defer();                

            promise.then(function(connection_status) {
                console.log(connection_status); 
                var connection_result = connection_status.trim() == expected_result? true : 'Connection error';
                result.resolve(connection_result); 
            });
                        
            return result.promise;
        }
    };
    
}
