module.exports = {
	build: {
		files: {
			'<%= config.dist %>/styles.css': '<%= config.src %>/styles.less',
		},
		options: {
			paths: [ '<%= config.src %>/', '.' ],
			compress: false,
			yuicompress: false,
			dumpLineNumbers: 'comments',
			optimization: 0,
			sourceMap: true,
			sourceMapFilename: "<%= config.dist %>/styles.css.map",
			sourceMapBasepath: "<%= config.dist %>/"
		},
	},
};