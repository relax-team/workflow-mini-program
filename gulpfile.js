'use strict';

// 引入gulp组件
var gulp = require('gulp'),
    replace = require('gulp-replace'),
    clean = require('gulp-clean'),
    gulpif = require('gulp-if'),
    gutil = require('gulp-util'),
    runSequence = require('run-sequence'),
    sftp = require('gulp-sftp');      // 自动部署静态资源

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

// 拷贝文件到output目录
gulp.task('clone', function () {
    return gulp.src([
        'src/**',
        '!src/project.config.json',
    ])
        .pipe(gulp.dest(cfg.output))
});

// 上传FTP
gulp.task('ftpStatic', function () {
    return gulp.src('static/**')
        .pipe(sftp({
            host: `${host}`,
            port: 20021,
            user: `${user}`,
            pass: `${pass}`,
            remotePath: `${remotePath}`,
        }));
});


//发布
gulp.task('build', function () {
    runSequence('clean', 'clone', function () {
        gutil.log(gutil.colors.green('恭喜，构建完成！'));
    });
});

//ftp
gulp.task('ftp',function () {
    runSequence('ftpStatic', function () {
        gutil.log(gutil.colors.green('恭喜，FTP上传完成！'));
    });
});

gulp.task('default', ['build']);
