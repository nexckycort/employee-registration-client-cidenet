import { areaRepository } from 'infrastructure/repositories/areaRepository'

export const areaService = {
  getAll: async () => {
    const result = await areaRepository.getAll()
    return result
  }
}
