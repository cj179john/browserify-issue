'use strict';

describe('Feature: sf-config ', function () {

	beforeEach(angular.mock.module('SFApp.sf-config'));

	it('should be defined', inject(function($injector) {

		try {
			var config = $injector.get('SYS_CONFIG');	
		} catch(e) { }

		expect(config).toBeDefined();

	}));

	it('should provide collector-base-address', inject(function($injector) {

		var config = $injector.get('SYS_CONFIG');	

		expect(Object.keys(config).indexOf('BASE_ADDRESS')).toBe(0);

	}));
});
