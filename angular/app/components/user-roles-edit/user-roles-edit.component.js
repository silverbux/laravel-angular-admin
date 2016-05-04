class UserRolesEditController{
    constructor($stateParams, $state, API){
        'ngInject';

        this.$state = $state;
        this.formSubmitted = false;
        this.alerts = [];

        if ($stateParams.alerts) {
            this.alerts.push($stateParams.alerts);
        }

        let roleId = $stateParams.roleId;
        let Role = API.service('roles-show', API.all('users'));
        Role.one(roleId).get()
            .then((response) => {
                let res = response.plain()
                let data = res.data.role

                this.role = API.copy(response)
            }, (response) => {
                console.log(response);
            });
    }

    save(isValid, roleForm) {
        if (isValid) {
            let $state = this.$state;
            this.role.put()
            .then((response) => {
                let alert = { type: 'success', 'title': 'Success!', msg: 'Role has been updated.' };
                $state.go($state.current, { alerts: alert});
            }, (response) => {
                let alert = { type: 'error', 'title': 'Error!', msg: response.data.message };
                $state.go($state.current, { alerts: alert});
            });
        } else {
            this.formSubmitted = true;
        }
    }

    $onInit(){

    }
}

export const UserRolesEditComponent = {
    templateUrl: './views/app/components/user-roles-edit/user-roles-edit.component.html',
    controller: UserRolesEditController,
    controllerAs: 'vm',
    bindings: {}
}


