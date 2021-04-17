import { Button } from '@chakra-ui/button'
import { Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/menu'
import { useState } from 'react'
import { FiChevronDown } from 'react-icons/fi'

interface Options {
  value: string
  text: string
}

interface DropdownProps {
  text: string
  options: Options[],
  onClick: (value: string) => void
  margin?: string | object
}

export default function Dropdown ({ text, options, onClick, ...otherProps }: DropdownProps) {
  const [selected, setSelected] = useState(text)

  return (
    <Menu>
      <MenuButton
        as={Button}
        fontSize="sm"
        backgroundColor="brand.600"
        color="brand.200"
        rightIcon={<FiChevronDown size={15} />}
        {...otherProps}
      >
        { selected }
      </MenuButton>
      <MenuList>
        { options.map(option => (
          <MenuItem
            key={option.value}
            fontSize="sm"
            onClick={() => {
              onClick(option.value)
              setSelected(option.text)
            }}
          >
            { option.text }
          </MenuItem>
        )) }
      </MenuList>
    </Menu>
  )
}
