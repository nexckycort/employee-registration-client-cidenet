import React, { SelectHTMLAttributes } from 'react'

import { AreaDTO } from 'infrastructure/dto/ShareDTO'

interface Props extends SelectHTMLAttributes<HTMLSelectElement> {
  onChange?: (...args: any[]) => any
}

const useSelect = (label: string, options: AreaDTO[]) => {
  const Select: React.FC<Props> = ({ onChange, defaultValue = '', ...rest }) => {
    return (
      <div className="mb-3">
        <label className="form-label">{label}</label>

        <select defaultValue={defaultValue} {...rest} onChange={onChange} required className="form-select" aria-label="Default select example">
          <option value="">Open this select menu</option>
          {options.map((option) => (
            <option key={option.id} value={option.id}>
              {option.name}
            </option>
          ))}
        </select>
      </div>
    )
  }

  return {
    Select
  }
}

export default useSelect
