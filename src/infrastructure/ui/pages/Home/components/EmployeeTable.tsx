/* eslint-disable @typescript-eslint/no-floating-promises */
import React from 'react'
import Swal from 'sweetalert2'

import { Edit, Trash } from 'infrastructure/ui/components/ui/icons'
import { Button } from 'infrastructure/ui/components/ui'
import { Employee } from 'infrastructure/dto/EmployeeDTO'
import { useRouter } from 'infrastructure/ui/hooks'

interface Props {
  employees: Employee[]
  handleRemoveEmployee: (id: number) => Promise<() => any>
}

const EmployeeTable: React.FC<Props> = ({ employees, handleRemoveEmployee }) => {
  const router = useRouter()

  const removeEmployee = (id: number) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        const reload = await handleRemoveEmployee(id)
        Swal.fire('Deleted!', 'Your employee has been removed.', 'success').then(() => {
          reload()
        })
      }
    })
  }

  return (
    <div className="table-responsive">
      <table className="table align-middle">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">ID type</th>
            <th scope="col">Identification number</th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Country</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {employees.map(({ id, IDType, identificationNumber, name, email, country }, index) => (
            <tr className="align-bottom" key={email}>
              <th>{index + 1}</th>
              <td>{IDType}</td>
              <td>{identificationNumber}</td>
              <td>{name}</td>
              <td>{email}</td>
              <td>{country}</td>
              <td>
                <Button
                  onClick={() => {
                    router.push(`/employee/${id}`)
                  }}
                >
                  <Edit width={20} height={20} />
                </Button>
                <Button
                  color="danger"
                  onClick={() => {
                    removeEmployee(id)
                  }}
                >
                  <Trash width={20} height={20} />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default EmployeeTable
