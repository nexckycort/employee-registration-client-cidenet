import { apiV1 } from 'infrastructure/config/api'
import { PaginatedEmployeesDTO } from 'infrastructure/dto/EmployeeDTO'
import { http } from 'infrastructure/lib'

export const employeeRepository = {
  searchPaginated: async (data: string) => {
    const result = await http.get<PaginatedEmployeesDTO>([apiV1.employees, data].join('?'))
    return result
  },
  delete: async (id: number) => {
    const result = await http.delete<PaginatedEmployeesDTO>([apiV1.employees, id].join('/'))
    return result
  }
}
