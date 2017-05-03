var gulp       = require('gulp'), // Подключаем Gulp
	sass         = require('gulp-sass'), //Подключаем Sass пакет,
	browserSync  = require('browser-sync'), // Подключаем Browser Sync
	concat       = require('gulp-concat'), // Подключаем gulp-concat (для конкатенации файлов)
	uglify       = require('gulp-uglifyjs'), // Подключаем gulp-uglifyjs (для сжатия JS)
	cssnano      = require('gulp-cssnano'), // Подключаем пакет для минификации CSS
	rename       = require('gulp-rename'), // Подключаем библиотеку для переименования файлов
	del          = require('del'), // Подключаем библиотеку для удаления файлов и папок
	imagemin     = require('gulp-imagemin'), // Minify PNG, JPEG, GIF and SVG images with imagemin
	pngquant     = require('imagemin-pngquant'), // Подключаем библиотеку для работы с png
	cache        = require('gulp-cache'), // Подключаем библиотеку кеширования
	autoprefixer = require('gulp-autoprefixer'), // Подключаем библиотеку для автоматического добавления префиксов
	gutil        = require('gulp-util'),  // Utility functions for gulp plugins
	ftp          = require('vinyl-ftp'), // Подключаем FTP
	notify       = require("gulp-notify"),
	htmlmin      = require('gulp-htmlmin');  // Сжатие HTML



gulp.task('sass', function(){ // Создаем таск Sass
	return gulp.src('app/sass/**/*.sass') // Берем источник
		// .pipe(sass({outputStyle: 'expand'}).on("error", notify.onError()))
		.pipe(sass({outputStyle: 'compressed'}).on("error", notify.onError()))
		.pipe(rename({suffix: '.min', prefix : ''}))
		.pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true })) // Создаем префиксы
		// .pipe(cleanCSS()) // Опционально, закомментировать при отладке
		.pipe(gulp.dest('app/css')) // Выгружаем результата в папку app/css
		.pipe(browserSync.reload({stream: true})) // Обновляем CSS на странице при изменении
});

gulp.task('browser-sync', function() { // Создаем таск browser-sync
	browserSync({ // Выполняем browserSync
		server: { // Определяем параметры сервера
			baseDir: 'app' // Директория для сервера - app
		},
		notify: false, // Отключаем уведомления
		open: false // for headless environment
	});
});

// Скрипты проекта

gulp.task('common-js', function() {
	return gulp.src([
		'app/js/common.js',
		])
	.pipe(concat('common.min.js'))
	.pipe(uglify())
	.pipe(gulp.dest('app/js'))
});

gulp.task('js', ['common-js'], function() {
	return gulp.src([ // Берем все необходимые библиотеки
		'app/libs/jquery/dist/jquery.min.js', // Берем jQuery
		'app/libs/mmenu/dist/jquery.mmenu.all.min.js',  // Подключаем mmenu
		'app/libs/owl.carousel/dist/owl.carousel.min.js', // Подключаем owl.carousel
		'app/libs/equal-height/dist/jquery.equalHeight.min.js', // Подключаем equal-height
		'app/libs/fotorama/fotorama.js', // Подключаем fotorama
		'app/libs/selectize/dist/js/standalone/selectize.min.js', // Подключаем selectize
		'app/libs/jquery-validation/dist/jquery.validate.min.js', // Подключаем jquery-validation
		'app/js/common.min.js' // Всегда в конце
		])
		.pipe(concat('scripts.min.js')) // Собираем их в кучу в новом файле libs.min.js
		// .pipe(uglify()) // Сжимаем JS файл
		.pipe(gulp.dest('app/js')) // Выгружаем в папку app/js
		.pipe(browserSync.reload({stream: true})) // Обновляем JS на странице при изменении;
});

gulp.task('watch', ['browser-sync', 'sass', 'js'], function() {
	gulp.watch('app/sass/**/*.sass', ['sass']); // Наблюдение за sass файлами в папке sass
	gulp.watch(['libs/**/*.js', 'app/js/common.js'], ['js']); // Наблюдение за js файлами в папке sass
	gulp.watch('app/*.html', browserSync.reload); // Наблюдение за HTML файлами в корне проекта
});

gulp.task('clean', function() {
	return del.sync('dist'); // Удаляем папку dist перед сборкой
});

gulp.task('img', function() {
	return gulp.src(['app/img/**/*']) // Берем все изображения из app
	.pipe(cache(imagemin([  //  // Для версии >= 3
    imagemin.gifsicle({interlaced: true}),
    imagemin.jpegtran({progressive: true}),
    imagemin.optipng({optimizationLevel: 5}),
    imagemin.svgo({plugins: [{removeViewBox: true}]})
		]
		, {verbose: true}
	)))
		.on("error", notify.onError())
		.pipe(gulp.dest('dist/img')); // Выгружаем на продакшен
});


gulp.task('html', function() {
  return gulp.src('app/index.html')
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('dist'));
});


gulp.task('build', ['clean', 'img', 'sass', 'js', 'html'], function() {

	var buildCss = gulp.src([ // Переносим библиотеки в продакшен
		'app/css/main.min.css'
		])
	.pipe(gulp.dest('dist/css'))

	var buildFonts = gulp.src('app/fonts/**/*') // Переносим шрифты в продакшен
	.pipe(gulp.dest('dist/fonts'))

	var buildJs = gulp.src('app/js/scripts.min.js') // Переносим скрипты в продакшен
	.pipe(gulp.dest('dist/js'))

	var buildHtml = gulp.src(['app/mail.php', 'app/.htaccess']) // Переносим  в продакшен
	.pipe(gulp.dest('dist'));

});

gulp.task('deploy', function() {

	var conn = ftp.create({
		host:      'lekua.ftp.ukraine.com.ua',
		user:      'lekua_ftp',
		password:  '92g9sgb3',
		parallel:  10,
		log: gutil.log
	});

	var globs = [
	'dist/**',
	'dist/.htaccess',
	];
	return gulp.src(globs, {buffer: false})
	.pipe(conn.newer('/lekua.in.ua/ad/dj7')) // only upload newer files 
	.pipe(conn.dest('/lekua.in.ua/ad/dj7'));

});

gulp.task('clear', function (callback) {
	return cache.clearAll();
})

gulp.task('default', ['watch']);
