export interface PaginatedEmployeesDTO {
  page: number
  totalPages: number
  totalItems: number
  items: Employee[]
}

export interface Employee {
  id: number
  name: string
  country: string
  IDType: string
  identificationNumber: string
  email: string
  entryDate: string
  area: string
  state: string
  registrationDate: string
  updateDate: string
}

export interface EmployeeDTO {
  id: number
  firstSurname: string
  secondSurname: string
  firstName: string
  secondName?: any
  country: number
  IDType: number
  identificationNumber: string
  area: number
  entryDate: string
  email: string
  state: string
  registrationDate: string
  updateDate: string
}
