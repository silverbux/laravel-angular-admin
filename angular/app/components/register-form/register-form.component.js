class RegisterFormController {
    constructor($auth, $state) {
        'ngInject';

        this.$auth = $auth;
        this.$state = $state;

        this.name = '';
        this.email = '';
        this.password = '';
        this.formSubmitted = false;
    }

    register(isValid) {
        if (isValid) {
            var user = {
                name: this.name,
                email: this.email,
                password: this.password
            };

            this.$auth.signup(user)
                .then((response) => {
                    this.$state.go('app.login', { registerSuccess: true })
                })
                .catch(this.failedRegistration.bind(this));
        } else {
            this.formSubmitted = true;
        }
    }

    failedRegistration(response) {
        if (response.status === 422) {
            for (var error in response.data.errors) {
                // return this.ToastService.error(response.data.errors[error][0]);
            }
        }
        // this.ToastService.error(response.statusText);
    }
}

export const RegisterFormComponent = {
    templateUrl: './views/app/components/register-form/register-form.component.html',
    controller: RegisterFormController,
    controllerAs: 'vm',
    bindings: {}
}
