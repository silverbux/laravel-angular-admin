export function DateMillisFilter () {
  'ngInject'

  return function (input) {
    return Date.parse(input)
  }
}
