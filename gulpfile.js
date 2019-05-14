const del = require('del');
const gulp = require('gulp');
const eslint = require('gulp-eslint');
const jsdoc = require('gulp-jsdoc3');
const sourcemaps = require('gulp-sourcemaps');
const typescript = require('gulp-typescript');

/** Create gulp task `lint` */
gulp.task(
	'lint',
	() => {
		return gulp.src(['./src/**/*.ts'])
			.pipe(eslint())
			.pipe(eslint.format())
			.pipe(eslint.failAfterError());
	}
);

/** Create gulp task 'build' */
gulp.task(
	'build',
	() => {
		del.sync(['./bin/**/*.*']);

		const project = typescript.createProject('./tsconfig.json');
		const tsCompile = gulp.src('./src/**/*.ts')
			.pipe(sourcemaps.init({ base: 'src' }))
			.pipe(project());

		tsCompile.pipe(gulp.dest('bin/'));
		gulp.src('./src/**/*.json').pipe(gulp.dest('./bin/'));

		return tsCompile.js
			.pipe(sourcemaps.write('.', { sourceRoot: '../src' }))
			.pipe(gulp.dest('./bin/'));
	}
);

/** Create gulp task 'build:docs' */
gulp.task(
	'build:docs',
	() => {
		del.sync(['./docs/**/*.*'], { force: true });

		const jsDocConfig = require('./.jsdoc.json');

		return gulp.src(['README.md', './bin/**/*.js'])
        	.pipe(jsdoc(jsDocConfig));
	}
);

/** Create gulp task `default`. */
gulp.task(
	'default',
	gulp.series('lint', 'build')
);

/** Create gulp task `build:full`. */
gulp.task(
	'build:full',
	gulp.series('lint', 'build', 'build:docs')
);
