// main.js
// -------
// See requirejs.org/
// Requires `require`, `define`

require.config({
	baseUrl : './',
	locale : 'en-us',
	config : {
		text : {
			useXhr : function(url, protocol, hostname, port) {
				return true;
			}
		}
	},
	paths : {
		// Libraries
		'backbone' : ['app/libs/backbone'],
		'underscore' : ['app/libs/underscore'],
		'jquery' : 'app/libs/jquery.1.10.2.min',

		// Plugins
		'bootstrap' : ['app/libs/bootstrap.min'],
		'text'      : ['app/libs/text'],
		// Should be used as required dependencies with use of `define`,
		'models' : ['app/js/models'],
		'views' : ['app/js/views'],
		'collections' : ['app/js/collections'],
		
		// Application - bootstrap for frontend app
		'application' : ['app/app']

	},
	shim : {
		'jquery' : {
			exports : '$'
		},
		'facade' : {
			deps : ['jquery']
		},
		'underscore' : {
			exports : '_',
			deps : ['jquery']
		},
		'backbone' : {
			deps : ['underscore', 'jquery'],
			exports : 'Backbone'
		}
	},
	priority : ['text', 'models', 'views', 'collections', 'controller'],
	jquery : '1.10.2',
	waitSeconds : 60
});

// initializing the router "application" on startup
define(['require', 'backbone', 'underscore', 'jquery', 'application'], function(require, Backbone, _, $, app) {
	$(document).ready(function() {
		App = {};
		App.routing = new app();
		Backbone.history.start({});
	});
}); 