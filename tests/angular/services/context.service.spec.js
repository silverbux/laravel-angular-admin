ngDescribe({
  name: 'Test ContextService',
  modules: 'app',
  inject: 'ContextService',
  tests: function (deps) {
    it('me is a function', () => {
      la(typeof deps.ContextService.me === 'function')
    })

    it('getContext is a function', () => {
      la(typeof deps.ContextService.getContext === 'function')
    })
  }
})
