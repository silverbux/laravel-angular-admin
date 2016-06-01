ngDescribe({
  name: 'Test user-permissions component',
  modules: 'app',
  element: '<user-permissions></user-permissions>',
  http: {
    get: {
      '/api/users/permissions': {
        data: true
      }
    }
  },
  tests: function (deps) {
    it('basic test', () => {
      //
    })
  }
})
