export function AclConfig(AclServiceProvider){
    'ngInject';

    var myConfig = {
        storage: 'localStorage',
        storageKey: 'AppAcl'
    };

    AclServiceProvider.config(myConfig);
}
