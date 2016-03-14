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
	gulp.watch( 'app/app.module.js', ['minifyApp'] );
	gulp.watch( 'app/**/*Factory.js', ['minifyAppFactories'] );
	gulp.watch( 'app/**/*Directives.js', ['minifyAppDirectives'] );
	gulp.watch( 'app/**/*Controller.js', ['minifyAppControllers'] );
	gulp.watch( 'app/app.routes.js', ['minifyAppRoutes'] );
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

gulp.task('minifyApp', function() {
	return pipe([
		gulp.src('app/app.module.js')
		,concat('app.js')
		,uglify()
		,gulp.dest('dist/js')
	]).on('error', function(e){ console.log(e) });
});

gulp.task('minifyAppFactories', function() {
	console.log('Minifing app');
	return pipe([
		gulp.src('app/**/*Factory.js')
		,concat('factories.js')
		,uglify()
		,gulp.dest('dist/js')
	]).on('error', function(e){ console.log(e) });
});

gulp.task('minifyAppDirectives', function() {
	return pipe([
		gulp.src('app/**/*Directives.js')
		,concat('services.js')
		,uglify()
		,gulp.dest('dist/js')
	]).on('error', function(e){ console.log(e) });
});

gulp.task('minifyAppControllers', function() {
	return pipe([
		gulp.src('app/**/*Controller.js')
		,concat('controllers.js')
		,uglify()
		,gulp.dest('dist/js')
	]).on('error', function(e){ console.log(e) });
});

gulp.task('minifyAppRoutes', function() {
	return pipe([
		gulp.src('app/app.routes.js')
		,concat('routes.js')
		,uglify()
		,gulp.dest('dist/js')
	]).on('error', function(e){ console.log(e) });
});
