import { idTypesRepository } from 'infrastructure/repositories/idTypesRepository'

export const idTypesService = {
  getAll: async () => {
    const result = await idTypesRepository.getAll()
    return result
  }
}
