import React, { InputHTMLAttributes } from 'react'
import { Input } from '..'

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  className?: string
  size?: number
  label: string
  onInput?: (...args: any[]) => any
}

const InputFloatingLabel: React.FC<Props> = (props) => {
  const { className, value, size = 12, label, ...rest } = props

  return (
    <div className={`form-floating col-md-${size} mb-3`}>
      <Input className="form-control" value={value} {...rest} />
      <label>{label}</label>
    </div>
  )
}

export default InputFloatingLabel
