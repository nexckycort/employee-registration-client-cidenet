import { EmployeeDTO, PaginatedEmployeesDTO } from 'infrastructure/dto/EmployeeDTO'
import { apiV1 } from 'infrastructure/config/api'
import { http } from 'infrastructure/lib'

export const employeeRepository = {
  searchPaginated: async (data: string) => {
    const result = await http.get<PaginatedEmployeesDTO>([apiV1.employees, data].join('?'))
    return result
  },
  create: async (employee: EmployeeDTO) => {
    const result = await http.post<EmployeeDTO>(apiV1.employees, {
      body: employee
    })
    return result
  },
  get: async (id: number) => {
    const result = await http.get<EmployeeDTO>([apiV1.employees, id].join('/'))
    return result
  },
  update: async (id: number, employee: EmployeeDTO) => {
    const result = await http.put<EmployeeDTO>([apiV1.employees, id].join('/'), {
      body: employee
    })
    return result
  },
  delete: async (id: number) => {
    const result = await http.delete<PaginatedEmployeesDTO>([apiV1.employees, id].join('/'))
    return result
  }
}
