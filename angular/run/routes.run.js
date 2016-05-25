export function RoutesRun ($rootScope, $state, $auth, AclService, $timeout, API) {
  'ngInject'

  AclService.resume()

  if ($auth.isAuthenticated()) {
    let UserData = API.service('me', API.all('users'))
    UserData.one().get()
      .then((response) => {
        $rootScope.me = API.copy(response)
      })
  }

  /*eslint-disable */
  let deregisterationCallback = $rootScope.$on('$stateChangeStart', function (event, toState) {
    if (toState.data && toState.data.auth) {
      if (!$auth.isAuthenticated()) {
        event.preventDefault()
        return $state.go('login')
      }
    }

    $rootScope.bodyClass = 'hold-transition login-page'
  })

  function fixSideBar () {
    $timeout(function () {
      var neg = $('.main-header').outerHeight() + $('.main-footer').outerHeight()
      var window_height = $(window).height()
      var sidebar_height = $('.sidebar').height()

      if ($('body').hasClass('fixed')) {
        $('.content-wrapper, .right-side').css('min-height', window_height - $('.main-footer').outerHeight())
      } else {
        if (window_height >= sidebar_height) {
          $('.content-wrapper, .right-side').css('min-height', window_height - neg)
        } else {
          $('.content-wrapper, .right-side').css('min-height', sidebar_height)
        }
      }
    })
  }

  $rootScope.$on('$destroy', deregisterationCallback)
  $rootScope.$on('$stateChangeSuccess', fixSideBar)
/*eslint-enable */
}
