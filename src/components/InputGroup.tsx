import { FormControl, FormErrorMessage, FormLabel, Input, InputProps } from '@chakra-ui/react'
import { ChangeEvent } from 'react'

interface InputGroupProps extends Omit<InputProps, 'onChange'> {
  label: string
  id: string
  onChange?: (value: string) => void
  error?: string
}

export default function InputGroup ({ id, label, error, onChange, ...otherProps }: InputGroupProps) {
  const isInvalid = !!((error && error !== ''))

  return (
    <FormControl isInvalid={isInvalid} id={id} marginBottom="10px">
      <FormLabel color="brand.1000" fontWeight="700">{label}</FormLabel>
      <Input
        borderColor="brand.1300"
        _hover={{ borderColor: 'brand.800' }}
        _focus={{ borderColor: 'brand.800' }}
        onChange={(event: ChangeEvent<HTMLInputElement>) => {
          if (onChange !== undefined) onChange(event.target.value)
        }}
       { ...otherProps }
      />
      <FormErrorMessage>{error}</FormErrorMessage>
    </FormControl>
  )
}
