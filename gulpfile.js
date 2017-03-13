const gulp     = require('gulp'),
	critical   = require('critical'),
	concat     = require('gulp-concat'),
	cleanCss   = require('gulp-clean-css'),
	injectHtml = require('gulp-inject-stringified-html');

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

gulp.task('css:concat', () => {
	gulp.src([`${config.distPath}/css/**.css`, `${config.assetsPath}/css/src/docs.css`])
		.pipe(concat('bundle.css'))
		.pipe(cleanCss())
		.pipe(gulp.dest(`${config.buildPath}/css`));
});

gulp.task('css:critical', () => {
	const getStringFromHtml = () => {
		return { gulp_inject: `./index.html`};  // <-- and this!
	};
	const html = getStringFromHtml();
	console.log(html);
	// critical.generate({
	// 	inline: true,
	// 	base: './',
	// 	html: gulp.src(`${config.srcPath}/index.html`),
	// 	src: `${config.srcPath}/_base/layout.html`,
	// 	css: [`${config.buildPath}/css/bundle.css`],
	// 	dest: `${config.buildPath}/_base/layout.html`,
	// 	width: 1920,
	// 	height: 1080
	// });
});