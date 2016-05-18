class LoginLoaderController {
  constructor ($state, $auth, API, AclService) {
    'ngInject'

    API.oneUrl('authenticate').one('user').get().then((response) => {
      if (!response.error) {
        let data = response.data

        angular.forEach(data.userRole, function (value) {
          AclService.attachRole(value)
        })

        AclService.setAbilities(data.abilities)
        $auth.setToken(data.token)
        $state.go('app.landing')
      }
    })
  }
}

export const LoginLoaderComponent = {
  templateUrl: './views/app/components/login-loader/login-loader.component.html',
  controller: LoginLoaderController,
  controllerAs: 'vm',
  bindings: {}
}
