import { CountryDTO } from 'infrastructure/dto/ShareDTO'
import { apiV1 } from 'infrastructure/config/api'
import { http } from 'infrastructure/lib'

export const countryRepository = {
  getAll: async () => {
    const result = await http.get<CountryDTO[]>(apiV1.countrys)
    return result
  }
}
