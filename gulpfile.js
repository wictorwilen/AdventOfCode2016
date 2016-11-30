'use strict'
var gulp = require('gulp');

var sourcemaps = require('gulp-sourcemaps')
var tsc = require('gulp-typescript')
var browserSync = require('browser-sync')
var nodemon = require('gulp-nodemon');

var typeScriptFiles = ["./src/**/*.ts"]
var ts = tsc.createProject('tsconfig.json')



gulp.task('ts:compile', function() {
   var result = gulp.src(typeScriptFiles)
                .pipe(sourcemaps.init())
                .pipe(ts({})) ;
                
    return result.js
        .pipe(sourcemaps.write())
        .pipe(gulp.dest("./dist"));            
});

gulp.task('browser-reload', browserSync.reload);

gulp.task('nodemon', function (cb) {
	var started = false;
	return nodemon({
		script: 'dist/server.js',
        watch:['dist/server.js']
	}).on('start', function () {
		if (!started) {
			cb();
			started = true; 
		} 
	});
});

gulp.task('serve',['ts:compile', 'nodemon'], function () {
   browserSync.init(null, {
		proxy: "http://localhost:1337",
        files: ["dist/**/*.*"],
        port: 1338,
	});
    return gulp.watch(typeScriptFiles,
        ['ts:compile']);
});

