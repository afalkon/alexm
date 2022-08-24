let gulp = require('gulp'),
    sass = require('gulp-sass')(require('sass')),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    browserSync = require('browser-sync'),
    minify = require('gulp-minify-inline'),
    vendor = require('gulp-autoprefixer'),
    uglify = require('gulp-uglify'),
    pipeline = require('readable-stream').pipeline;

/* HTML task to reload browser on changes */
gulp.task('html', function(){
    return gulp.src('markup/*.html')
    .pipe(browserSync.reload({stream: true}))
});

/* PHP task to reload browser on changes */
gulp.task('php', function(){
    return gulp.src('app/**/*.php')
    .pipe(browserSync.reload({stream: true}))
});

/* TPL task to reload browser on changes */
gulp.task('tpl', function(){
    return gulp.src('app/**/*.tpl')
    .pipe(browserSync.reload({stream: true}))
});

/* SASS and SCSS compiler to pure css with adding a suffix .min */
gulp.task('sass', function(){
    return gulp.src('markup/scss/style.scss')
    .pipe(vendor({browsers: ['last 8 versions']}))
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(rename({suffix: ".min"}))
    .pipe(gulp.dest('app/css'))
    .pipe(gulp.dest('markup/css'))
    .pipe(browserSync.reload({stream: true}))
});

/* SASS and SCSS compiler to pure css */
gulp.task('sassExp', function(){
    return gulp.src('markup/scss/style.scss')
    .pipe(vendor({browsers: ['last 8 versions']}))
    .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
    .pipe(gulp.dest('app/css'))
    .pipe(gulp.dest('markup/css'))
    .pipe(browserSync.reload({stream: true}))
});

/* CSS concatination process. Write the src's of css files in gulp.src with (['./', './']) */
gulp.task('cssConcat', function(){
    return gulp.src(['node_modules/normalize.css/normalize.css'])
    .pipe(concat('libs.min.css'))
    .pipe(sass({outputStyle: 'compressed'})).on('error', sass.logError)
    .pipe(gulp.dest('app/css'))
    .pipe(gulp.dest('markup/css'))
});

/* JS uglifier process */
gulp.task('jsUgly', function(){
    return gulp.src('markup/js/main.js')
    .pipe(uglify())
    .pipe(rename({suffix: ".min"}))
    .pipe(gulp.dest('app/js'))
    .pipe(gulp.dest('markup/js'))
    .pipe(browserSync.reload({stream: true}))
});

/* JS concatination process. */
gulp.task('jsConcat', function(){
    return gulp.src(['markup/js/libs.js'])
    .pipe(concat('libs.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('app/js'))
    .pipe(gulp.dest('markup/js'))
    .pipe(browserSync.reload({stream: true}))
});

/* Browser-Sync HTML server init */
gulp.task('syncHtml', function() {
    return browserSync.create().init({
        proxy: "alexm/markup",
    })
    
});

/* Gulp task to automatically upgrade all libs after adding new src's to the project */
gulp.task('gulpSecondary', gulp.parallel('sass', 'sassExp', 'cssConcat', 'jsConcat', 'html', 'php', 'tpl', 'syncHtml', 'jsUgly'));

/* Just a watch task */
gulp.task('watch', function(){
    gulp.watch('gulpfile.js', gulp.parallel('gulpSecondary'))
    gulp.watch('markup/scss/*.scss', gulp.parallel('sass'))
    gulp.watch('markup/scss/*.scss', gulp.parallel('sassExp'))
    gulp.watch('markup/*.html', gulp.parallel('html'))
    gulp.watch('app/**/*.php', gulp.parallel('php'))
    gulp.watch('app/**/*.tpl', gulp.parallel('tpl'))
    gulp.watch('markup/js/main.js', gulp.parallel('jsUgly'))
    gulp.watch('markup/js/libs.js', gulp.parallel('jsConcat'))
});

/* Default Gulp task */
gulp.task('default', gulp.parallel('sass', 'sassExp', 'cssConcat', 'jsConcat', 'html', 'php', 'tpl', 'syncHtml', 'jsUgly', 'watch'));