class ChartsFlotController {
  constructor ($rootScope, $scope, $auth, $state, $stateParams, API, AclService) {
    'ngInject'

  
      $scope.interactiveChartData = [{ data: [], yaxis: 1, label: 'sin' }];
      $scope.interactiveChartOptions = {
      legend: {
        container: '#legend',
        show: true
      }
    };

    for (var i = 0; i < 14; i += 0.5) {
      $scope.interactiveChartData[0].data.push([i, Math.sin(i)]);
    }

  }

  $onInit () {}
}

export const ChartsFlotComponent = {
  templateUrl: './views/app/components/charts-flot/charts-flot.component.html',
  controller: ChartsFlotController,
  controllerAs: 'vm',
  bindings: {}
}
