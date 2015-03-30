'use strict';

var
  gulp = require('gulp'),
  path = require('path'),
  // Custom plugins
  render = require('./gulp-render'),
  generate = require('./gulp-generate');

var plugin = require('gulp-load-plugins')();
var paths = require('config');

gulp.task('serve', function () {
  plugin.connect.server({
    root: 'dist',
    port: 8888,
    livereload: true
  });
});

gulp.task('minify_js', function () {
  return gulp.src(paths.js + '/*.js')
    .pipe(plugin.uglify({
      output: {
        beautify: false
      }
    }))
    //.pipe(plugin.rev())
    .pipe(gulp.dest(paths.dist))
    .pipe(plugin.connect.reload());
});

gulp.task('generate-speaker-views', function () {
  return gulp.src('./speakers/*.md')
    .pipe(plugin.markdown())
    .pipe(gulp.dest(path.join(paths.views, 'people')));
});


gulp.task('clean-dist', function () {
  return gulp.src(paths.dist + '/**/*', {
      read: false
    })
    .pipe(plugin.clean());
});

gulp.task('clean-speakers', function () {
  return gulp.src(paths.data + '/speakers.json', {
      read: false
    })
    .pipe(plugin.clean());
});

gulp.task('generate-speakers', function () {
  return gulp.src('./speakers/*.md')
    .pipe(generate({
      output: 'speakers'
    }));
});

// render each 'view' with partials and layout
gulp.task('render-index', function () {
  return gulp.src(paths.views + '/index.html')
    .pipe(render({
      layout: path.join(paths.layouts, 'main.html')
    }))
    .pipe(gulp.dest(paths.dist))
    .pipe(plugin.connect.reload());
});

// render each 'view' with partials and layout
gulp.task('render-views', function () {
  return gulp.src([
    paths.views + '/team.html',
    paths.views + '/barcelona.html',
    paths.views + '/why.html',
    paths.views + '/agenda.html',
    paths.views + '/code_of_conduct.html'
  ])
    .pipe(render({
      layout: path.join(paths.layouts, 'page.html')
    }))
    .pipe(gulp.dest(paths.dist))
    .pipe(plugin.connect.reload());
});

gulp.task('render-speakers', function () {
  return gulp.src(paths.views + '/people/*.html')
    .pipe(render({
      layout: path.join(paths.layouts, 'page.html')
    }))
    .pipe(gulp.dest(path.join(paths.dist, 'people')))
    .pipe(plugin.connect.reload());
});

gulp.task('render', ['render-index', 'render-speakers', 'render-views'], function () {});

// merge JSON files
gulp.task('merge-json', ['generate-speakers'], function () {
  return gulp.src(paths.data + '/*.json')
    .pipe(plugin.jsoncombine('mediterranea.json', function (data) {
      return new Buffer(JSON.stringify(data));
    }))
    .pipe(gulp.dest(paths.dist));
});

gulp.task('copy-media', function () {
  return gulp.src([
    paths.media + '/**/*.*'
  ])
    .pipe(gulp.dest('dist/media'));
});

gulp.task('minify', ['render'], function () {
  return gulp.src('dist/**/*.html')
    .pipe(plugin.htmlmin({
      collapseWhitespace: true
    }))
    .pipe(gulp.dest('dist'));
});

gulp.task('sass', function () {
  return plugin.rubySass(paths.sass+"/mediterranea.scss", {
      sourcemap: false
    })
    .on('error', function (err) {
      console.error('Error', err.message);
    })
    .pipe(plugin.autoprefixer('last 2 version'))
    .pipe(gulp.dest('dist/'))
    .pipe(plugin.connect.reload());
});

// Rerun the task when a file changes
gulp.task('watch', function () {
  gulp.watch(paths.sass + '/**/*.scss', ['sass']);
  gulp.watch(paths.media + '/**/*.*', ['copy-media']);
  gulp.watch(paths.layouts + '/*.html', ['render']);
  gulp.watch(paths.views + '/**/*.html', ['render']);
  gulp.watch(paths.js + '/**/*.js', ['minify_js']);
});

gulp.task('deploy', function () {
  return gulp.src('./dist/**/*')
    .pipe(plugin.ghPages());
});

gulp.task('clean', ['clean-speakers', 'clean-dist'], function () {});
gulp.task('prebuild', ['merge-json'], function () {});
gulp.task('generate-views', ['generate-speaker-views'], function () {});
gulp.task('build', ['minify', 'minify_js', 'copy-media', 'sass'], function () {});
gulp.task('default', ['build', 'serve', 'watch'], function () {});
