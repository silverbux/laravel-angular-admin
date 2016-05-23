import { RouteBodyClassComponent } from './app/components/route-bodyclass/route-bodyclass.component'
import { PasswordVerifyClassComponent } from './app/components/password-verify/password-verify.component'

angular.module('app.components')
  .directive('routeBodyclass', RouteBodyClassComponent)
  .directive('passwordVerify', PasswordVerifyClassComponent)
