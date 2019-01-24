'use strict';

/*
* 说明：gulp版本4.0及以上
* npm install gulp-cli -g
* npm install gulp@4 -D
* */

// 引入gulp组件
const gulp = require('gulp'),
    path = require('path'),
    del = require('del'),
    gulpif = require('gulp-if'),
    replace = require('gulp-replace'),
    less = require('gulp-less'),
    gutil = require('gulp-util'),
    sftp = require('gulp-sftp');      // 自动部署静态资源

/*===== 配置文件，可修改 ====*/
const config = {
    assetsCDN: 'https://cdn.aliyun.cn',
    ftp: {
        host: '',
        port: 20021,
        user: '',
        pass: '',
        remotePath: ''
    }
};

/*===== 相关路径配置 ====*/
let paths = {
    src: {
        baseDir: 'src',
        baseFiles: ['src/**/*', '!src/assets/**/*', '!src/**/*.wxml', '!src/**/*.less'],
        wxmlFiles: ['src/**/*.wxml'],
        lessFiles: ['src/**/*.less'],
        assetsDir: 'src/assets',        //要上传到ftp或cdn的静态资源文件
    },
    dist: {
        baseDir: 'dist',
        wxssFiles: 'dist/**/*.wxss',
    }
};

/*===== 定义主要方法 ====*/
// 日志输出
function log() {
    let args = Array.prototype.slice.call(arguments);
    gutil.log.apply(null, args);
}

// clean 任务, dist 目录
function cleanDist() {
    return del(paths.dist.baseDir);
}

// 编译.less
function compileLESS(file) {
    return gulp.src(paths.src.lessFiles)
        .pipe(less())
        .pipe(gulp.dest(paths.dist.baseDir));
}

// 复制.wxml
function copyWXML(file) {
    return gulp.src(paths.src.wxmlFiles)
        .pipe(gulpif(config.assetsCDN, replace('@assets', config.assetsCDN)))
        .pipe(gulp.dest(paths.dist.baseDir));
}

// 复制文件
function copyFiles(file) {
    return gulp.src(paths.src.baseFiles)
        .pipe(gulp.dest(paths.dist.baseDir));
}


//监听文件
function watch(cb) {
    let watcher = gulp.watch([paths.src.baseDir], {ignored: /[\/\\]\./});
    watcher
        .on('add', function (file) {
            watchHandler('add', file);
        })
        .on('change', function (file) {
            watchHandler('changed', file);
        })
        .on('unlink', function (file) {
            watchHandler('removed', file);
        });

    cb();
}

function watchHandler(type, file) {
    log(gutil.colors.yellow(file) + ' is ' + type);

    let extname = path.extname(file);
    if (type === 'removed') {
        let tmp = file.replace(paths.src.baseDir + '/', paths.dist.baseDir + '/');
        if (extname === '.less') {
            tmp = tmp.replace(extname, '.wxss');
        }
        del([tmp]);
    } else {
        if (extname === '.less') {
            compileLESS(file);  // less 文件
        } else if (extname === '.wxml') {
            copyWXML(file); // wxml 文件
        } else {
            copyFiles(file);
        }
    }
}


/*======= 注冊任務 =======*/
// 删除任务
gulp.task('clean', cleanDist);

//默认任务
gulp.task('default', gulp.series(
    cleanDist,
    copyFiles,
    gulp.parallel(
        compileLESS,
        copyWXML
    ),
    watch
));

// 上传FTP
gulp.task('ftp', function () {
    return gulp.src(paths.src.assetsDir)
        .pipe(sftp(config.ftp));
});
