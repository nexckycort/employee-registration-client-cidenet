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
