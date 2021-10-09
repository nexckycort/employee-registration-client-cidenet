import { AreaDTO } from 'infrastructure/dto/ShareDTO'
import { apiV1 } from 'infrastructure/config/api'
import { http } from 'infrastructure/lib'

export const areaRepository = {
  getAll: async () => {
    const result = await http.get<AreaDTO[]>(apiV1.areas)
    return result
  }
}
