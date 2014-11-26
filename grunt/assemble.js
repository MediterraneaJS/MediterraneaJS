module.exports = {
  options: {
    flatten: false,
    assets: '<%= config.dist %>/',
    layoutdir: '<%= config.src %>/me.layouts',
    layout: 'default.hbs',
    data: '{<%= config.src %>,<%= config.tmp %>}/*.data/*.{json,yml}',
    partials: '<%= config.src %>/*/partials/*.hbs',
    plugins: ['assemble-contrib-permalinks', 'assemble-contrib-sitemap'],
    helpers: ['handlebars-helper-slugify','handlebars-helpers','<%= config.src %>/hb.helpers/*.js'],
  },
  pages: {
    files: [{
      expand: true,
      cwd: '<%= config.src %>/',
      src: ['*.pages.root/RootPage.hbs','*.pages.*/*Page.hbs'],
      dest: '<%= config.dist %>/',

      // convert things like: me.pages.code-of-conduct/*Page.hbs -into-> code-if-conduct/index.html
      rename: function(dest, src) {
        var page;

        page = src.split('/')[0].split('.').slice(2).join('/');
        if (page === 'root') {
          page = '';
        }

        return dest +'/'+ page + '/index.html';
      },
    }],
  },
};