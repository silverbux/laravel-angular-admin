<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/

Route::group(['middleware' => ['web']], function () {
    Route::get('auth/{provider}', ['uses' =>'Auth\AuthController@redirectToProvider']);
    Route::get('auth/{provider}/callback', ['uses' =>'Auth\AuthController@handleProviderCallback']);
    Route::get('/api/authenticate/user', 'Auth\AuthController@getAuthenticatedUser');
    Route::get('/', 'AngularController@serveApp');
    Route::get('/unsupported-browser', 'AngularController@unsupported');
});

$api->group(['middleware' => ['api']], function ($api) {
    $api->controller('auth', 'Auth\AuthController');
});

//protected routes with JWT (must be logged in)
$api->group(['middleware' => ['api', 'api.auth']], function ($api) {
    $api->post('posts', 'PostsController@create');
});

// ADMIN ROUTES
$api->group(['middleware' => ['api', 'api.auth', 'role:admin']], function ($api) {
    $api->post('sampleadminroute', [
        'as' => 'sampleadminroute',
        'uses' => 'PostsController@sampleadminroute',
    ]);
});
