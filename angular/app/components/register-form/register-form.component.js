class RegisterFormController {
  constructor ($auth, $state, $scope) {
    'ngInject'

    this.$auth = $auth
    this.$state = $state
    this.$scope = $scope

    this.password = ''
    this.password_confirmation = ''
    this.formSubmitted = false
    this.errors = []
  }

  $onInit () {
    this.name = ''
    this.email = ''
    this.password = ''
    this.password_confirmation = ''
  }

  register (isValid) {
    if (isValid) {
      var user = {
        name: this.name,
        email: this.email,
        password: this.password,
        password_confirmation: this.password_confirmation
      }

      this.$auth.signup(user)
        .then(() => {
          this.$state.go('login', { registerSuccess: true })
        })
        .catch(this.failedRegistration.bind(this))
    } else {
      this.formSubmitted = true
    }
  }

  failedRegistration (response) {
    if (response.status === 422) {
      for (var error in response.data.errors) {
        this.errors[error] = response.data.errors[error][0]
        this.$scope.userForm[error].$invalid = true
      }
    }
  }
}

export const RegisterFormComponent = {
  templateUrl: './views/app/components/register-form/register-form.component.html',
  controller: RegisterFormController,
  controllerAs: 'vm',
  bindings: {}
}
