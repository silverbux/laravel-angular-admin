var elixir = require('laravel-elixir')
require('laravel-elixir-karma')
require('./tasks/angular.task.js')
require('./tasks/bower.task.js')
require('./tasks/ngHtml2Js.task.js')

if (!elixir.config.production) {
  require('./tasks/phpcs.task.js')
}

/*
 |--------------------------------------------------------------------------
 | Elixir Asset Management
 |--------------------------------------------------------------------------
 |
 | Elixir provides a clean, fluent API for defining some basic Gulp tasks
 | for your Laravel application. By default, we are compiling the Sass
 | file for our application, as well as publishing vendor resources.
 |
 */

elixir(function (mix) {
  var jsOutputFolder = config.js.outputFolder
  var cssOutputFolder = config.css.outputFolder
  var fontsOutputFolder = config.fonts.outputFolder
  var buildPath = config.buildPath

  var assets = [
      jsOutputFolder + '/vendor.js',
      jsOutputFolder + '/partials.js',
      jsOutputFolder + '/app.js',
      cssOutputFolder + '/vendor.css',
      cssOutputFolder + '/app.css'
    ],
    karmaJsDir = [
      jsOutputFolder + '/vendor.js',
      'node_modules/angular-mocks/angular-mocks.js',
      'node_modules/ng-describe/dist/ng-describe.js',
      jsOutputFolder + '/partials.js',
      jsOutputFolder + '/app.js',
      'tests/angular/**/*.spec.js'
  ]

  mix
    .bower()
    .angular('./angular/')
    .ngHtml2Js('./angular/**/*.html')
    .sass('./angular/**/*.scss', 'public/css')
    .version(assets)
    .browserSync({
      proxy: 'localhost:8000'
    })
    .karma({
      jsDir: karmaJsDir
    })

  mix
    .copy(fontsOutputFolder, buildPath + '/fonts')
})
