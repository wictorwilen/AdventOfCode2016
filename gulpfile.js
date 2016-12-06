'use strict'
var gulp = require('gulp');

var sourcemaps = require('gulp-sourcemaps')
var tsc = require('gulp-typescript')
var browserSync = require('browser-sync')
var nodemon = require('gulp-nodemon');
var argv = require('yargs').argv;
var fsharp = require('gulp-fsharp');
var del = require('del'); // rm -rf


var typeScriptFiles = ["./src/**/*.ts"]
var ts = tsc.createProject('tsconfig.json')


gulp.task('fs:compile', function () {
    return gulp.src('./src/**/*.fsx').pipe(fsharp()).pipe(gulp.dest('./dist'));
});

gulp.task('ts:compile', function () {
    var result = gulp.src(typeScriptFiles)
        .pipe(sourcemaps.init())
        .pipe(ts({}));

    return result.js
        .pipe(sourcemaps.write('.', {sourceRoot: '../src'}))
        .pipe(gulp.dest("./dist"));
});

gulp.task('browser-reload', browserSync.reload);

gulp.task('nodemon', function (cb) {
    var started = false;
    return nodemon({
        script: 'dist/server.js',
        watch: ['dist/server.js']
    }).on('start', function () {
        if (!started) {
            cb();
            started = true;
        }
    });
});



gulp.task('serve', ['ts:compile', 'nodemon'], function () {
    browserSync.init(null, {
        proxy: "http://localhost:1337",
        files: ["dist/**/*.*"],
        port: 1338,
    });
    return gulp.watch(typeScriptFiles,
        ['ts:compile']);
});



gulp.task('start', function (cb) {
    var stream = nodemon({
        script: argv['path'],
        watch: ['dist/**/*.js'],
    });
    stream.on('crash', function () {
        console.error('Application has crashed!\n')
        stream.emit('restart', 1)
    });
    stream.on('exit', function () {
        console.error('Application has ended!\n')
        stream.emit('restart', 1)
    });
    return stream;
});

//gulp run --path dist/2016/1/route.js
gulp.task("run", ['ts:compile', "start"], function () {
    gulp.watch('./src/**/*.ts', ['ts:compile']);
});


gulp.task('nuke', function () {
    return del(['dist']);
});