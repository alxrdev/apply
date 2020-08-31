import React from 'react'

import './styles.scss'

interface Props {
  type: 'primary' | 'dark'
  isBlock?: boolean
  content: string
}

const Button: React.FC<Props> = ({ type, isBlock, content }) => (
  <button className={`button button-${type} ${isBlock ? 'button-block' : ''}`}>{ content }</button>
)

export default Button
