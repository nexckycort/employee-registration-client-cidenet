import { employeeRepository } from 'infrastructure/repositories/employeeRepository'
import { encodeQueryData } from 'infrastructure/helpers/encodeQueryData'
import { EmployeeDTO } from 'infrastructure/dto/EmployeeDTO'

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
  create: async (employee: EmployeeDTO) => {
    const result = await employeeRepository.create(employee)
    return result
  },
  get: async (id: number) => {
    const result = await employeeRepository.get(id)
    const entryDate = result.response.data.entryDate
    result.response.data.entryDate = new Date(entryDate).toISOString().slice(0, 10)
    Reflect.deleteProperty(result.response.data, 'id')
    Reflect.deleteProperty(result.response.data, 'email')
    Reflect.deleteProperty(result.response.data, 'state')
    Reflect.deleteProperty(result.response.data, 'registrationDate')
    Reflect.deleteProperty(result.response.data, 'updateDate')
    return result
  },
  update: async (id: number, employee: EmployeeDTO) => {
    const result = await employeeRepository.update(id, employee)
    return result
  },
  delete: async (id: number) => {
    const result = await employeeRepository.delete(id)
    return result
  }
}
