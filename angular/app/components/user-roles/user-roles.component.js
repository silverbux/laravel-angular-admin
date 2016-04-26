class UserRolesController{
    constructor($scope, $compile, DTOptionsBuilder, DTColumnBuilder){
        'ngInject';

        this.dtOptions = DTOptionsBuilder
        .fromSource('http://l-lin.github.io/angular-datatables/data.json')
        .withOption('createdRow', createdRow)
        .withBootstrap();

        this.dtColumns = [
            DTColumnBuilder.newColumn('id').withTitle('ID'),
            DTColumnBuilder.newColumn('firstName').withTitle('First name'),
            DTColumnBuilder.newColumn('lastName').withTitle('Last name'),
            DTColumnBuilder.newColumn(null).withTitle('Actions').notSortable()
            .renderWith(actionsHtml)
        ];

        function createdRow(row, data, dataIndex) {
            $compile(angular.element(row).contents())($scope);
        }

        function actionsHtml(data, type, full, meta) {
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

    $onInit(){
    }
}

export const UserRolesComponent = {
    templateUrl: './views/app/components/user-roles/user-roles.component.html',
    controller: UserRolesController,
    controllerAs: 'vm',
    bindings: {}
}


