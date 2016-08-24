# Laravel Angular Admin
Laravel + Angularjs + Bootstrap + AdminLTE binded by Gulp workflow Admin Dashboard Boilerplate.
Plus Oauth and JWT authentication on the side.

[![Build Status](https://travis-ci.org/silverbux/laravel-angular-admin.svg?branch=master)](https://travis-ci.org/silverbux/laravel-angular-admin)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)
[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://raw.githubusercontent.com/silverbux/laravel-angular-admin/master/LICENSE)
[![Code Climate](https://codeclimate.com/github/silverbux/laravel-angular-admin/badges/gpa.svg)](https://codeclimate.com/github/silverbux/laravel-angular-admin)
[![Issue Count](https://codeclimate.com/github/silverbux/laravel-angular-admin/badges/issue_count.svg)](https://codeclimate.com/github/silverbux/laravel-angular-admin)
[![StyleCI](https://styleci.io/repos/56498155/shield)](https://styleci.io/repos/56498155)

[![wercker status](https://app.wercker.com/status/92444e926f721c992f7f41c605d5cbc4/m "wercker status")](https://app.wercker.com/project/bykey/92444e926f721c992f7f41c605d5cbc4)

## Screenshots
![Dashboard Screenshot](https://cloud.githubusercontent.com/assets/1888261/14597104/53b404b6-057d-11e6-876d-c83630686590.png)

![Login Screenshot](https://cloud.githubusercontent.com/assets/13616776/14597970/a366dc7c-0582-11e6-853b-776b1cf17aed.png
)

## Demo
[Click here for a live demo](http://laravel-admin.herokuapp.com)

*Note: If you register or use Oauth to sign-in your info will be available on public under user lists component, you can use credentials below.*

> admin@example.com / password

![laradmin](https://cloud.githubusercontent.com/assets/1888261/15561320/1899b4b2-2327-11e6-8a3a-7e3d7ce31621.png)

## Installation
```
$ composer install && npm install
```

Open ```.env``` and enter necessary config for DB and Oauth Providers Settings.

```
$ php artisan migrate
$ php artisan db:seed
```

## Work Flow

**General Workflow**

```
$ php artisan serve --host=0
```
Open new terminal
```
$ gulp && gulp watch
```

> Default Username/Password: admin@example.com / password

**Angular Generators**

```
$ artisan ng:page name       #New page inside angular/app/pages/
$ artisan ng:dialog name     #New custom dialog inside angular/dialogs/
$ artisan ng:component name  #New component inside angular/app/components/
$ artisan ng:service name    #New service inside angular/services/
$ artisan ng:filter name     #New filter inside angular/filters/
$ artisan ng:config name     #New config inside angular/config/
```
[Laravel Angular Generator] (https://github.com/jadjoubran/laravel-ng-artisan-generators)

#### [Read Full Documentation] (http://silverbux.github.io/laravel-angular-admin)

## Need Help?
You need help customizing? You have an awesome project and you need to hire a coder? hit me up with a message my email address is indicated on my [Github Profile] (https://github.com/silverbux) OR send me a message on skype: **silverbux**

## Features
* [JWT-Auth] (https://github.com/tymondesigns/jwt-auth)
* [Socialite] (https://github.com/laravel/socialite)
* [Dingo/API] (https://github.com/dingo/api)
* [Restangular] (https://github.com/mgonto/restangular)
* [UI-Router] (https://github.com/angular-ui/ui-router/)
* Access Control List
    * [Romanbican/Roles] (https://github.com/romanbican/roles)
    * [Angular ACL] (https://github.com/mikemclin/angular-acl)

## Built With
* [Laravel] (http://laravel.com)
* [Angularjs] (https://angularjs.org)
* [Twitter Bootstrap] (https://getbootstrap.com)
* [Composer] (https://getcomposer.org/)
* [Gulp.JS] (http://gulpjs.com/)
* [BOWER] (http://bower.io/)
* [NPM] (https://www.npmjs.com/)

## Deploy to heroku

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy)

1. Click deploy button
2. After build and "successfully deployed", Click Manage App
3. Go to settings and click "Reveal Config Vars"
4. Set necessary config for DB based from CLEARDB_DATABASE_URL or from your custom database
5. Execute migration and db seed with the following commands

**Database Migration**
```
$ heroku run php artisan migrate --app your_app_name
```
**Database Seeds**
```
$ heroku run php artisan migrate --app your_app_name
```

## Contributing

Thank you for contributing to this repository.

## Acknowledgments / Credits
This project wont be possible without the following, We acknowledge and are grateful to these developers for their contributions to open source. **All necessary credits are given**.

* [Laravel-Angular (Material)] (https://laravel-angular.readme.io)
* [AdminLTE] (https://github.com/almasaeed2010/AdminLTE)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details