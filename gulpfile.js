const gulp     = require('gulp'),
	critical   = require('critical'),
	cleanCss   = require('gulp-clean-css'),
	fs         = require('fs'),
	rename     = require('gulp-rename'),
	image      = require('gulp-image'),
	htmlmin    = require('gulp-htmlmin'),
	uglify     = require('gulp-uglify');

const config = {
	srcPath: './src',
	assetsPath: './src/assets',
	distPath: `./src/dist`,
	buildPath: './build'
};

/* ===========================================================
	Html
   ============================================================ */

gulp.task('html:minify', () => {
	gulp.src([`${config.srcPath}/*.html`, `${config.srcPath}/**/*.html`])
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

gulp.task('css:minify', () => {
	gulp.src([`${config.assetsPath}/css/*.css`, `${config.assetsPath}/css/**/*.css`, `${config.distPath}/css/*.css`])
		.pipe(cleanCss())
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

gulp.task('css', ['css:critical'], () => {
	gulp.src(`${config.buildPath}/css/critical.css`)
		.pipe(cleanCss())
		.pipe(rename('critical.min.css'))
		.pipe(gulp.dest(`${config.buildPath}/css/`));
});

/* ===========================================================
	Images
   ============================================================ */

gulp.task('images', function () {
 	gulp.src([`${config.assetsPath}/img/*.**`])
		// .pipe(image())
		.pipe(gulp.dest(config.buildPath + '/img'));
});