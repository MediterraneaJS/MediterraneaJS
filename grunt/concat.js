var config = require('./config.js');
var scripts = require('../' + config.src + '/scripts.json');

module.exports = {
	'appjs': {
		src: scripts.filter(function(filepath) { return filepath.indexOf('bower_components/') !== 0; }).map(function(filepath) { return config.src +'/'+ filepath; }),
		dest: '<%= config.dist %>/appjs.js',
	},
	'componentsjs': {
		src: scripts.filter(function(filepath) { return filepath.indexOf('bower_components/') === 0; }),
		dest: '<%= config.dist %>/components.js',
	},
	options: {
		sourceMap: true,
		process: function(src, filepath) {
			return '/* --------------- '+filepath+' */ ' + src;
		},
	},
};