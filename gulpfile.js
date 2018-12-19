'use strict';

// 引入 gulp
var gulp = require('gulp');

// 引入组件
var replace = require('gulp-replace'),
    clean = require('gulp-clean'),
    gulpif = require('gulp-if'),
    gutil = require('gulp-util'),
    less = require('gulp-less'),
    rename = require('gulp-rename'),
    stripDebug = require('gulp-strip-debug');

var pkg = require('./package.json');

var version = 'v' + pkg.version;
var cfg = {
    entry: './src',
    output: './dist'
};


//构建开始提示
gutil.log(gutil.colors.green('[Start build]'), '版本:', gutil.colors.magenta(version), ', 输出目录:', gutil.colors.magenta(cfg.output));


//清空dist目录
gulp.task('clean', function () {
    return gulp.src(cfg.output, {read: true})
        .pipe(clean());
});

// clone and replace
gulp.task('clone', function () {
    return gulp.src([
        'src/**/*',
        '!src/icons/**',
    ])
        .pipe(gulp.dest(cfg.output))
});

//处理图片
gulp.task('image', function () {
    return gulp.src([
        'src/icons/tabbar/**'
    ])
        .pipe(gulp.dest(cfg.output + '/icons/tabbar'))
});

//构建
gulp.task('build', ['clean'], function () {
    gulp.start(
        'clone',
        'image'
    );
});

//默认任务
gulp.task('watch', ['build'], function () {
    gulp.watch([
            'src/**/*.*'
        ],
        ['build']
    );
});

