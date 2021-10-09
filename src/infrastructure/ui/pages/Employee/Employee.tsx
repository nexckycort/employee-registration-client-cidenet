import { useEffect, useState } from 'react'

import { Alert, Button, Input } from 'infrastructure/ui/components/ui'
import { useAsync, useRouter } from 'infrastructure/ui/hooks'
import { STATUS } from 'infrastructure/ui/hooks/useAsync'
import useEmployee from './hook/useEmployee'
import useSelect from './hook/useSelect'

const Employee = (): JSX.Element => {
  const { params } = useRouter()
  const { id } = params

  const [title, setTitle] = useState('')

  const { employee, updateState, newEmployee, getEmployee, updateEmployee, alert } = useEmployee()

  const { Select: SelectCountry } = useSelect('Country', [
    {
      id: 1,
      name: 'Colombia'
    },
    {
      id: 2,
      name: 'Estados Unidos'
    }
  ])

  const { Select: SelectIDType } = useSelect('ID Type', [
    {
      id: 1,
      name: 'Cédula de Ciudadanía'
    }
  ])

  const { Select: SelectArea } = useSelect('Area', [
    {
      id: 3,
      name: 'Operación'
    },
    {
      id: 4,
      name: 'Infraestructura'
    },
    {
      id: 5,
      name: 'Compras'
    },
    {
      id: 2,
      name: 'Financiera'
    },
    {
      id: 1,
      name: 'Administración'
    },
    {
      id: 7,
      name: 'Servicios Varios'
    },
    {
      id: 8,
      name: 'Talento Humano'
    }
  ])

  const newOrUpdateEmployeeAsync = async () => {
    let message!: string
    if (id !== undefined) {
      message = 'employee updated successfully'
      await updateEmployee(id as number)
    } else {
      message = 'employee created successfully'
      await newEmployee()
    }
    alert(message)
  }

  const { execute, status, error } = useAsync(newOrUpdateEmployeeAsync, false)

  const handleOnSubmit = (event: React.SyntheticEvent<EventTarget>) => {
    event.preventDefault()
    execute()
  }

  useEffect(() => {
    if (id !== undefined) {
      setTitle('Update Employee')
      void getEmployee(id as number)
    } else {
      setTitle('Create Employee')
    }
  }, [])

  return (
    <form onSubmit={handleOnSubmit}>
      <h1>{title}</h1>
      {status === STATUS.ERROR && <Alert type="danger">{error.message}</Alert>}
      <div className="row">
        {/**/}
        <div className="col-3">
          <div className="mb-3">
            <label className="form-label">First Surname</label>
            <Input name="firstName" onChange={updateState} value={employee.firstName} type="text" className="form-control" placeholder="Nestor" />
          </div>
        </div>
        <div className="col-3">
          <div className="mb-3">
            <label className="form-label">Second Name</label>
            <Input name="secondName" onChange={updateState} value={employee.secondName ?? ''} type="text" className="form-control" placeholder="Junior" />
          </div>
        </div>
        <div className="col-3">
          <div className="mb-3">
            <label className="form-label">First Surname</label>
            <Input name="firstSurname" onChange={updateState} value={employee.firstSurname} type="text" className="form-control" placeholder="Cortina" />
          </div>
        </div>
        <div className="col-3">
          <div className="mb-3">
            <label className="form-label">Second Surname</label>
            <Input name="secondSurname" onChange={updateState} value={employee.secondSurname} type="text" className="form-control" placeholder="Rivera" />
          </div>
        </div>
        {/**/}
        <div className="col-3">
          <div className="mb-3">
            <SelectCountry name="country" value={employee.country} onChange={updateState} />
          </div>
        </div>
        <div className="col-3">
          <div className="mb-3">
            <SelectIDType name="IDType" value={employee.IDType} onChange={updateState} />
          </div>
        </div>
        <div className="col-3">
          <div className="mb-3">
            <label className="form-label">Identification Number</label>
            <Input name="identificationNumber" onChange={updateState} value={employee.identificationNumber} type="text" className="form-control" placeholder="2012484823" />
          </div>
        </div>
        <div className="col-3">
          <div className="mb-3">
            <SelectArea name="area" value={employee.area} onChange={updateState} />
          </div>
        </div>
        {/**/}

        <div className="col-3">
          <div className="mb-3">
            <label className="form-label">Entry Date</label>
            <Input name="entryDate" onChange={updateState} value={employee.entryDate} type="date" className="form-control" />
          </div>
        </div>
        {/**/}
      </div>
      <Button type="submit" disabled={status === STATUS.PENDING}>
        {title}
      </Button>
    </form>
  )
}

export default Employee
