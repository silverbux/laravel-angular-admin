class UiModalController {
  constructor ($scope, $uibModal, $log) {
    'ngInject'

    $scope.items = ['item1', 'item2', 'item3']
    $scope.animationsEnabled = true
    $scope.open = function (size) {
      var modalInstance = $uibModal.open({
        animation: $scope.animationsEnabled,
        templateUrl: 'myModalContent.html',
        controller: function ($scope, $uibModalInstance, items) {
          $scope.items = items
          $scope.selected = {
            item: $scope.items[0]
          }
          $scope.items = ['item1', 'item2', 'item3']
          $scope.ok = function () {
            $uibModalInstance.close($scope.selected.item)
          }

          $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel')
          }
        },
        size: size,
        resolve: {
          items: function () {
            return $scope.items
          }
        }
      })

      modalInstance.result.then(function (selectedItem) {
        $scope.selected = selectedItem
      }, function () {
        $log.info('Modal dismissed at: ' + new Date())
      })
    }

    $scope.toggleAnimation = function () {
      $scope.animationsEnabled = !$scope.animationsEnabled
    }
  }

  $onInit () {}
}

export const UiModalComponent = {
  templateUrl: './views/app/components/ui-modal/ui-modal.component.html',
  controller: UiModalController,
  controllerAs: 'vm',
  bindings: {}
}
