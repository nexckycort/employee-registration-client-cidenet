import { countryRepository } from 'infrastructure/repositories/countryRepository'

export const countryService = {
  getAll: async () => {
    const result = await countryRepository.getAll()
    return result
  }
}
