class UserRolesEditController {
  constructor ($stateParams, $state, API) {
    'ngInject'

    this.$state = $state
    this.formSubmitted = false
    this.alerts = []

    if ($stateParams.alerts) {
      this.alerts.push($stateParams.alerts)
    }

    let Permissions = API.service('permissions', API.all('users'))

    Permissions.getList()
      .then((response) => {
        let permissionList = []
        let permissionResponse = response.plain()

        angular.forEach(permissionResponse, function (value) {
          permissionList.push({id: value.id, name: value.name})
        })

        this.systemPermissions = permissionList
      })

    let roleId = $stateParams.roleId
    let Role = API.service('roles-show', API.all('users'))
    Role.one(roleId).get()
      .then((response) => {
        let rolePermissions = []

        angular.forEach(response.data.permissions, function (value) {
          rolePermissions.push(value.id)
        })

        response.data.permissions = rolePermissions

        this.role = API.copy(response)
      })
  }

  save (isValid) {
    if (isValid) {
      let $state = this.$state
      this.role.put()
        .then(() => {
          let alert = { type: 'success', 'title': 'Success!', msg: 'Role has been updated.' }
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

export const UserRolesEditComponent = {
  templateUrl: './views/app/components/user-roles-edit/user-roles-edit.component.html',
  controller: UserRolesEditController,
  controllerAs: 'vm',
  bindings: {}
}
