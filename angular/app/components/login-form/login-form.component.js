class LoginFormController {
  constructor ($auth, $state, $stateParams, API, AclService) {
    'ngInject'

    this.$auth = $auth
    this.$state = $state
    this.$stateParams = $stateParams
    this.AclService = AclService

    this.registerSuccess = $stateParams.registerSuccess
    this.loginfailed = false
    this.email = ''
    this.password = ''
  }

  login () {
    let user = {
      email: this.email,
      password: this.password
    }

    this.$auth.login(user)
      .then((response) => {
        let data = response.data.data
        this.AclService.attachRole(data.userRole)
        this.AclService.setAbilities(data.abilities)
        this.$auth.setToken(response.data)
        this.$state.go('app.landing')
      })
      .catch(this.failedLogin.bind(this))
  }

  failedLogin (response) {
    this.loginfailed = true
  }
}

export const LoginFormComponent = {
  templateUrl: './views/app/components/login-form/login-form.component.html',
  controller: LoginFormController,
  controllerAs: 'vm',
  bindings: {}
}
