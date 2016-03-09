var gulp 	= require('gulp'),
	pipe    = require('gulp-pipe'),
	sass 	  = require('gulp-sass'),
	uglify  = require('gulp-uglify'),
	concat	= require('gulp-concat'),
	image 	= require('gulp-imagemin');

gulp.task('default', function() {
	console.log('watching for new images');
	gulp.watch( 'assets/img/*', ['imagemin'] );

	console.log('watching for changes in sass');
	gulp.watch( 'assets/sass/main.sass', ['compilesass'] );

	console.log('Watching for changes in js files');
	gulp.watch( 'assets/js/**/*.js', ['concatjs'] );
});

gulp.task('imagemin', function() {
	console.log('Compressing your images');
	return pipe([
		gulp.src('assets/img/**/*.*')
		,image()
		,gulp.dest('dist/img')
	]).on('error', function(e){ console.log(e) });
});

gulp.task('compilesass', function() {
	console.log('Compiling SASS');
	return pipe([
		gulp.src('assets/sass/main.sass')
		,sass({outputStyle: 'compressed'}).on('error', sass.logError)
		,gulp.dest('dist/css')
	]).on('error', function(e){ console.log(e) });
});

gulp.task('concatjs', function() {
	console.log('Merging and uglifying your js files');
	return pipe([
		gulp.src('assets/js/**/*.js')
		,concat('all.js')
		,uglify()
		,gulp.dest('dist/js')
	]).on('error', function(e){ console.log(e) });
});
