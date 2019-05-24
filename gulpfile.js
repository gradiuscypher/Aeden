const del = require('del');
const gulp = require('gulp');
const eslint = require('gulp-eslint');
const jsdoc = require('gulp-jsdoc3');
const sourcemaps = require('gulp-sourcemaps');
const typescript = require('gulp-typescript');

/** Create gulp task `delete` */
gulp.task('delete', done => {
	del.sync(['./bin/**/*.*']);
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

/** Create gulp task 'build:docs' */
gulp.task('build:docs', () => {
	del.sync(['./docs/**/*.*'], { force: true });

	const jsDocConfig = require('./.jsdoc.json');

	return gulp.src(['README.md', './bin/**/*.js']).pipe(jsdoc(jsDocConfig));
});

/** Create gulp task 'build:client' */
gulp.task('build:client', done => {
	const clientProject = typescript.createProject('./tsconfig.json');
	const apiProject = typescript.createProject('./tsconfig.json');
	const botProject = typescript.createProject('./tsconfig.json');

	const client = gulp
		.src('./client/*.ts')
		.pipe(sourcemaps.init({ base: './client/' }))
		.pipe(clientProject());

	const api = gulp
		.src('./client/api/**/*.ts')
		.pipe(sourcemaps.init({ base: './client/api' }))
		.pipe(apiProject());

	const bot = gulp
		.src('./client/bot/**/*.ts')
		.pipe(sourcemaps.init({ base: './client/bot/' }))
		.pipe(botProject());

	client.pipe(gulp.dest('./bin/'));
	api.pipe(gulp.dest('./bin/'));
	bot.pipe(gulp.dest('./bin/'));

	gulp.src('./client/api/**/*.json').pipe(gulp.dest('./bin/api/'));
	gulp.src('./client/bot/**/*.json').pipe(gulp.dest('./bin/bot/'));

	client.js
		.pipe(sourcemaps.write('.', { sourceRoot: './client' }))
		.pipe(gulp.dest('./bin/'));
	api.js
		.pipe(sourcemaps.write('.', { sourceRoot: './client/api' }))
		.pipe(gulp.dest('./bin/api/'));
	bot.js
		.pipe(sourcemaps.write('.', { sourceRoot: './client/bot' }))
		.pipe(gulp.dest('./bin/bot/'));
	done();
});

/** Create gulp task `default`. */
gulp.task('default', gulp.series('lint', 'delete', 'build:client'));
