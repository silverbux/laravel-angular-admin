export function RoutesRun($rootScope, $state, $auth, AclService, $timeout) {
    'ngInject';

    if (!AclService.resume()) {
        console.log('resumed');
        // Get the user role, and add it to AclService
        // var userRole = fetchUserRoleFromSomewhere();
        var userRole = 'admin';
        AclService.attachRole(userRole);

        // Get ACL data, and add it to AclService
        // var aclData = fetchAclFromSomewhere();
        var abilities = {
            guest: ['login'],
            user: ['logout', 'view_content'],
            admin: ['logout', 'view_content', 'manage_content']
        }

        AclService.setAbilities(abilities);
    }

    var deregisterationCallback =  $rootScope.$on("$stateChangeStart", function(event, toState) {

        if (toState.data && toState.data.auth) {
            /*Cancel going to the authenticated state and go back to the login page*/
            if (!$auth.isAuthenticated()) {
                event.preventDefault();
                return $state.go('login');
            }
        }

        $rootScope.bodyClass = 'hold-transition login-page';
    });

    function fixSideBar(event, toState, toParams, fromState, fromParams){
        $timeout(function(){
            var neg = $('.main-header').outerHeight() + $('.main-footer').outerHeight();
            var window_height = $(window).height();
            var sidebar_height = $('.sidebar').height();

            if ($('body').hasClass('fixed')) {
              $('.content-wrapper, .right-side').css('min-height', window_height - $('.main-footer').outerHeight());
            } else {
              if (window_height >= sidebar_height) {
                $('.content-wrapper, .right-side').css('min-height', window_height - neg);
              } else {
                $('.content-wrapper, .right-side').css('min-height', sidebar_height);
              }
            }
        });
    }

    $rootScope.$on('$destroy', deregisterationCallback)
    $rootScope.$on('$stateChangeSuccess',fixSideBar);
}
