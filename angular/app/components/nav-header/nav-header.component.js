class NavHeaderController {
  constructor (ContextService) {
    'ngInject'

    ContextService.me()
      .then((response) => {
        response = response.plain()
        this.userData = response.data
      })
  //
  }
}

export const NavHeaderComponent = {
  templateUrl: './views/app/components/nav-header/nav-header.component.html',
  controller: NavHeaderController,
  controllerAs: 'vm',
  bindings: {}
}
