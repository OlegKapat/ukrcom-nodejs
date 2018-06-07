var gulp=require('gulp');
const css=require('gulp-css');
const autoprefixer = require('gulp-autoprefixer');
var cssnano = require('gulp-cssnano');
var plumber=require('gulp-plumber');
gulp.task('css',()=>{
    return gulp 
    .src('public/stylesheets/**/*.css')
    .pipe(plumber())
    .pipe(css())
    .pipe(autoprefixer(['last 15 version','>1%','ie8','ie7'],{
        cascade:true
    }))
    .pipe(cssnano())
    .pipe(gulp.dest('public/stylesheet'))
})
gulp.task('default',['css'],()=>{
gulp.watch('public/stylesheets/**/*.css',['css'])
})