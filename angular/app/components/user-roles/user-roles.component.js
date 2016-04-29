class UserRolesController {
    constructor($scope, $compile, DTOptionsBuilder, DTColumnBuilder, API) {
        'ngInject';
        let Roles = API.service('roles', API.all('users'));

        Roles.getList()
            .then((response) => {
                let dataSet = response.plain()

                this.dtOptions = DTOptionsBuilder.newOptions()
                    .withOption('data', dataSet)
                    .withOption('createdRow', createdRow)
                    .withOption('responsive', true)
                    .withBootstrap()

                this.dtColumns = [
                    DTColumnBuilder.newColumn('id').withTitle('ID'),
                    DTColumnBuilder.newColumn('name').withTitle('Name'),
                    DTColumnBuilder.newColumn('slug').withTitle('Slug'),
                    DTColumnBuilder.newColumn(null).withTitle('Actions').notSortable()
                    .renderWith(actionsHtml)
                ];

                this.displayTable = true;
            }, (response) => {
                console.log(response);
            });

        let createdRow = (row, data, dataIndex) => {
            $compile(angular.element(row).contents())($scope);
        }

        let actionsHtml = (data, type, full, meta) => {
            return `
                <button class="btn btn-xs btn-warning" ng-click="vm.edit(${data.id})">
                    <i class="fa fa-edit"></i>
                </button>
                &nbsp;
                <button class="btn btn-xs btn-danger" ng-click="vm.delete(${data.id})">
                    <i class="fa fa-trash-o"></i>
                </button>`;
        }
    }

    edit(data) {
        console.log(data);
    }

    delete(data) {
        console.log(data);
    }

    $onInit() {}
}

export const UserRolesComponent = {
    templateUrl: './views/app/components/user-roles/user-roles.component.html',
    controller: UserRolesController,
    controllerAs: 'vm',
    bindings: {}
}