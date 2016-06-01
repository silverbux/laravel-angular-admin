ngDescribe({
  name: 'Test user-roles-edit component',
  modules: 'app',
  element: '<user-roles-edit></user-roles-edit>',
  http: {
    get: {
      '/api/users/permissions': {
        data: true
      },
      '/api/users/roles-show': {
        data: true
      }
    }
  },
  tests: function (deps) {
    it('Should have role, slug and description', () => {
      var inputs = deps.element.find('input')
      expect(inputs.length).toBe(2)

      var role = deps.element.find('input')[0]
      expect(role.attributes['type'].value).toBe('text')

      var slug = deps.element.find('input')[1]
      expect(slug.attributes['type'].value).toBe('text')

      var textarea = deps.element.find('textarea')
      expect(textarea.length).toBe(1)
    })
  }
})
