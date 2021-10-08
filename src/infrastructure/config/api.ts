import { apiUrlV1 } from './environment'

export const apiV1 = {
  login: [apiUrlV1, 'login'].join('/'),
  employees: [apiUrlV1, 'employees'].join('/')
}
