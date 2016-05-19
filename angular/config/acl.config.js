export function AclConfig (AclServiceProvider) {
  'ngInject'

  var myConfig = {
    storage: 'localStorage',
    storageKey: 'AppAcl'
  }

  /*eslint-disable */
  AclServiceProvider.config(myConfig)
/*eslint-enable */
}
