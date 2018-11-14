'use strict';
var gulp = require('gulp'),
    watch = require('gulp-watch'),
    pug = require('gulp-pug'),
    prefixer = require('gulp-autoprefixer'),
    uglify = require('gulp-uglify'),
    cssmin = require('gulp-cssmin'),
    sass = require('gulp-sass'),
    sassLint = require('gulp-sass-lint'),
    sourcemaps = require('gulp-sourcemaps'),
    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant'),
    spritesmith = require("gulp.spritesmith"),
    svgstore = require('gulp-svgstore'),
    svgmin = require('gulp-svgmin'),
    inject = require('gulp-inject'),
    rename = require('gulp-rename'),
    plumber = require('gulp-plumber'),
    notify = require("gulp-notify"),
    rigger = require("gulp-rigger"),
    newer = require('gulp-newer'),
    htmlbeautify = require('gulp-html-beautify'),
    webp = require("gulp-webp"),    
    svgSymbols = require('gulp-svg-symbols'),
    gulpIf = require('gulp-if'),
    errorHandler = require('gulp-plumber-error-handler'),
    path = require('path'),
    rsp = require('remove-svg-properties').stream,
    browserSync = require('browser-sync').create();

var path = {
    build: {
        html: 'build/',
        js: 'build/js/',
        css: 'build/css/',
        img: 'build/images/',
        webp: 'build/images/',
        fonts: 'build/fonts/'
    },
    src: {
        pug: 'src/*.pug',
        mainJs: 'src/js/main.js',
        vendorsJs: 'src/js/vendors.js',
        style: 'src/sass/main.scss',
        img: 'src/images/**/*.*',
        webp: 'src/images/**/*.{png,jpg}',
        pngSprite: 'src/sprite/png/',
        svgSprite: 'src/sprite/svg/**/*.svg',
        fonts: 'src/fonts/**/*.*'
    },
    watch: {
        pug: 'src/**/*.pug',
        mainJs: 'src/js/**/main.js',
        partialsJs: 'src/js/partials/**/*.js',
        vendorsJs: 'src/js/**/vendors.js',
        style: 'src/sass/**/*.*',
        img: 'src/images/**/*.*',
        webp: 'src/images/**/*.{png,jpg}',
        pngSprite: 'src/sprite/png/*.png',
        svgSprite: 'src/sprite/svg/**/*.svg',
        fonts: 'src/fonts/**/*.*'
    },
    clean: './build'
};

gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./build",
            index: "/corporate.html"


        }
    });


    gulp.watch("build/index.html").on('change', browserSync.reload);
});

gulp.task('html:build', function () {

    gulp.src(path.src.pug)
        .pipe(newer(path.src.pug))
        .pipe(pug({
            pretty: true
        }))
        //.pipe(htmlbeautify())
        .pipe(gulp.dest(path.build.html))
    //browserSync.reload("*.html");
       // .pipe(browserSync.stream());
        //.pipe(browserSync.stream({once: true}));
});

gulp.task('mainJs:build', function () {
    gulp.src(path.src.mainJs)
        .pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
        .pipe(rigger())
        .pipe(gulp.dest(path.build.js))
        .pipe(browserSync.stream());
});

gulp.task('vendorsJs:build', function () {
    gulp.src(path.src.vendorsJs)
        .pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
        .pipe(rigger())
        .pipe(uglify())
        .pipe(gulp.dest(path.build.js))
        .pipe(browserSync.stream());
});

gulp.task('style:build', function () {
    gulp.src(path.src.style)
        .pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
        //.pipe(sourcemaps.init())
        .pipe(sass({errLogToConsole: true}))
        .pipe(prefixer())
        //.pipe(cssmin())
        //.pipe(sourcemaps.write())
        .pipe(gulp.dest(path.build.css))
        .pipe(browserSync.stream());
});

gulp.task('sassLint', function () {
    return gulp.src('src/sass/**/*.s+(a|c)ss')
        .pipe(sassLint())
        .pipe(sassLint.format())
        .pipe(sassLint.failOnError())
});

gulp.task('image:build', function () {
    gulp.src(path.src.img)
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()],
            interlaced: true
        }))
        .pipe(gulp.dest(path.build.img))
        .pipe(browserSync.stream());
});

gulp.task('fonts:build', function () {
    gulp.src(path.src.fonts)
        .pipe(gulp.dest(path.build.fonts))
});

// PNG Sprites
gulp.task('png-sprite', function () {
    var spriteData =
        gulp.src(path.src.pngSprite + '*.png')
            .pipe(spritesmith({
              //retinaSrcFilter: path.src.pngSprite + '*-2x.png',
              imgName: 'sprite.png',
             // retinaImgName: 'sprite-2x.png',
              cssName: '_png-sprite.sass',
              cssTemplate: 'sass.template.mustache',
              cssVarMap: function (sprite) {
                sprite.name = sprite.name;
                sprite.image2x = 'sprite-2x.png';
              }
            }));

    spriteData.img.pipe(gulp.dest('src/images/'));
    spriteData.css.pipe(gulp.dest('src/sass/'));
});

// SVG Sprites
gulp.task('svg-sprite', function () {

    var svgs = gulp
        .src(path.src.svgSprite)
        .pipe(rename({prefix: 'svg-icon-'}))
        .pipe(rsp.remove({
            properties: [rsp.PROPS_STROKE,rsp.PROPS_FILL]
        }))
        .pipe(svgmin())
        .pipe(svgstore({ inlineSvg: true }));

    function fileContents (filePath, file) {
        return file.contents.toString();
    }

    return gulp
        .src('src/pug/svg.pug')
        .pipe(inject(svgs, { transform: fileContents }))
        .pipe(gulp.dest('src/pug'));

});
gulp.task('webp' , function() {
    return gulp.src(path.src.webp)
        .pipe(webp({quality: 90}))
        .pipe(gulp.dest(path.build.webp));
});

gulp.task('build', [
    'html:build',
    'mainJs:build',
    'vendorsJs:build',
    'style:build',
    'fonts:build',
    //'image:build',
    'png-sprite',
    /*
    'svg-sprite'
    */
    //'webp'
]);
gulp.task('htmlbeautify', function() {

    gulp.src('./src/*.html')
        .pipe(htmlbeautify())
        .pipe(gulp.dest('./public/'))
});
/*
gulp.task('watch', function () {
    watch([path.watch.pug], function (event, cb) {
        gulp.start('html:build');
    });
    watch([path.watch.style], function (event, cb) {
        gulp.start('style:build');
    });
    watch([path.watch.mainJs, path.watch.partialsJs], function (event, cb) {
        gulp.start('mainJs:build');
    });
    watch([path.watch.vendorsJs], function (event, cb) {
        gulp.start('vendorsJs:build');
    });
    watch([path.watch.img], function (event, cb) {
        gulp.start('image:build');
    });
    watch([path.watch.pngSprite], function (event, cb) {
        gulp.start('png-sprite');
    });
    watch([path.watch.svgSprite], function (event, cb) {
        gulp.start('svg-sprite');
    });
    watch([path.watch.fonts], function (event, cb) {
        gulp.start('fonts:build');
    });
    //browserSync.watch("build/*.html").on("change", browserSync.reload);
});
*/
gulp.task('watch', function() {
    gulp.watch([path.watch.style], ["style:build"]);
    gulp.watch([path.watch.pug], ["html:build"]);
    gulp.watch([path.watch.mainJs], ["mainJs:build"]);
    // gulp.watch([path.watch.fonts], ["fonts:build"]);
    //gulp.watch([path.watch.img], ["image:build"]);
    //gulp.watch([path.watch.webp], ["webp"]);
    gulp.watch([path.watch.svgSprite], ["svg-sprite"]);
    gulp.watch([path.watch.vendorsJs], ["vendorsJs:build"]);
});
gulp.task('default', ['build', 'browser-sync', 'watch']);
