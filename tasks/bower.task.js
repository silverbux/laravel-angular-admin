var gulp = require('gulp')
var mainBowerFiles = require('main-bower-files')
var filter = require('gulp-filter')
var notify = require('gulp-notify')
var cssnano = require('gulp-cssnano')
var uglify = require('gulp-uglify')
var concat_sm = require('gulp-concat-sourcemap')
var concat = require('gulp-concat')
var gulpIf = require('gulp-if')
var Elixir = require('laravel-elixir')
var Task = Elixir.Task

Elixir.extend('bower', function (jsOutputFile, jsOutputFolder, cssOutputFile, cssOutputFolder) {
  var cssFile = cssOutputFile || 'vendor.css'
  var jsFile = jsOutputFile || 'vendor.js'

  if (!Elixir.config.production) {
    concat = concat_sm
  }

  var onError = function (err) {
    notify.onError({
      title: 'Laravel Elixir',
      subtitle: 'Bower Files Compilation Failed!',
      message: 'Error: <%= error.message %>',
      icon: __dirname + '/../node_modules/laravel-elixir/icons/fail.png'
    })(err)
    this.emit('end')
  }

  new Task('bower-js', function () {
    return gulp.src(mainBowerFiles({
      overrides: {
        bootstrap: {
          'ignore': true
        },
        AdminLTE: {
          'ignore': true
        }
      }
    }))
      .on('error', onError)
      .pipe(filter('**/*.js'))
      .pipe(concat(jsFile, {sourcesContent: true}))
      .pipe(gulpIf(Elixir.config.production, uglify()))
      .pipe(gulp.dest(jsOutputFolder || Elixir.config.js.outputFolder))
      .pipe(notify({
        title: 'Laravel Elixir',
        subtitle: 'Javascript Bower Files Imported!',
        icon: __dirname + '/../node_modules/laravel-elixir/icons/laravel.png',
        message: ' '
      }))
  }).watch('bower.json')

  new Task('bower-css', function () {
    return gulp.src(mainBowerFiles({
      overrides: {
        AdminLTE: {
          main: [
            './dist/css/*.min.css',
            './dist/css/skins/' + Elixir.config.css.lteSkin,
          ]
        },
        bootstrap: {
          main: [
            './dist/css/bootstrap.min.css'
          ]
        },
        'angular-chart.js': {
          'ignore': true
        },
        'angular-datatables': {
          'ignore': true
        },
        'angular-bootstrap': {
          'ignore': true
        }
      }
    }))
      .on('error', onError)
      .pipe(filter('**/*.css'))
      .pipe(concat(cssFile))
      .pipe(gulpIf(config.production, cssnano({safe: true})))
      .pipe(gulp.dest(cssOutputFolder || config.css.outputFolder))
      .pipe(notify({
        title: 'Laravel Elixir',
        subtitle: 'CSS Bower Files Imported!',
        icon: __dirname + '/../node_modules/laravel-elixir/icons/laravel.png',
        message: ' '
      }))
  }).watch('bower.json')

  new Task('bower-fonts', function () {
    return gulp.src(mainBowerFiles({
      overrides: {
        bootstrap: {
          main: [
            './dist/fonts/*.*'
          ]
        }
      }
    }))
      .pipe(filter('**/*.{eot,svg,ttf,woff,woff2}'))
      .pipe(gulp.dest(config.fonts.outputFolder))
  }).watch('bower.json')
})
