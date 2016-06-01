ngDescribe({
  name: 'Test user-edit component',
  modules: 'app',
  element: '<user-edit></user-edit>',
  http: {
    get: {
      '/api/users/roles': {
        data: true
      },
      '/api/users/show': {
        data: true
      }
    }
  },
  tests: function (deps) {
    it('Should have name, email', () => {
      var inputs = deps.element.find('input')
      expect(inputs.length).toBe(2)

      var name = deps.element.find('input')[0]
      expect(name.attributes['type'].value).toBe('text')

      var email = deps.element.find('input')[1]
      expect(email.attributes['type'].value).toBe('email')
    })
  }
})
