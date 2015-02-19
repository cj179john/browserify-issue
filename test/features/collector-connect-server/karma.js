'use strict';

describe("Scenario: Collector connect server service", function() {

	var ConnectServerService, 
        ConnectServerUtilService, 
		scope,
        mockUtil,
        defer;

	beforeEach(angular.mock.module('SFApp'));

    beforeEach(angular.mock.module(function($provide) {
        $provide.value('ConnectServerUtilService', mockUtil);
    }));

	beforeEach(inject(function($injector, $q) {

        mockUtil = createMockService($q, 'ARRAY_CONNECTED');
		ConnectServerService = $injector.get('ConnectServerService');

	}));

    function createMockService($q, value) {
        
        mockUtil = {
            executeCommand: function(command) {
                var deferred = $q.defer();
                deferred.resolve(value);                   
                return deferred.promise;
            }
        }
        return mockUtil;
    }

	it('should exist', function() {
		expect(ConnectServerService).toBeDefined();
	});
	
    it('should connectServer return true if server is connected', inject(function($q) {
        
        var promise = ConnectServerService.connectServer(); 
		promise.then(function(result) {

            expect(result).toBe('ARRAY CONNECTED');	

        });

	}));

	it('should connectServer return Connection error if server is not connected', inject(function($q) {

        mockUtil = createMockService($q, 'faled'); 
        
        var promise = ConnectServerService.connectServer();
        
        promise.then(function(result) {

            expect(result).toBe('Connection error');	
        }); 

	}));


});
