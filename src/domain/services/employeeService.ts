import { encodeQueryData } from 'infrastructure/helpers/encodeQueryData'
import { employeeRepository } from 'infrastructure/repositories/employeeRepository'

interface SearchPaginatedEmployees {
  page: number
  limit: number
}

export const employeeService = {
  searchPaginated: async (data: SearchPaginatedEmployees) => {
    const params = encodeQueryData(data)
    const result = await employeeRepository.searchPaginated(params)
    return result
  },
  delete: async (id: number) => {
    const result = await employeeRepository.delete(id)
    return result
  }
}
