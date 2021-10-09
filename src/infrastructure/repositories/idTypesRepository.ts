import { IDTypesDTO } from 'infrastructure/dto/ShareDTO'
import { apiV1 } from 'infrastructure/config/api'
import { http } from 'infrastructure/lib'

export const idTypesRepository = {
  getAll: async () => {
    const result = await http.get<IDTypesDTO[]>(apiV1.idTypes)
    return result
  }
}
