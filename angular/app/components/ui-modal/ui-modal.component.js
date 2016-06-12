class UiModalController {
  constructor ($scope, $uibModal, $log, API) {
    'ngInject'

    this.API = API
    this.$uibModal = $uibModal
    this.$log = $log
    this.$scope = $scope
    this.items = ['item1', 'item2', 'item3']
    this.animationsEnabled = true
  }

  modalOpen (size) {
    let $uibModal = this.$uibModal
    let $scope = this.$scope
    let $log = this.$log
    let items = this.items

    var modalInstance = $uibModal.open({
      animation: this.animationsEnabled,
      templateUrl: 'myModalContent.html',
      controller: this.modalcontroller,
      controllerAs: 'mvm',
      size: size,
      resolve: {
        items: () => {
          return items
        }
      }
    })

    modalInstance.result.then((selectedItem) => {
      $scope.selected = selectedItem
    }, () => {
      $log.info('Modal dismissed at: ' + new Date())
    })
  }

  modalcontroller ($scope, $uibModalInstance, items) {
    'ngInject'

    this.items = items

    $scope.selected = {
      item: items[0]
    }

    this.ok = () => {
      $uibModalInstance.close($scope.selected.item)
    }

    this.cancel = () => {
      $uibModalInstance.dismiss('cancel')
    }
  }

  toggleModalAnimation () {
    this.animationsEnabled = !this.animationsEnabled
  }

  swalConfirm () {
    swal({
      title: 'Are you sure?',
      text: 'You will not be able to recover this imaginary file!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#DD6B55',
      confirmButtonText: 'Yes, delete it!',
      closeOnConfirm: false
    }, () => {
      swal('Deleted!', 'Your imaginary file has been deleted.', 'success')
    })
  }

  swalBasic () {
    swal("Here's a message!", "It's pretty, isn't it?")
  }

  swalSuccess () {
    swal('Good job!', 'You clicked the button!', 'success')
  }

  swalDecide () {
    swal({
      title: 'Are you sure?',
      text: 'You will not be able to recover this imaginary file!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#DD6B55',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel plx!',
      closeOnConfirm: false,
      closeOnCancel: false
    }, (isConfirm) => {
      if (isConfirm) {
        swal('Deleted!', 'Your imaginary file has been deleted.', 'success')
      } else {
        swal('Cancelled', 'Your imaginary file is safe :)', 'error')
      }
    })
  }

  swalImage () {
    swal({
      title: 'Sweet!',
      text: "Here's a custom image.",
      imageUrl: '/img/avatar5.png'
    })
  }

  swalHtmlMessage () {
    swal({
      title: 'HTML <small>Title</small>!',
      text: 'A custom <span style="color:#F8BB86">html<span> message.',
      html: true
    })
  }

  swalAutoClose () {
    swal({
      title: 'Auto close alert!',
      text: 'I will close in 2 seconds.',
      timer: 2000,
      showConfirmButton: false
    })
  }

  swalPrompt () {
    swal({
      title: 'An input!',
      text: 'Write something interesting:',
      type: 'input',
      showCancelButton: true,
      closeOnConfirm: false,
      animation: 'slide-from-top',
      inputPlaceholder: 'Write something'
    }, (inputValue) => {
      if (inputValue === false)
        return false
      if (inputValue === '') {
        swal.showInputError('You need to write something!')
        return false
      }
      swal('Nice!', 'You wrote: ' + inputValue, 'success')
    })
  }

  swalAjax () {
    let API = this.API

    swal({
      title: 'Ajax request example',
      text: 'Submit to run ajax request',
      type: 'info',
      showCancelButton: true,
      closeOnConfirm: false,
      showLoaderOnConfirm: true
    }, () => {
      let UserData = API.service('me', API.all('users'))

      UserData.one().get()
        .then((response) => {
          let userdata = response.plain()
          swal('Your Name is: ' + userdata.data.name)
        })
    })
  }
}

export const UiModalComponent = {
  templateUrl: './views/app/components/ui-modal/ui-modal.component.html',
  controller: UiModalController,
  controllerAs: 'vm',
  bindings: {}
}
