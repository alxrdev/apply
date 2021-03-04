import { useState, useEffect, useRef, ReactElement } from 'react'
import { FiArrowDown } from 'react-icons/fi'

import styles from '../styles/components/Dropdown.module.scss'

interface DropdownOption {
  text: string
  value: string
  callback?: (value: string) => void
  icon?: ReactElement
}

interface DropdownSection {
  id: number
  borderTop?: boolean
  borderBottom?: boolean
  options: Array<DropdownOption>
}

interface DropdownProps {
  label: string
  sections: Array<DropdownSection>
  callback?: (value: string) => void
}

function Dropdown ({ label, sections, callback }: DropdownProps) {
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
    <div className={styles.dropdown} ref={dropdownRef}>
      <button
        className={styles.dropdownButton}
        onClick={toggleDropdown}
      >
        <span>{ label }</span>
        <FiArrowDown size={15} />
      </button>
      <div className={`${styles.dropdownContent} ${isOpen ? styles.dropdownContentShow : ''}`}>
        { sections.map(section => (
          <div
            key={section.id}
            className={`${styles.dropdownSection} ${section.borderTop ? styles.top : ''} ${section.borderBottom ? styles.bottom : ''}`}
          >
            <ul className={styles.dropdownSectionContent}>
              { section.options.map(option => (
                <li
                  key={option.value}
                  className={styles.option}
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
