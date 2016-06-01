ngDescribe({
  name: 'Test reset-password component',
  modules: 'app',
  inject: '$http',
  element: '<reset-password></reset-password>',
  http: {
    get: {
      '/api/auth/password/verify': {
        data: true
      }
    },
    post: {
      '/api/auth/password/reset': {
        data: true
      }
    }
  },
  tests: function (deps) {
    it('Should have password and password confirmation', () => {
      var inputs = deps.element.find('input')
      expect(inputs.length).toBe(2)

      var password = deps.element.find('input')[0]
      expect(password.attributes['type'].value).toBe('password')

      var password_confirmation = deps.element.find('input')[1]
      expect(password_confirmation.attributes['type'].value).toBe('password')
    })

    it('should submit password reset successfully', () => {
      var component = deps.element.isolateScope().vm

      component.submit()

      deps.http.flush()
    })
  }
})
