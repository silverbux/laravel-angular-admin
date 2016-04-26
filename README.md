# Laravel Angular Admin
Laravel + Angularjs + Bootstrap + AdminLTE binded by Gulp workflow Admin Dashboard Boilerplate.
Plus with social media and JWT authentication on the side.

## Screenshots
![Dashboard Screenshot](https://cloud.githubusercontent.com/assets/1888261/14597104/53b404b6-057d-11e6-876d-c83630686590.png)

![Login Screenshot](https://cloud.githubusercontent.com/assets/13616776/14597970/a366dc7c-0582-11e6-853b-776b1cf17aed.png
)

## Demo
[Click here for a live demo](http://laravel-admin.herokuapp.com)

---

![laradmin](https://cloud.githubusercontent.com/assets/1888261/14665607/dbadf93c-0706-11e6-8223-5ea3f88aa44b.png)

## Installation
```
$ composer install && npm install
```

Copy ```.env.example``` to ```.env``` and enter necessary config for DB and Oauth Providers Settings.

```
$ php artisan migrate
```

## Work Flow

**General Workflow**

```
$ gulp && gulp watch
$ php artisan serve
```

**Watching assets**

```
$ gulp && gulp watch
```

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

#### More docs to come...

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

## Contributing

Please read [code_of_conduct.md](code_of_conduct.md) for details on our code of conduct, and the process for submitting pull requests to us.

## Acknowledgments / Credits
This project wont be possible without the following, We acknowledge and are grateful to these developers for their contributions to open source. **All necessary credits are given**.

* [Laravel-Angular (Material)] (https://laravel-angular.readme.io)
* [AdminLTE] (https://github.com/almasaeed2010/AdminLTE)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details
