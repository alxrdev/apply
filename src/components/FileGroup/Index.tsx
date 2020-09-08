import React, { ChangeEvent, useState } from 'react'

import './styles.scss'

interface Props {
  id: string
  label: string
  onChange?: (value: File) => void
  required?: boolean
  error?: string
}

const FileGroup: React.FC<Props> = ({ id, label, onChange, error, ...otherProps }) => {
  const [fileName, setFileName] = useState('')

  return (
    <div className="file-group">
      <input
        type="file"
        id={id}
        name={id}
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

      { error && (<p className='error-message'>{ error }</p>) }
    </div>
  )
}

export default FileGroup
