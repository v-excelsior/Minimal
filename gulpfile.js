let gulp = require('gulp'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync').create(),
    svgSprite = require('gulp-svg-sprite');

gulp.task('sass', function () {
    return gulp.src('./src/scss/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./css'))
        .pipe(browserSync.stream());
});

gulp.task('sprite', () => {
    let config = {
        log: "verbose",
        shape: {
            id: {
                separator: "-"
            },
            transform: [
                {
                    svgo: {
                        plugins: [
                            {
                                cleanupListOfValues: {
                                    floatPrecision: 0
                                }
                            },
                            { removeXMLNS: true },
                            { removeTitle: false }
                        ]
                    }
                }
            ]
        },
        mode: {
            symbol: {
                dest: ".",
                sprite: "icon-sprite.svg"
            }
        }
    };
    return gulp.src("**/*.svg", { cwd: "src/icon" })
        .pipe(svgSprite(config))
        .pipe(gulp.dest('img'));
})

gulp.task('watchAll', function () {
    browserSync.init({
        server: {
            baseDir: "./",
        }
    });
    gulp.watch('./src/scss/**/*.scss', gulp.series('sass'));
    gulp.watch('./*.html').on('change', browserSync.reload);
});

gulp.task("default", gulp.series(gulp.parallel("watchAll")));