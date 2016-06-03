import { ContextService } from './services/context.service'
import { APIService } from './services/API.service'

angular.module('app.services')
  .service('ContextService', ContextService)
  .service('API', APIService)
