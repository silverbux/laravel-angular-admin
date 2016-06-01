ngDescribe({
  name: 'Test user-roles component',
  modules: 'app',
  element: '<user-roles></user-roles>',
  http: {
    get: {
      '/api/users/roles': {
        data: true
      }
    }
  },
  tests: function (deps) {
    it('basic test2', () => {
      //
    })
  }
})
