module.exports = {
	options: {
		onlyIf: 'modified'
	},
	favicon: {
		src: '<%= config.src %>/favicon.ico',
		dest: '<%= config.dist %>/favicon.ico'
	},
	fonts: {
		src: 'bower_components/*/fonts/*',
		dest: '<%= config.dist %>/'
	},
	svg: {
		expand: true,
		cwd: '<%= config.src %>',
		dest: '<%= config.dist %>',
		src: '**/*.svg'
	},
	cname: {
		src: '<%= config.src %>/CNAME',
		dest: '<%= config.dist %>/CNAME'
	}
};
