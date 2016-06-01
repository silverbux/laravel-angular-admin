ngDescribe({
  name: 'Test user-lists component',
  modules: 'app',
  element: '<user-lists></user-lists>',
  http: {
    get: {
      '/api/users': {
        data: true
      }
    }
  },
  tests: function (deps) {
    it('delete is a function', () => {
      var component = deps.element.isolateScope().vm
      la(typeof component.delete === 'function')
    })
  }
})
