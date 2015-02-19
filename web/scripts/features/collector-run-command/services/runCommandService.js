'use strict';
	
module.exports = function RunCommandService($resource, $q, config, util) {
        
        return {
            runCommand: function(params) {
                var command = 'sysconfig -a';
                var expected_result = 'NetApp Release';
                var promise =  util.executeCommand(command, params);
                var deferred = $q.defer();

                promise.then(function(collection_data) {
                    
                    var collection_result = (-1 == collection_data.indexOf(expected_result))? 'Collection error' : collection_data;  
                    deferred.resolve(collection_result);
                
                }, function(collection_error) {
                
                    deferred.reject(collection_error);
                
                });
                return deferred.promise;
            }
        };
};
