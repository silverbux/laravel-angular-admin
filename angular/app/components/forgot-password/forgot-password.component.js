class ForgotPasswordController {
  constructor (API, $state) {
    'ngInject'

    this.API = API
    this.$state = $state
    this.formSubmitted = false
  }

  $onInit () {
    this.email = ''
  }

  submit () {
    this.API.all('auth/password/email').post({
      email: this.email
    }).then(() => {
      this.$state.go('login', { successMsg: `Please check your email for instructions on how to reset your password.` })
    }, () => {
      this.formSubmitted = true
    })
  }
}

export const ForgotPasswordComponent = {
  templateUrl: './views/app/components/forgot-password/forgot-password.component.html',
  controller: ForgotPasswordController,
  controllerAs: 'vm',
  bindings: {}
}
