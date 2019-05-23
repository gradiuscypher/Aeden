const del = require('del');
const gulp = require('gulp');
const eslint = require('gulp-eslint');
const sourcemaps = require('gulp-sourcemaps');
const typescript = require('gulp-typescript');

/** Create gulp task `delete` */
gulp.task(
	'delete',
	(done) => {
		del.sync(['./bin/**/*.*']);
		done();
	}
);

/** Create gulp task `lint` */
gulp.task(
	'lint',
	() => {
		return gulp.src(['./client/api/**/*.ts', './client/bot/**/*.ts'])
			.pipe(eslint())
			.pipe(eslint.format())
			.pipe(eslint.failAfterError());
	}
);

/** Create gulp task 'build:api' */
gulp.task(
	'build:api',
	() => {
		const project = typescript.createProject('./tsconfig.json');
		const tsCompile = gulp.src('./client/api/**/*.ts')
			.pipe(sourcemaps.init({ base: './client/api' }))
			.pipe(project());

		tsCompile.pipe(gulp.dest('./bin/api/'));
		gulp.src('./client/api/**/*.json').pipe(gulp.dest('./bin/api/'));

		return tsCompile.js
			.pipe(sourcemaps.write('.', { sourceRoot: './client/api' }))
			.pipe(gulp.dest('./bin/api/'));
	}
);

/** Create gulp task 'build:bot' */
gulp.task(
	'build:bot',
	() => {
		const project = typescript.createProject('./tsconfig.json');
		const tsCompile = gulp.src('./client/bot/**/*.ts')
			.pipe(sourcemaps.init({ base: './client/bot/' }))
			.pipe(project());

		tsCompile.pipe(gulp.dest('./bin/bot/'));
		gulp.src('./client/bot/**/*.json').pipe(gulp.dest('./bin/bot/'));

		return tsCompile.js
			.pipe(sourcemaps.write('.', { sourceRoot: './client/bot' }))
			.pipe(gulp.dest('./bin/bot/'));
	}
);

/** Create gulp task 'build:client' */
gulp.task(
	'build:client',
	() => {
		const project = typescript.createProject('./tsconfig.json');
		const tsCompile = gulp.src('./client/*.ts')
			.pipe(sourcemaps.init({ base: './client/' }))
			.pipe(project());

		tsCompile.pipe(gulp.dest('./bin/'));

		return tsCompile.js
			.pipe(sourcemaps.write('.', { sourceRoot: './client' }))
			.pipe(gulp.dest('./bin/'));
	}
);

/** Create gulp task `default`. */
gulp.task(
	'default',
	gulp.series('lint', 'delete', 'build:api', 'build:bot', 'build:client')
);
