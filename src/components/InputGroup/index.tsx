import React, { ChangeEvent, InputHTMLAttributes } from 'react'

import './styles.scss'

interface Props extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  label: string
  id: string
  onChange?: (value: string) => void
  error?: string
}

const InputGroup: React.FC<Props> = ({ id, label, onChange, ...otherProps }: Props) => (
  <div className="input-group">
    <label htmlFor={ id }>{ label }</label>

    <input
      id={id}
      className={`${(otherProps.error && otherProps.error !== '') ? 'error' : ''}`}
      onChange={(e: ChangeEvent<HTMLInputElement>) => {
        if (onChange !== undefined) onChange(e.target.value)
      }}
      { ...otherProps }
    />

    { otherProps.error && (<p className='error-message'>{ otherProps.error }</p>) }
  </div>
)

export default InputGroup
