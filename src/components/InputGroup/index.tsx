import React from 'react'

import './styles.scss'

interface Props {
  type: string
  name: string
  label: string
  id: string
  placeholder?: string
  value: any
  required?: boolean
}

const InputGroup: React.FC<Props> = ({ id, label, ...otherProps }) => (
  <div className="input-group">
    <label htmlFor={ id }>{ label }</label>
    <input id={id} { ...otherProps } />
  </div>
)

export default InputGroup
