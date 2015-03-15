'use strict';

var
  gulp = require('gulp'),
  sass = require('gulp-ruby-sass'),
  htmlmin = require('gulp-htmlmin'),
  markdown = require('gulp-markdown'),
  connect = require('gulp-connect'),
  render = require('./gulp-render'),
  generate = require('./gulp-generate'),
  uglify = require('gulp-uglify'),
  path = require('path'),
  rev = require('gulp-rev'),
  clean = require('gulp-clean'),
  jsoncombine = require('gulp-jsoncombine'),
  autoprefixer = require('gulp-autoprefixer');

var paths = {
  sass: './assets/sass',
  media: './assets/media',
  js: './assets/js',
  data: './data',
  views: './views',
  layouts: './layouts',
  dist: './dist'
};

gulp.task('serve', function () {
  connect.server({
    root: 'dist',
    port: 8888,
    livereload: true
  });
});

gulp.task('minify_js', function () {
  gulp.src(paths.js + '/mediterranea.js')
    .pipe(uglify({
      output: {
        beautify: false
      }
    }))
    //.pipe(rev())
    .pipe(gulp.dest(paths.dist))
    .pipe(connect.reload());
});

gulp.task('generate-speaker-views', function () {
  return gulp.src('./speakers/*.md')
    .pipe(markdown())
    .pipe(gulp.dest(path.join(paths.views, 'speakers')));
});


gulp.task('clean-dist', function () {
  return gulp.src(paths.dist + '/**/*', {
      read: false
    })
    .pipe(clean());
});

gulp.task('clean-speakers', function () {
  return gulp.src(paths.data + '/speakers.json', {
      read: false
    })
    .pipe(clean());
});

gulp.task('generate-speakers', function () {
  gulp.src('./speakers/*.md')
    .pipe(generate({
      output: 'speakers'
    }));
});

// render each 'view' with partials and layout
gulp.task('render-views', function () {
  gulp.src(paths.views + '/**/*.html')
    .pipe(render({
      layout: path.join(paths.layouts, 'main.html')
    }))
    .pipe(gulp.dest(paths.dist))
    .pipe(connect.reload());
});

// merge JSON files
gulp.task('merge-json', ['generate-speakers'], function () {
  gulp.src(paths.data + '/*.json')
    .pipe(jsoncombine('mediterranea.json', function (data) {
      return new Buffer(JSON.stringify(data));
    }))
    .pipe(gulp.dest(paths.dist));
});

gulp.task('copy-media', function () {
  gulp.src([
    paths.media + '/**/*.jpg',
    paths.media + '/**/*.mp4',
    paths.media + '/**/*.png'
  ])
    .pipe(gulp.dest('dist/media'));
});

gulp.task('minify', ['render-views'], function () {
  gulp.src('dist/*.html')
    .pipe(htmlmin({
      collapseWhitespace: true
    }))
    .pipe(gulp.dest('dist'));
});

gulp.task('sass', function () {
  return sass(paths.sass, {
      sourcemap: false
    })
    .on('error', function (err) {
      console.error('Error', err.message);
    })
    .pipe(autoprefixer('last 2 version'))
    .pipe(gulp.dest('dist/'))
    .pipe(connect.reload());
});

// Rerun the task when a file changes
gulp.task('watch', function () {
  gulp.watch(paths.sass + '/**/*.scss', ['sass']);
  gulp.watch(paths.media + '/**/*.*', ['copy-media']);
  gulp.watch(paths.layouts + '/*.html', ['render-views']);
  gulp.watch(paths.views + '/**/*.html', ['render-views']);
  gulp.watch(paths.js + '/**/*.js', ['minify_js']);
});

gulp.task('clean', ['clean-speakers', 'clean-dist'], function () {});
gulp.task('prebuild', ['merge-json'], function () {});
gulp.task('generate-views', ['generate-speaker-views'], function () {});
gulp.task('build', ['minify', 'minify_js', 'copy-media', 'sass'], function () {});
gulp.task('default', ['build', 'serve', 'watch'], function () {});
