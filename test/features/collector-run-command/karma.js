'use strict';

describe("Scenario: Collector run commands remotely service successfully", function() {

	var RunCommandService, 
        RunCommandUtilService, 
        mockUtil,
        rootScope,
        deferred,
        $q;

	beforeEach(angular.mock.module('SFApp'));
	beforeEach(angular.mock.module('SFApp.collector-run-command'));
    beforeEach(angular.mock.module(function($provide) {
        $provide.value('RunCommandUtilService', mockUtil);
    }));

	beforeEach(inject(function($injector, _$q_, _$rootScope_) {

        $q = _$q_;
        deferred = $q.defer();
        rootScope = _$rootScope_; 

		RunCommandService = $injector.get('RunCommandService');
        RunCommandUtilService = $injector.get('RunCommandUtilService');
        
        mockUtil = {
            executeCommand : function() {
                deferred = $q.defer();
                deferred.resolve('NetApp Release 7.3.6: Thu Jul  7 02:02:45 PDT 2011');
                return deferred.promise;       
            }
        };
	}));

	it('should exist', function() {

		expect(RunCommandService).toBeDefined();

	});
	
    it('should runCommand return expected text if the command run successfully', function() {
        var params = {
            array_ip : '192.168.100.248' 
        }; 
        var promise = RunCommandService.runCommand(params);
        var command_run_result;

        promise.then(function(success) {
            command_run_result = success;
        });
        
        rootScope.$apply();
        
        expect(command_run_result).toEqual('NetApp Release 7.3.6: Thu Jul  7 02:02:45 PDT 2011');	
	});

	it('should connectServer return Connection error if server is not connected', function() {

        var promise = RunCommandService.runCommand();    
        var command_run_result;

        promise.then(function(success) {
            command_run_result = success;
        });

        rootScope.$apply();    

        expect(command_run_result).toEqual('Collection error');	
    });
    
});
