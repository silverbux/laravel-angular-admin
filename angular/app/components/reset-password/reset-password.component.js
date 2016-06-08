class ResetPasswordController {
  constructor (API, $state) {
    'ngInject'

    this.API = API
    this.$state = $state
    this.alerts = []
  }

  $onInit () {
    this.password = ''
    this.password_confirmation = ''
    this.isValidToken = false
    this.formSubmitted = false

    this.verifyToken()
  }

  verifyToken () {
    let email = this.$state.params.email
    let token = this.$state.params.token

    this.API.all('auth/password').get('verify', {
    email, token}).then(() => {
      this.isValidToken = true
    }, () => {
      this.$state.go('app.landing')
    })
  }

  submit (isValid) {
    if (isValid) {
      this.alerts = []
      let data = {
        email: this.$state.params.email,
        token: this.$state.params.token,
        password: this.password,
        password_confirmation: this.password_confirmation
      }

      this.API.all('auth/password/reset').post(data).then(() => {
        this.$state.go('login', {successMsg: `Your password has been changed, You may now login.`})
      }, (res) => {
        let alrtArr = []

        angular.forEach(res.data.errors, function (value) {
          alrtArr = {type: 'error', 'title': 'Error!', msg: value[0]}
        })

        this.alerts.push(alrtArr)
      })
    } else {
      this.formSubmitted = true
    }
  }
}

export const ResetPasswordComponent = {
  templateUrl: './views/app/components/reset-password/reset-password.component.html',
  controller: ResetPasswordController,
  controllerAs: 'vm',
  bindings: {}
}
