require.config({
	baseUrl: '',
	paths: {
		'angular': '../vendor/angular/angular',
		'services': 'service',
		'directives': 'directive'
	},
	shim: {
		'angular': {
			exports: 'angular'
		}
	}
});