export function RoutesConfig($stateProvider, $urlRouterProvider) {
	'ngInject';

	var getView = (viewName) => {
		return `./views/app/pages/${viewName}/${viewName}.page.html`;
	};

    var getLayout = (layout) => {
        return `./views/app/pages/layout/${layout}.page.html`;
    };

	$urlRouterProvider.otherwise('/');

	$stateProvider
		.state('app', {
			abstract: true,
			views: {
                'layout': {
                    templateUrl: getLayout('layout')
                },
				'header@app': {
					templateUrl: getView('header')
				},
				'footer@app': {
					templateUrl: getView('footer')
				},
				main: {}
			},
            data : {
                bodyClass : 'hold-transition skin-blue sidebar-mini'
            }
		})
		.state('app.landing', {
            url: '/',
            data: {
                auth: true
            },
            views: {
                'main@app': {
                    templateUrl: getView('landing')
                }
            }
        })
        .state('app.userlist', {
            url: '/user-lists',
            data: {
                auth: true
            },
            views: {
                'main@app': {
                    template: '<userLists></userLists>'
                }
            }
        })
        .state('app.userroles', {
            url: '/user-roles',
            data: {
                auth: true
            },
            views: {
                'main@app': {
                    template: '<userRoles></userRoles>'
                }
            }
        })
        .state('login', {
			url: '/login',
			views: {
				'layout': {
					templateUrl: getView('login')
				},
                'header@app': {},
                'footer@app': {},
			},
            data : {
                bodyClass : 'hold-transition login-page'
            },
            params:{
                registerSuccess:null
            }
		})
        .state('loginloader', {
            url: '/login-loader',
            views: {
                'main@app': {
                    templateUrl: getView('login-loader')
                },
                'header@app': {},
                'footer@app': {},
            },
            data : {
                bodyClass : 'hold-transition login-page'
            },
        })
        .state('register', {
            url: '/register',
            views: {
                'layout': {
                    templateUrl: getView('register')
                },
                'header@app': {},
                'footer@app': {},
            },
            data : {
                bodyClass : 'hold-transition register-page'
            }
        })
        .state('app.create_post', {
            url: '/create-post',
            views: {
                'main@': {
                    templateUrl: getView('create_post')
                }
            },
            data: {
                auth: true
            }
         })
        .state('app.logout', {
            url: '/logout',
            views: {
                'main@app': {
                    controller: function($scope, $auth, $state, AclService) {
                        $auth.logout().then(function(oldUser) {
                            AclService.flushRoles();
                            $state.go('login');
                        });
                    }
                }
            }
         });
}
