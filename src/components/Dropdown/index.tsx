import React, { useState, useEffect, useRef } from 'react'
import { FiArrowDown } from 'react-icons/fi'

import './styles.scss'

interface DropdownSection {
  id: number
  borderTop?: boolean
  borderBottom?: boolean
  options: Array<DropdowOption>
}

interface DropdowOption {
  text: string
  value: string
  callback?: (value: string) => void
  icon?: React.ReactElement
}

interface Props {
  label: string
  sections: Array<DropdownSection>
  callback?: (value: string) => void
}

const Dropdown: React.FC<Props> = ({ label, sections, callback }) => {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    document.addEventListener('click', closeAllDropdowns, false)
    return () => document.removeEventListener('click', closeAllDropdowns, false)
  })

  const toggleDropdown = () => {
    setIsOpen(!isOpen)
  }

  function closeAllDropdowns (event: MouseEvent) {
    const elements = Array.prototype.map.call(dropdownRef.current?.children, (element) => element)

    const isThis = elements.includes(event.target)

    if (!isThis && isOpen) {
      setIsOpen(false)
    }
  }

  return (
    <div className="dropdown" ref={dropdownRef}>
      <button
        className="dropdown-button"
        onClick={toggleDropdown}
      >
        <span>{ label }</span>
        <FiArrowDown size={15} />
      </button>
      <div className={`dropdown-content ${isOpen ? 'dropdown-content-show' : ''}`}>
        { sections.map(section => (
          <div
            key={section.id}
            className={`dropdown-section ${section.borderTop ? 'top' : ''} ${section.borderBottom ? 'bottom' : ''}`}
          >
            <ul className="dropdown-section-content">
              { section.options.map(option => (
                <li
                  key={option.value}
                  className="dropdown-option"
                  onClick={() => {
                    if (option.callback !== undefined) {
                      option.callback(option.value)
                    }

                    if (callback !== undefined) {
                      callback(option.value)
                    }
                  }}
                >
                  { option.icon }
                  <span>{ option.text }</span>
                </li>
              )) }
            </ul>
          </div>
        )) }
      </div>
    </div>
  )
}

export default Dropdown
