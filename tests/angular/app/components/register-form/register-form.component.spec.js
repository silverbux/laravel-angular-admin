ngDescribe({
  name: 'Test register-form component',
  modules: 'app',
  element: '<register-form></register-form>',
  tests: function (deps) {
    it('Should have name, email, password and password confirmation', () => {
      var inputs = deps.element.find('input')
      expect(inputs.length).toBe(4)
      var name = deps.element.find('input')[0]
      expect(name.attributes['type'].value).toBe('text')
      var email = deps.element.find('input')[1]
      expect(email.attributes['type'].value).toBe('email')
      var password = deps.element.find('input')[2]
      expect(password.attributes['type'].value).toBe('password')
      var password_confirmation = deps.element.find('input')[3]
      expect(password_confirmation.attributes['type'].value).toBe('password')
    })
  }
})
