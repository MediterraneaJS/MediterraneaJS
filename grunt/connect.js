module.exports = {

  options: {
    port: 9363,
    livereload: 19363,
    hostname: '0.0.0.0',
  },
  livereload: {
    options: {
      open: true,
      base: [
        '<%= config.dist %>',
      ]
    }
  },

};