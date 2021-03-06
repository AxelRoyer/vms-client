var gulp = require('gulp');
var sass = require('gulp-sass');
var mocha = require('gulp-mocha');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var bourbon = require('bourbon');

var paths = {};

paths.styles = [
	'./style/*.scss'
];

paths.unitTests = [
	'tests/*-tests.js'
];

paths.jsFiles = [
	'sources/*.js'
];

gulp.task('sass-build', function () {
	gulp.src(paths.styles)
		.pipe(sass({
			includePaths: bourbon.includePaths
		}))
		.on("error", errorAlert)
		.pipe(gulp.dest('./style'));
});

gulp.task('sass-watch', function () {
	gulp.src(paths.styles)
		.on("error", errorAlert)
		.pipe(gulp.dest('./style'));
	gulp.watch(paths.styles, ['sass-build'])
});

gulp.task('test', function () {
	return gulp.src(paths.unitTests, {read: false})
		.pipe(mocha({reporter: 'nyan'}));
});

gulp.task('default', ['sass-watch']);

gulp.task('js-build', function() {
	return browserify('./sources/vms.js')
		.bundle()
		.pipe(source('bundle.js'))
		.pipe(gulp.dest('./sources/'));
});

gulp.task('js-watch', function() {
	gulp.watch(paths.jsFiles, ['js-build']);
});

function errorAlert (error) {
	console.log(error.message);
}