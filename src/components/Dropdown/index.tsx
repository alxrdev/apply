import React from 'react'

import './styles.scss'

interface DropdowOption {
  text: string
  value: string
}

interface Props {
  label: string
  options: Array<DropdowOption>
}

interface State {
  isOpen: boolean
}

class Dropdown extends React.Component<Props, State> {
  private refContainer: React.RefObject<HTMLDivElement> | null

  constructor (props: Props) {
    super(props)

    this.state = {
      isOpen: false
    }

    this.refContainer = React.createRef<HTMLDivElement>()
  }

  toggleDropdown = () => {
    this.setState({ isOpen: !this.state.isOpen })
  }

  closeAllDropdowns = (event: MouseEvent) => {
    const elements = Array.prototype.map.call(this.refContainer?.current?.children, (element) => element)

    const isThis = elements.includes(event.target)

    if (!isThis && this.state.isOpen) {
      this.setState({ isOpen: false })
    }
  }

  componentDidMount () {
    document.addEventListener('click', this.closeAllDropdowns, false)
  }

  componentWillUnmount () {
    document.removeEventListener('click', this.closeAllDropdowns, false)
  }

  render () {
    const { label, options } = this.props

    return (
      <div className="dropdown" ref={this.refContainer}>
        <button
          className="dropdown-button"
          onClick={this.toggleDropdown}
        >
          { label }
        </button>
        <ul className={`dropdown-content ${this.state.isOpen ? 'dropdown-content-show' : ''}`}>
          { options.map(option => (
            <li key={option.value} className="dropdown-option">{ option.text }</li>
          )) }
        </ul>
      </div>
    )
  }
}

export default Dropdown
