exports.config = {
	baseUrl: 'http://dockerhost:9000/#',
	seleniumAddress: 'http://192.168.59.103:4444/wd/hub',
	directConnect: false,

	specs: ['./**/*protractor.js'],

	jasmineNodeOpts: {
		showColors: true,
		defaultTimeoutInterval: 30000
	}
};
