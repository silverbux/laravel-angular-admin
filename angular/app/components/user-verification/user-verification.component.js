class UserVerificationController {
  constructor ($stateParams) {
    'ngInject'
    this.alerts = []

    if ($stateParams.status === 'success') {
      this.alerts.push({ type: 'success', 'title': 'Success!', msg: 'Email Verification Success.' })
    } else {
      this.alerts.push({ type: 'danger', 'title': 'Error:', msg: 'Email verification failed.' })
    }
  }

  $onInit () {}
}

export const UserVerificationComponent = {
  templateUrl: './views/app/components/user-verification/user-verification.component.html',
  controller: UserVerificationController,
  controllerAs: 'vm',
  bindings: {}
}
