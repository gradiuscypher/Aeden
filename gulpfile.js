const del = require('del');
const gulp = require('gulp');
const eslint = require('gulp-eslint');
const jsdoc = require('gulp-jsdoc3');
const sourcemaps = require('gulp-sourcemaps');
const typescript = require('gulp-typescript');

/** Create gulp task `delete` */
gulp.task('delete', done => {
	del.sync(['./bin/']);
	done();
});

/** Create gulp task `lint` */
gulp.task('lint', () => {
	return gulp
		.src(['./client/api/**/*.ts', './client/bot/**/*.ts'])
		.pipe(eslint())
		.pipe(eslint.format())
		.pipe(eslint.failAfterError());
});

/** Create gulp task 'build:client' */
gulp.task('build:client', () => {
	const clientProject = typescript.createProject('./tsconfig.json');

	const client = gulp
		.src(['./client/*.ts'])
		.pipe(sourcemaps.init({ base: './client/' }))
		.pipe(clientProject());

	gulp.src('./client/package.json').pipe(gulp.dest('./bin/client/'));
	gulp.src('./lerna.json').pipe(gulp.dest('./bin/'));
	gulp.src('./package.json').pipe(gulp.dest('./bin/'));

	return client.js
		.pipe(sourcemaps.write('.', { sourceRoot: './client' }))
		.pipe(gulp.dest('./bin/client/'));
});

/** Create gulp task 'build:api' */
gulp.task('build:api', () => {
	const apiProject = typescript.createProject('./tsconfig.json');

	const api = gulp
		.src('./client/api/**/*.ts')
		.pipe(sourcemaps.init({ base: './client/api/' }))
		.pipe(apiProject());

	gulp.src('./client/api/**/*.json').pipe(gulp.dest('./bin/client/api/'));

	return api.js
		.pipe(sourcemaps.write('.', { sourceRoot: './client/api/' }))
		.pipe(gulp.dest('./bin/client/api/'));
});

/** Create gulp task 'build:bot' */
gulp.task('build:bot', () => {
	const botProject = typescript.createProject('./tsconfig.json');

	const bot = gulp
		.src('./client/bot/**/*.ts')
		.pipe(sourcemaps.init({ base: './client/bot/' }))
		.pipe(botProject());

	gulp.src('./client/bot/**/*.json').pipe(gulp.dest('./bin/client/bot/'));

	return bot.js
		.pipe(sourcemaps.write('.', { sourceRoot: './client/bot/' }))
		.pipe(gulp.dest('./bin/client/bot/'));
});

/** Create gulp task 'build:docs' */
gulp.task('build:docs', () => {
	del.sync(['./docs/**/*.*'], { force: true });

	const jsDocConfig = require('./.jsdoc.json');

	return gulp.src(['README.md', './bin/**/*.js']).pipe(jsdoc(jsDocConfig));
});

/** Create gulp task `default`. */
gulp.task(
	'default',
	gulp.series('lint', 'delete', 'build:client', 'build:api', 'build:bot')
);
