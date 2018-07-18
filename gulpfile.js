'use strict';

var gulp = require('gulp'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    pug = require('gulp-pug');

var
    sassSrc = ['./assets/scss/styles.scss'],
    jsSrc = [
        './assets/scripts/**'
    ],
    pugSrc = [
        './template/*.pug'
    ],
    cssDest = './assets/css',
    jsDest = './assets/js',
    htmlDest = './';

/**
 * Script build sass to css
 */
gulp.task('sass', function () {
    return gulp.src(sassSrc)
    .pipe(sourcemaps.init())
    .pipe(sass({outputStyle: 'compressed'})).on('error', sass.logError)
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(cssDest));
});

/**
 * Script mninify js
 */
gulp.task('scripts', function () {
    return gulp.src(jsSrc)
    .pipe(sourcemaps.init())
    .pipe(concat('scripts.js'))
    .pipe(uglify())
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(jsDest));
});

gulp.task('views', function buildHTML() {
    return gulp.src(pugSrc)
    .pipe(pug({
        doctype: 'html',
        pretty: false
    }))
    .pipe(gulp.dest(htmlDest));
});

gulp.task('css', ['sass']);

gulp.task('js', ['scripts']);

gulp.task('html', ['views']);

gulp.task('watch',['default'], function() {
    gulp.watch('./assets/scss/**', ['sass']);
    gulp.watch('./assets/scripts/**', ['scripts'])
    gulp.watch('./template/**', ['views'])
});

gulp.task('default', ['css', 'js', 'html']);