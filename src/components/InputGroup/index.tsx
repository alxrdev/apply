import React, { ChangeEventHandler } from 'react'

import './styles.scss'

interface Props {
  type: string
  name: string
  label: string
  id: string
  placeholder?: string
  value: any
  onChange?: ChangeEventHandler
  required?: boolean
  error?: string
}

const InputGroup: React.FC<Props> = ({ id, label, ...otherProps }: Props) => (
  <div className="input-group">
    <label htmlFor={ id }>{ label }</label>

    <input
      id={id}
      className={`${(otherProps.error && otherProps.error !== '') ? 'error' : ''}`}
      { ...otherProps }
    />

    { otherProps.error && (<p className='error-message'>{ otherProps.error }</p>) }
  </div>
)

export default InputGroup
