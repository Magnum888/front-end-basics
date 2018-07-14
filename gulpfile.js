var gulp           = require('gulp'),
	gutil          = require('gulp-util' ),
	browserSync    = require('browser-sync'),
	notify         = require("gulp-notify");

// Сервер и автообновление страницы Browsersync
gulp.task('browser-sync', function() {
	browserSync({
		server: {
			baseDir: '.'
		},
		notify: false,
		// tunnel: true,
		// tunnel: "front-end-basics", //Demonstration page: http://front-end-basics.localtunnel.me
	});
});

gulp.task('js', function() {
	return gulp.src([
		'static/index.js', 
		])
	.pipe(gulp.dest('static'))
	.pipe(browserSync.reload({stream: true}));
});

gulp.task('css', function() {
	return gulp.src('static/**/*.css')
	.pipe(gulp.dest('static'))
	.pipe(browserSync.reload({stream: true}));
});

gulp.task('watch', ['css', 'js', 'browser-sync'], function() {
	gulp.watch('static/**/*.css', ['css']);
	gulp.watch( 'static/index.js', ['js']);
	gulp.watch('*.html', browserSync.reload);
});

gulp.task('clear', function () {
    return cache.clearAll();
})

gulp.task('default', ['watch']);
