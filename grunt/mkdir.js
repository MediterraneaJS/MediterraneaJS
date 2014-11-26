module.exports = {
	tmp: {
		options: {
			create: ['<%= config.tmp %>/data'],
		},
	},
	dist: {
		options: {
			create: ['<%= config.dist %>'],
		},
	},
};