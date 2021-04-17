import { FormControl, FormErrorMessage, FormLabel } from '@chakra-ui/form-control'
import { Select, SelectProps } from '@chakra-ui/select'
import { ChangeEvent } from 'react'

interface SelectGroupOptions {
  value: string
  text: string
}

interface SelectGroupProps extends Omit<SelectProps, 'onChange'> {
  label: string
  id: string
  options: SelectGroupOptions[]
  groupMarginBottom?: string
  onChange?: (value: string) => void
  error?: string
}

export default function SelectGroup ({ id, label, options, error, onChange, groupMarginBottom = '10px', ...otherProps }: SelectGroupProps) {
  const isInvalid = !!((error && error !== ''))

  return (
    <FormControl isInvalid={isInvalid} id={id} marginBottom={groupMarginBottom}>
      <FormLabel color="brand.200" fontWeight="700">{label}</FormLabel>
      <Select
        borderColor="brand.500"
        _hover={{ borderColor: 'brand.100' }}
        _focus={{ borderColor: 'brand.100' }}
        onChange={(event: ChangeEvent<HTMLSelectElement>) => {
          if (onChange !== undefined) onChange(event.target.value)
        }}
        { ...otherProps }
      >
        { options.map(option => (
          <option key={option.value} value={option.value}>{option.text}</option>
        )) }
      </Select>
      <FormErrorMessage>{error}</FormErrorMessage>
    </FormControl>
  )
}
