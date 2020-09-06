import React, { ChangeEvent, useState } from 'react'

import './styles.scss'

interface Props {
  id: string
  label: string
  onChange?: (value: File) => void
  required?: boolean
}

const FileGroup: React.FC<Props> = ({ id, label, onChange, ...otherProps }) => {
  const [fileName, setFileName] = useState('')

  return (
    <div className="file-group">
      <input
        type="file" id={id}
        onChange={(event: ChangeEvent<HTMLInputElement>) => {
          if (event.target.files && event.target.files.length > 0) {
            setFileName(event.target.files[0].name)
            if (onChange !== undefined) {
              onChange(event.target.files[0])
            }
          }
        }}
        { ...otherProps }
      />
      <label htmlFor={id}>{ label }</label>
      { fileName !== '' && (
        <span className="file-name">{ fileName }</span>
      ) }
    </div>
  )
}

export default FileGroup
