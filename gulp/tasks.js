/**
 * Gulp tasks
 * @author Gustavo Alves - contato@gustavocalves.com.br
 *
**/

// Load config modules
import {vendor, dist, styles, templates, app, linter} from './config';

// Load core modules
import gulp from 'gulp';
import watch from 'gulp-watch';

// Load util modules
import util from 'gulp-util';
import plumber from 'gulp-plumber';
import concat from 'gulp-concat';
import runsec from 'run-sequence';
import clean from 'gulp-clean';

// Load server modules
import connect from 'gulp-connect';

// Load stylesheet modules
import cssmin from 'gulp-minify-css';
import sass from 'gulp-sass';

// Load javascript modules
import smaps from 'gulp-sourcemaps';
import uglify from 'gulp-uglify';
import babel from 'gulp-babel';

// Load linter modules
import jshint from 'gulp-jshint';
import stylish from 'jshint-stylish';

// Load angular modules
import ngCache from 'gulp-angular-templatecache';


/**
 * Error handler
 *
 * Invoked by plumber, other error and warning listeners
**/
const onError = function(err) {
  util.beep();
  util.log(util.colors.red(err));
  this.emit('end');
};


/**
 * Styles tasks
 *
 * All .scss are compiled to a minified and another non-minified
 * .css file
**/
gulp.task('styles', () => {
  return gulp.src(styles.srcs)
    .pipe(plumber({ errorHandler: onError }))
    .pipe(sass())
    .pipe(cssmin({ keepSpecialComments: 1, rebase: true}))
    .pipe(gulp.dest(styles.dest))
    .pipe(connect.reload());
});


/**
 * Linter tasks
**/
gulp.task('linter', () => {
  return gulp.src(linter.srcs)
    .pipe(plumber({ errorHandler: onError }))
    .pipe(jshint())
    .pipe(jshint.reporter(stylish));
});


/**
 * Vendor tasks
 *
 * Bundle vendor files into a single file
**/
gulp.task('vendor', () => {
  return gulp.src(vendor.dev.srcs)
    .pipe(plumber({ errorHandler: onError }))
    .pipe(smaps.init({loadMaps: true}))
    .pipe(concat(vendor.dev.file))
    .pipe(smaps.write('./'))
    .pipe(gulp.dest(vendor.dev.dest));
});


/**
 * App tasks
 *
 * Bundle Angular.js components into a single file
**/
gulp.task('app', () => {
  return gulp.src(app.srcs)
    .pipe(plumber({ errorHandler: onError }))
    .pipe(smaps.init())
      .pipe(babel({ blacklist: ["strict"] }))
      .pipe(uglify({
        output: { comments: /^!/i }
      }))
      .pipe(concat(app.file))
    .pipe(smaps.write('./'))
    .pipe(gulp.dest(app.dest))
    .pipe(connect.reload());
});


/**
 * Templates tasks
 *
 * Bundle angular html files into a module
**/
gulp.task('templates', () => {
  return gulp.src(templates.srcs)
    .pipe(plumber({ errorHandler: onError }))
    .pipe(ngCache({
      module: templates.module,
      filename: templates.file,
      templateHeader: 'angular.module("<%= module %>"<%= standalone %>).run(["$templateCache", function($templateCache) {',
      base: (file) => { return file.path.replace(file.base, '').replace('/templates', ''); }
    }))
    .pipe(gulp.dest(templates.dest))
    .pipe(connect.reload());
});


/**
 * Server tasks
 *
 * Create and run a development webserver
**/
gulp.task('server', () => {
  connect.server({
    root: ['./src'],
    livereload: true,
    port: 5001
  });
});


/**
 * Watch tasks
 *
 * Watch files and folder to run specifics tasks
**/
gulp.task('watch', () => {
  watch(styles.srcs, { verbose: true }, () => { runsec('styles'); });
  watch(app.srcs, { verbose: true }, () => { runsec('app'); });
  watch(templates.srcs, { verbose: true }, () => { runsec('templates'); });
  watch(linter.srcs, { verbose: true }, () => { runsec('linter'); });
});


/**
 * Dist tasks
 *
 * Copy the necessary files to dist folder
**/
gulp.task('dist:clean', function() {
  return gulp.src(dist.dest)
    .pipe(plumber({ errorHandler: onError }))
    .pipe(clean());
});

gulp.task('dist:copy', function() {
  return gulp.src(dist.srcs, { base: './src' })
    .pipe(plumber({ errorHandler: onError }))
    .pipe(gulp.dest(dist.dest));
});


/**
 * Global tasks
 *
 * Tasks invoked via console
**/
gulp.task('default', ['dev']);
gulp.task('dev', ['linter', 'styles', 'vendor', 'templates','app', 'watch', 'server']);
gulp.task('dist', () => {
  runsec('linter', 'styles', 'templates', 'app', 'vendor', 'dist:clean', 'dist:copy');
});
