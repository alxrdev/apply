import React, { ButtonHTMLAttributes } from 'react'

import './styles.scss'

interface Props extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'type' | 'className'> {
  type: 'primary' | 'dark'
  className?: string
  isBlock?: boolean
  content: string
}

const Button: React.FC<Props> = ({ type, isBlock, content, className, ...otherProps }: Props) => (
  <button
    className={`button button-${type} ${isBlock ? 'button-block' : ''} ${className}`}
    { ...otherProps }
  >
    { content }
  </button>
)

export default Button
