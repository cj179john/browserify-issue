'use strict';

module.exports = function CollectorFormController($scope, runCommandService, connectServerService) {

	// function to submit the form			
	$scope.submit = function() {

        var array_ip = $scope.host;
        var params = {
            array_ip : array_ip
        };
		if ($scope.collectorForm.$valid) {
            var connect_server_promise = connectServerService.connectServer(params);
            connect_server_promise.then(function(connect_result) {
                console.log(connect_result);                
                if(true === connect_result) {
                    
                    var runCommand_promise = runCommandService.runCommand(params);
                    
                    runCommand_promise.then(function(collection_result) {
                        
                        console.log(collection_result);
                    
                    }, function(collection_error) {
                    
                        console.log(collection_error);
                    
                    });

                } else {
                    console.log(connect_result);
                }
            
            }, function(connect_error) {
            
                console.log(connect_error);
            
            });

             
		}

	};
    		
}
