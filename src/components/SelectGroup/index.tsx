import React, { SelectHTMLAttributes, ChangeEvent } from 'react'

import './styles.scss'

interface Props extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'onChange'> {
  label: string
  options: Array<SelectOptions>
  onChange?: (value: string) => void
  error?: string
}

interface SelectOptions {
  value: string
  text: string
}

const SelectGroup: React.FC<Props> = ({ id, label, options, onChange, ...otherProps }: Props) => (
  <div className="select-group">
    <label htmlFor={id}>{ label }</label>
    <select
      id={id}
      onChange={(event: ChangeEvent<HTMLSelectElement>) => {
        if (onChange !== undefined) onChange(event.target.value)
      }}
      {...otherProps}
    >
      { options.map((option: SelectOptions) => (
        <option key={option.value} value={option.value}>{ option.text }</option>
      )) }
    </select>

    { otherProps.error && (<p className='error-message'>{ otherProps.error }</p>) }
  </div>
)

export default SelectGroup
