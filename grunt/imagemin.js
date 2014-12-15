module.exports = {
	all: {
		files: [{
			expand: true,
			cwd: '<%= config.src %>',
			dest: '<%= config.dist %>',
			src: [ '**/*.{jpg,png}' ],
		}],
	},
};
