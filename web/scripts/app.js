'use strict';

angular.module('SFApp', [
    'ngRoute',
    'ngResource',
    require('./config').name,
    require('./features/collector-connect-server').name,
    require('./features/collector-run-command').name,
    require('./features/collector-form').name,
])
.config(['$httpProvider', '$routeProvider',
    function ($httpProvider, $routeProvider) {

        $httpProvider.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

		$routeProvider
			.when('/', {
				templateUrl: 'scripts/views/collector-form.html',
				controller: 'CollectorFormController',
				title: 'Home'
			})
			.otherwise({
				redirectTo: '/'
			});
    }
])
.constant('version', require('../../package.json').version)
.run(function ($rootScope) {
    // page title
    $rootScope.$on('$routeChangeSuccess', function(e, current, pre) {
        $rootScope.title = current.title;
    });
});
