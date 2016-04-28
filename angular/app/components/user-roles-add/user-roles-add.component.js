class UserRolesAddController{
    constructor(API){
        'ngInject';

        this.formSubmitted = false;
        this.API = API;
    }

    save(isValid) {
        if (isValid) {
            let Roles = this.API.service('roles', this.API.all('users'));

            Roles.post({
                'role': this.role,
                'slug': this.slug
            }).then(function(response) {
                console.log(response.plain());
            }, function(response) {
                console.log('error occured');
                console.log(response);
            });

        } else {
            this.formSubmitted = true;
        }
    }

    $onInit(){

    }
}

export const UserRolesAddComponent = {
    templateUrl: './views/app/components/user-roles-add/user-roles-add.component.html',
    controller: UserRolesAddController,
    controllerAs: 'vm',
    bindings: {}
}


