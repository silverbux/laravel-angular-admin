export class ContextService{
    constructor($auth, API){
        'ngInject';
        this.$auth = $auth
        this.API = API
    }

    me() {
      let $auth = this.$auth

      if ($auth.isAuthenticated()) {
        let API = this.API
        let UserData = API.service('me', API.all('users'))

        return UserData.one().get()
      } else {
        return null
      }
    }
}

