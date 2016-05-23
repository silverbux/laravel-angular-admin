class UserProfileController {
  constructor ($stateParams, $state, API) {
    'ngInject'

    this.$state = $state
    this.formSubmitted = false
    this.alerts = []
    this.userRolesSelected = []

    if ($stateParams.alerts) {
      this.alerts.push($stateParams.alerts)
    }

    let UserData = API.service('me', API.all('users'))
    UserData.one().get()
      .then((response) => {
        this.userdata = API.copy(response)
        this.userdata.data.current_password = ''
        this.userdata.data.new_password = ''
        this.userdata.data.new_password_confirmation = ''
      })
  }

  save (isValid, userForm) {
    if (isValid) {
      let $state = this.$state

      this.userdata.put()
        .then(() => {
          let alert = { type: 'success', 'title': 'Success!', msg: 'Profile has been updated.' }
          $state.go($state.current, { alerts: alert})
        }, (response) => {
          let formErrors = []

          if (angular.isDefined(response.data.errors.message)) {
            formErrors = response.data.errors.message[0]
          } else {
            formErrors = response.data.errors
          }

          angular.forEach(formErrors, function (value, key) {
            let varkey = key.replace('data.', '')
            userForm[varkey].$invalid = true
            userForm[varkey].customError = value[0]
          })

          this.formSubmitted = true
        })
    } else {
      this.formSubmitted = true
    }
  }

  $onInit () {}
}

export const UserProfileComponent = {
  templateUrl: './views/app/components/user-profile/user-profile.component.html',
  controller: UserProfileController,
  controllerAs: 'vm',
  bindings: {}
}
