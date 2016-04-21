export function RoutesRun($rootScope, $state, $auth, AclService) {
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
                return $state.go('app.login');
            }
        }

        $rootScope.bodyClass = 'hold-transition login-page';
    });

    $rootScope.$on('$destroy', deregisterationCallback)
}
