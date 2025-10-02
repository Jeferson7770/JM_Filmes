const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const imagemin = require('gulp-imagemin');
const uglify = require('gulp-uglify');

// Minificar e copiar scripts
function scripts(){
    return gulp.src('./src/scripts/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('./dist/js'));
}

// Compilar SCSS em CSS minificado
function styles(){
    return gulp.src('./src/styles/*.scss')
        .pipe(sass({outputStyle: 'compressed'}))
        .pipe(gulp.dest('./dist/css'));
}

// Otimizar imagens
function images(){
    return gulp.src('./src/img/**/*')
        .pipe(imagemin())
        .pipe(gulp.dest('./dist/img'));
}

// Copiar HTML da raiz para dist
function html() {
    return gulp.src('./*.html') // pega index.html, login.html, register.html
        .pipe(gulp.dest('./dist'));
}

// Task padrão (build completo)
exports.default = gulp.parallel(styles, images, scripts, html);

// Modo watch (desenvolvimento)
exports.watch = function(){
    gulp.watch('./src/styles/*.scss', gulp.parallel(styles));
    gulp.watch('./src/scripts/*.js', gulp.parallel(scripts));
    gulp.watch('./*.html', gulp.parallel(html));
};
