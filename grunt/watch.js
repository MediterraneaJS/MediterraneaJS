module.exports = {
	assemble: {
		files: [ '<%= config.src %>/**/*.{md,hbs,yml,json}' ],
		tasks: [ 'assemble' ],
	},
	css: {
		files: [ '<%= config.src %>/**/*.css' ],
		tasks: [ 'copy:css','autoprefixer' ],
	},
	images: {
		files: [ '<%= config.src %>/**/*.{jpg,png}' ],
		tasks: [ 'newer:imagemin' ],
	},
	js: {
		files: [ '<%= config.src %>/scripts.json','<%= config.src %>/**/*.js' ],
		tasks: [ 'concat:appjs' ],
	},
	less: {
		files: [ '<%= config.src %>/**/*.less' ],
		tasks: [ 'less','autoprefixer' ],
	},
	livereload: {
		options: {
			livereload: '<%= connect.options.livereload %>'
		},
		files: [
			'<%= config.src %>/**',
		]
	}
};
