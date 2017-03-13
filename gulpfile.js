const gulp     = require('gulp'),
	critical   = require('critical'),
	cleanCss   = require('gulp-clean-css'),
	fs         = require('fs'),
	rename     = require('gulp-rename');

const config = {
	srcPath: './src',
	assetsPath: './src/assets',
	distPath: `./src/dist`,
	buildPath: './src/build'
};

gulp.task('html:toString', function () {
	return gulp.src([`${config.srcPath}/index.html`])
	.pipe(injectHtml())
	.pipe(gulp.dest(`${config.buildPath}/index.html`));
});

gulp.task('css', () => {
	sequence(['css:critical'], ['css:mininfy']);
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