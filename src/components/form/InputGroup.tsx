import { FormControl, FormErrorMessage, FormLabel, Input, InputProps } from '@chakra-ui/react'
import { ChangeEvent } from 'react'

interface InputGroupProps extends Omit<InputProps, 'onChange'> {
  label: string
  id: string
  groupMarginBottom?: string
  onChange?: (value: string) => void
  error?: string
}

export default function InputGroup ({ id, label, error, onChange, groupMarginBottom = '10px', ...otherProps }: InputGroupProps) {
  const isInvalid = !!((error && error !== ''))

  return (
    <FormControl isInvalid={isInvalid} id={id} marginBottom={groupMarginBottom}>
      <FormLabel color="brand.200" fontWeight="700">{label}</FormLabel>
      <Input
        borderColor="brand.500"
        _hover={{ borderColor: 'brand.100' }}
        _focus={{ borderColor: 'brand.100' }}
        onChange={(event: ChangeEvent<HTMLInputElement>) => {
          if (onChange !== undefined) onChange(event.target.value)
        }}
       { ...otherProps }
      />
      <FormErrorMessage>{error}</FormErrorMessage>
    </FormControl>
  )
}
