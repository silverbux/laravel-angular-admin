class NavHeaderController {
  constructor ($rootScope, ContextService) {
    'ngInject'

    let navHeader = this

    ContextService.me(function (data) {
      navHeader.userData = data
    })
  }

  $onInit () {}
}

export const NavHeaderComponent = {
  templateUrl: './views/app/components/nav-header/nav-header.component.html',
  controller: NavHeaderController,
  controllerAs: 'vm',
  bindings: {}
}
