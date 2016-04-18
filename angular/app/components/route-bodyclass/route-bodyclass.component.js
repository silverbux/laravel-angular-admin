routeBodyClass.$inject = ['$rootScope'];
function routeBodyClass ($rootScope) {
    return {
      scope: {ngModel: '=ngModel'},
      link: function routeBodyClassLink(scope, elem, attr, ctrl) {
        $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
              let fromClassnames = angular.isDefined(fromState.data) && angular.isDefined(fromState.data.bodyClass) ? fromState.data.bodyClass : null;
              let toClassnames = angular.isDefined(toState.data) && angular.isDefined(toState.data.bodyClass) ? toState.data.bodyClass : null;

              if (fromClassnames != toClassnames) {
                  if (fromClassnames) {
                      elem.removeClass(fromClassnames);
                  }

                  if (toClassnames) {
                      elem.addClass(toClassnames);
                  }
              }
          });
      },
      restrict: 'EA',
    }
}

export const RouteBodyClassComponent = routeBodyClass;