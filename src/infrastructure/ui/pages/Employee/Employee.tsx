import { useEffect, useState } from 'react'

import { useAsync, useRouter } from 'infrastructure/ui/hooks'
import { Alert, Button, Input } from 'infrastructure/ui/components/ui'
import { STATUS } from 'infrastructure/ui/hooks/useAsync'
import useEmployee from './hook/useEmployee'

const Employee = (): JSX.Element => {
  const { params } = useRouter()
  const { id } = params

  const [title, setTitle] = useState('')

  const { employee, updateState, newEmployee, getEmployee, updateEmployee, alert } = useEmployee()

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
            <label className="form-label">Country</label>
            <Input name="country" onChange={updateState} value={employee.country} type="text" className="form-control" placeholder="Nestor" />
          </div>
        </div>
        <div className="col-3">
          <div className="mb-3">
            <label className="form-label">ID Type</label>
            <Input name="IDType" onChange={updateState} value={employee.IDType} type="text" className="form-control" placeholder="Junior" />
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
            <label className="form-label">Area</label>
            <Input name="area" onChange={updateState} value={employee.area} type="text" className="form-control" placeholder="Infraestructura" />
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
