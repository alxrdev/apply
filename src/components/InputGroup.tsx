import { Flex, Input, InputProps, Text } from '@chakra-ui/react'
import { ChangeEvent } from 'react'

interface InputGroupProps extends Omit<InputProps, 'onChange'> {
  label: string
  id: string
  className?: string
  onChange: (value: string) => void
  error?: string
}

export default function InputGroup ({ id, label, onChange, error, ...otherProps }: InputGroupProps) {
  return (
    <Flex
      position="relative"
      width="100%"
      flexDirection="column"
      marginBottom="20px"
    >
      <Text
        as="label"
        color="brand.1000"
        fontSize="sm"
        fontWeight="700"
        htmlFor={id}
      >
        { label }
      </Text>

      <Input
        id={id}
        width="100%"
        height="40px"
        maxHeight="40px"
        padding="1rem 1.3rem"
        marginTop="5px"
        fontSize="sm"
        borderRadius="30px"
        borderStyle="solid"
        borderColor={!error ? 'brand.1300' : '#db183f'}
        transition="ease 0.3s"
        _focus={{ borderColor: 'brand.800' }}
        onChange={(event: ChangeEvent<HTMLInputElement>) => {
          if (onChange !== undefined) onChange(event.target.value)
        }}
        { ...otherProps }
      />

      { error && (
        <Text marginTop="10px" color="#db183f" fontSize="sm">{ error }</Text>
      ) }
    </Flex>
  )
}
