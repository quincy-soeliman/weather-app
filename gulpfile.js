var gulp 	= require('gulp'),
	pipe    = require('gulp-pipe'),
	sass 	  = require('gulp-sass'),
	uglify  = require('gulp-uglify'),
	concat	= require('gulp-concat'),
	image 	= require('gulp-imagemin');

gulp.task('default', function() {
	console.log('Watching for new images...');
	gulp.watch( 'assets/images/*', ['imagemin'] );

	console.log('Watching for changes in sass...');
	gulp.watch( 'assets/sass/**/*.scss', ['compilescss'] );

	console.log('Watching for changes in js files...');
	gulp.watch( 'app/**/*.js', ['minifyAppFactories'] );
	gulp.watch( 'app/**/*.js', ['minifyAppServices'] );
	gulp.watch( 'app/**/*.js', ['minifyAppControllers'] );
});

gulp.task('imagemin', function() {
	console.log('Compressing your images');
	return pipe([
		gulp.src('assets/images/**/*.*')
		,image()
		,gulp.dest('dist/images')
	]).on('error', function(e){ console.log(e) });
});

gulp.task('compilescss', function() {
	console.log('Compiling SCSS');
	return pipe([
		gulp.src('assets/sass/styles.scss')
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

gulp.task('minifyAppFactories', function() {
	console.log('Minifing app');
	return pipe([
		gulp.src('app/components/*Factory.js')
		,concat('factories.js')
		,uglify()
		,gulp.dest('dist/js')
	]).on('error', function(e){ console.log(e) });
});

gulp.task('minifyAppServices', function() {
	return pipe([
		gulp.src('app/components/*Service.js')
		,concat('services.js')
		,uglify()
		,gulp.dest('dist/js')
	]).on('error', function(e){ console.log(e) });
});

gulp.task('minifyAppControllers', function() {
	return pipe([
		gulp.src('app/components/*Controller.js')
		,concat('controllers.js')
		,uglify()
		,gulp.dest('dist/js')
	]).on('error', function(e){ console.log(e) });
});
