class NavSidebarController {
  constructor (AclService, ContextService) {
    'ngInject'

    let navSideBar = this
    this.can = AclService.can

    ContextService.me(function (data) {
      navSideBar.userData = data
    })
  }

  $onInit () {}
}

export const NavSidebarComponent = {
  templateUrl: './views/app/components/nav-sidebar/nav-sidebar.component.html',
  controller: NavSidebarController,
  controllerAs: 'vm',
  bindings: {}
}
