'use strict';

var gulp = require('gulp');
var webpack = require('webpack');
var plugins = require('gulp-load-plugins')();
var scripts = {
      entry: './src/js/main.js',
      output: './js/main.js',
      src: './src/js/**',
      dest: './js'
    };
var styles = {
      entry: './src/css/main.scss',
      src: './src/css/**',
      dest: './css'
    };
var fonts = {
      dest: './fonts'
    };
var html = {
      entry: './src/index.jade',
      src: './src/**',
      dest: './'
    };

gulp.task('eslint', function() {
  return gulp.src(scripts.src)
    .pipe(plugins.eslint())
    .pipe(plugins.eslint.format());
});

gulp.task('webpack', function(callback) {
  webpack({
    entry: scripts.entry,
    output: {
      filename: scripts.output
    },
    externals: {
      'vue': 'window.Vue',
      'cropper': 'window.Cropper'
    },
    module: {
      loaders: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
          query: {
            presets: ['es2015']
          }
        }
      ]
    }
  }, function(err, stats) {
    if(err) {
      throw new plugins.util.PluginError('webpack', err);
    }

    plugins.util.log('[webpack]', stats.toString());

    callback();
  });
});

gulp.task('js', ['eslint', 'webpack'], function() {
  return gulp.src(scripts.output)
    .pipe(plugins.uglify())
    .pipe(gulp.dest(scripts.dest));
});

gulp.task('sass', function() {
  return gulp.src(styles.entry)
    .pipe(plugins.sass({
      outputStyle: 'expanded'
    }))
    .pipe(gulp.dest(styles.dest));
});

gulp.task('css', function() {
  return gulp.src(styles.entry)
    .pipe(plugins.sass({
      outputStyle: 'compressed'
    }))
    .pipe(plugins.autoprefixer({
      browsers: [
        'Android 2.3',
        'Android >= 4',
        'Chrome >= 35',
        'Firefox >= 31',
        'Edge >= 12',
        'Explorer >= 9',
        'iOS >= 7',
        'Opera >= 12',
        'Safari >= 7.1'
      ]
    }))
    .pipe(gulp.dest(styles.dest));
});

gulp.task('jade', function() {
  return gulp.src(html.entry)
    .pipe(plugins.jade({
      pretty: true
    }))
    .pipe(gulp.dest(html.dest));
});

gulp.task('html', function() {
  return gulp.src(html.entry)
    .pipe(plugins.jade())
    .pipe(gulp.dest(html.dest));
});

gulp.task('asset:font', function() {
  return gulp.src([
      'node_modules/font-awesome/fonts/*'
    ])
    .pipe(gulp.dest(fonts.dest));
});

gulp.task('asset:css', function() {
  return gulp.src([
      'node_modules/cropperjs/dist/cropper.min.css',
      'node_modules/font-awesome/css/font-awesome.min.css'
    ])
    .pipe(gulp.dest(styles.dest));
});

gulp.task('asset:js', function() {
  return gulp.src([
      'node_modules/vue/dist/vue.min.js',
      'node_modules/cropperjs/dist/cropper.min.js'
    ])
    .pipe(gulp.dest(scripts.dest));
});

gulp.task('asset', ['asset:font', 'asset:css', 'asset:js']);

gulp.task('release', ['js', 'css', 'html', 'asset']);

gulp.task('watch', function () {
  gulp.watch(scripts.src, ['webpack']);
  gulp.watch(styles.src, ['sass']);
  gulp.watch(html.src, ['jade']);
});

gulp.task('default', ['watch']);
