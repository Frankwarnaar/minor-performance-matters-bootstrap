const gulp     = require('gulp'),
	critical   = require('critical'),
	cleanCss   = require('gulp-clean-css'),
	fs         = require('fs'),
	rename     = require('gulp-rename'),
	responsive = require('gulp-responsive'),
	htmlmin    = require('gulp-htmlmin'),
	uglify     = require('gulp-uglify'),
	webp       = require('gulp-webp'),
	webpHtml   = require('gulp-webp-html'),
	plumber    = require('gulp-plumber'),
	gutil      = require('gulp-util');

const config = {
	srcPath: './src',
	assetsPath: './src/assets',
	distPath: `./src/dist`,
	buildPath: './build'
};

const handleError = function(err) {
	gutil.log(err);
	this.emit('end');
};

/* ===========================================================
	Html
   ============================================================ */

gulp.task('html', () => {
	gulp.src([`${config.srcPath}/*.html`, `${config.srcPath}/**/*.html`])
		.pipe(plumber({
			errorHandler: handleError
		}))
		.pipe(webpHtml())
		.pipe(htmlmin({collapseWhitespace: true}))
		.pipe(gulp.dest(config.buildPath));
});

/* ===========================================================
	Js
   ============================================================ */

gulp.task('js', () => {
	gulp.src(`${config.assetsPath}/js/docs.min.js`)
		.pipe(uglify())
		.pipe(gulp.dest(`${config.buildPath}/js`));
});

/* ===========================================================
	Css
   ============================================================ */

gulp.task('css', ['css:critical'], () => {
	gulp.src(`${config.buildPath}/css/critical.css`)
	.pipe(cleanCss())
	.pipe(rename('critical.min.css'))
	.pipe(gulp.dest(`${config.buildPath}/css/`));
});

gulp.task('css:minify', () => {
	gulp.src([`${config.assetsPath}/css/*.css`, `${config.assetsPath}/css/**/*.css`, `${config.distPath}/css/*.css`])
		.pipe(cleanCss())
		.pipe(gulp.dest(`${config.buildPath}/css/`));
});

gulp.task('css:critical', () => {
	const html = fs.readFileSync(`${config.srcPath}/index.html`, 'utf8');

	critical.generate({
		inline: false,
		base: './',
		html: html,
		src: `${config.srcPath}/_base/layout.html`,
		css: [`${config.distPath}/css/bootstrap.css`,`${config.distPath}/css/bootstrap-theme.css`, `${config.assetsPath}/css/src/docs.css`],
		dest: `${config.buildPath}/css/critical.css`,
		width: 1920,
		height: 1080
	});
});

/* ===========================================================
	Images
   ============================================================ */

gulp.task('images', ['images:compress', 'images:convert']);

gulp.task('images:compress', function() {
 	gulp.src([`${config.assetsPath}/img/*.**`])
		.pipe(responsive([
			{
				name: '*.png',
				width: 1000
			},
			{
				name: '*.jpg',
				width: 800
			}
		], {
			quality: 50,
			errorOnUnusedImage: false
		}))
		.pipe(gulp.dest(config.buildPath + '/img'));
});

gulp.task('images:convert', () => {
 	gulp.src([`${config.assetsPath}/img/*.**`])
		.pipe(webp())
		.pipe(gulp.dest(config.buildPath + '/img'));
});