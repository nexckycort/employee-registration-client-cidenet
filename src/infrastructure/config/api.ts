import { apiUrlV1 } from './environment'

export const apiV1 = {
  login: [apiUrlV1, 'login'].join('/'),
  validateToken: [apiUrlV1, 'validate-token'].join('/'),
  employees: [apiUrlV1, 'employees'].join('/'),
  countrys: [apiUrlV1, 'countrys'].join('/'),
  idTypes: [apiUrlV1, 'id-types'].join('/'),
  areas: [apiUrlV1, 'areas'].join('/')
}
