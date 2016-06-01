ngDescribe({
  name: 'Test user-permissions-edit component',
  modules: 'app',
  element: '<user-permissions-edit></user-permissions-edit>',
  http: {
    get: {
      '/api/users/permissions-show': {
        data: true
      }
    }
  },
  tests: function (deps) {
    it('Should have name, slug and description', () => {
      var inputs = deps.element.find('input')
      expect(inputs.length).toBe(2)

      var name = deps.element.find('input')[0]
      expect(name.attributes['type'].value).toBe('text')

      var textarea = deps.element.find('textarea')
      expect(textarea.length).toBe(1)
    })
  }
})
