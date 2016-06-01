ngDescribe({
  name: 'Test user-roles-add component',
  modules: 'app',
  element: '<user-roles-add></user-roles-add>',
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
