'use strict';

describe("Scenario: CollectorFormController", function() {

	var CollectorFormController, $scope, $rootScope, $injector;

	beforeEach(angular.mock.module('SFApp'));

	beforeEach(inject(function ($controller, $rootScope, $injector) { 
		$scope = $rootScope.$new(); 
		CollectorFormController = $controller('CollectorFormController', { 
			$scope: $scope 
		}); 
	}));

	it('should exist', function() {
		expect(CollectorFormController).toBeDefined();
	});

});