class UserPermissionsEditController {
  constructor ($stateParams, $state, API) {
    'ngInject'

    this.$state = $state
    this.formSubmitted = false
    this.alerts = []

    if ($stateParams.alerts) {
      this.alerts.push($stateParams.alerts)
    }

    let permissionId = $stateParams.permissionId
    let Permission = API.service('permissions-show', API.all('users'))
    Permission.one(permissionId).get()
      .then((response) => {
        this.permission = API.copy(response)
      })
  }

  save (isValid) {
    if (isValid) {
      let $state = this.$state
      this.permission.put()
        .then(() => {
          let alert = { type: 'success', 'title': 'Success!', msg: 'Permission has been updated.' }
          $state.go($state.current, { alerts: alert})
        }, (response) => {
          let alert = { type: 'error', 'title': 'Error!', msg: response.data.message }
          $state.go($state.current, { alerts: alert})
        })
    } else {
      this.formSubmitted = true
    }
  }

  $onInit () {}
}

export const UserPermissionsEditComponent = {
  templateUrl: './views/app/components/user-permissions-edit/user-permissions-edit.component.html',
  controller: UserPermissionsEditController,
  controllerAs: 'vm',
  bindings: {}
}
