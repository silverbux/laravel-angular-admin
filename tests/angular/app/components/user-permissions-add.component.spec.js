ngDescribe({
  name: 'Test user-permissions-add component',
  modules: 'app',
  element: '<user-permissions-add></user-permissions-add>',
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
