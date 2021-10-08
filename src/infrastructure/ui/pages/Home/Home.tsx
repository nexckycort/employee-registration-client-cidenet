/* eslint-disable multiline-ternary */
import React, { useEffect, useState } from 'react'

import { employeeService } from 'domain/services/employeeService'
import { useAsync } from 'infrastructure/ui/hooks'
import { Alert, Button, Loader } from 'infrastructure/ui/components/ui'
import { STATUS } from 'infrastructure/ui/hooks/useAsync'
import { PaginatedEmployeesDTO, Employee } from 'infrastructure/dto/EmployeeDTO'
import EmployeeTable from './components/EmployeeTable'
import usePagination from './hook/usePagination'
import Pagination from './components/Pagination'

const Home: React.FC = () => {
  const usePaginationHook = usePagination()
  const { actualPage, setTotalPages } = usePaginationHook

  const [employees, setEmployees] = useState<Employee[]>([])

  const searchPaginatedEmployees = async () => {
    const totalEmployeesByPage = 10
    const { error, response } = await employeeService.searchPaginated({
      page: actualPage,
      limit: totalEmployeesByPage
    })
    if (error) {
      throw new Error(response.message)
    }
    setTotalPages(response.data.totalPages)
    setEmployees(response.data.items)
    return response.data
  }

  const { execute, status, error } = useAsync<PaginatedEmployeesDTO>(searchPaginatedEmployees, false)

  useEffect(() => {
    execute()
  }, [actualPage])

  const handleRemoveEmployee = async (id: number) => {
    await employeeService.delete(id)
    return execute
  }

  if (status === STATUS.IDLE || status === STATUS.PENDING) return <Loader />

  return (
    <div>
      <h1>
        Employee Registration <Button color="success">Create Employee</Button>
      </h1>
      {status === STATUS.ERROR && <Alert type="danger">{error.message}</Alert>}
      {employees.length > 0 ? (
        <>
          <EmployeeTable employees={employees} handleRemoveEmployee={handleRemoveEmployee} />
          <Pagination usePagination={usePaginationHook} />
        </>
      ) : (
        <h3 className="center-full">not registered employees</h3>
      )}
    </div>
  )
}

export default Home
