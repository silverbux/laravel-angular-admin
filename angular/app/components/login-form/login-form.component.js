class LoginFormController {
	constructor($auth, $state, $stateParams, API) {
		'ngInject';

		this.$auth = $auth;
		this.$state = $state;
		this.$stateParams = $stateParams;

		this.registerSuccess = $stateParams.registerSuccess;
		this.loginfailed = false;
		this.email = '';
		this.password = '';
	}

	login() {
		var user = {
			email: this.email,
			password: this.password
		};

		this.$auth.login(user)
			.then((response) => {
				this.$auth.setToken(response.data);
				this.$state.go('app.landing')
			})
			.catch(this.failedLogin.bind(this));
	}

	failedLogin(response) {
		this.loginfailed = true;
	}
}

export const LoginFormComponent = {
	templateUrl: './views/app/components/login-form/login-form.component.html',
	controller: LoginFormController,
	controllerAs: 'vm',
	bindings: {}
}
