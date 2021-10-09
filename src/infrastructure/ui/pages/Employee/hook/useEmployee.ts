import { useState } from 'react'
import Swal from 'sweetalert2'

import { employeeService } from 'domain/services/employeeService'
import { EmployeeDTO } from 'infrastructure/dto/EmployeeDTO'
import { useRouter } from 'infrastructure/ui/hooks'

const useEmployee = () => {
  const router = useRouter()

  const [employee, setEmployee] = useState<EmployeeDTO>({
    firstSurname: '',
    secondSurname: '',
    firstName: '',
    secondName: null,
    country: 0,
    IDType: 0,
    identificationNumber: '',
    area: 0,
    entryDate: ''
  } as unknown as EmployeeDTO)

  const updateState = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmployee({
      ...employee,
      [e.target.name]: e.target.value
    })
  }

  const newEmployee = async () => {
    const { error, response } = await employeeService.create(employee)
    if (error) throw new Error(response.message)
    setEmployee(response.data)
  }

  const getEmployee = async (id: number) => {
    const { error, response } = await employeeService.get(id)
    if (error) return alert('Could not get that employee', 'error')
    setEmployee(response.data)
  }

  const updateEmployee = async (id: number) => {
    const { error, response } = await employeeService.update(id, employee)
    if (error) throw new Error(response.message)
  }

  const alert = (title: string, type: 'success' | 'error' | 'warning' | 'info' | 'question' = 'success') => {
    void Swal.fire({
      position: 'top-end',
      icon: type,
      title: title,
      showConfirmButton: false,
      timer: 2000
    }).then(() => {
      router.push('/')
    })
  }

  return {
    employee,
    updateState,
    newEmployee,
    getEmployee,
    updateEmployee,
    alert
  }
}

export default useEmployee
