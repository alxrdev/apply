import React from 'react'

import './styles.scss'

interface Props {
  id: string
  name: string
  label: string
  value: string
  options: Array<SelectOptions>
}

interface SelectOptions {
  value: string
  text: string
}

const SelectGroup: React.FC<Props> = ({ id, label, options, ...props }: Props) => (
  <div className="select-group">
    <label htmlFor={id}>{ label }</label>
    <select id={id} {...props}>
      { options.map((option: SelectOptions) => (
        <option key={option.value} value={option.value}>{ option.text }</option>
      )) }
    </select>
  </div>
)

export default SelectGroup
