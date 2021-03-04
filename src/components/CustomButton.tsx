import { Button, ButtonProps } from '@chakra-ui/react'

interface CustomButtonProps extends ButtonProps {
  buttonStyle: 'primary' | 'dark'
  isBlock?: boolean
  text: string
  className?: string
}

export default function CustomButton ({ buttonStyle, isBlock, text, className, ...otherProps }: CustomButtonProps) {
  return (
    <Button
      display={isBlock ? 'block' : 'inline-block'}
      width={isBlock ? '100%' : 'initial'}
      height="auto"
      padding="1rem 2rem"
      boxShadow="5px 3px 25px #cdcdcd"
      fontWeight="300"
      textDecoration="none"
      textAlign="center"
      verticalAlign="middle"
      border="none"
      borderRadius="30px"
      transition="ease 0.3s"
      cursor="pointer"
      background={buttonStyle === 'primary' ? 'brand.900' : '#222'}
      color="#fff"
      _hover={{
        background: (buttonStyle === 'primary') ? 'brand.800' : 'rgba(34, 34, 34, 0.521)'
      }}
      { ...otherProps }
    >
      { text }
    </Button>
  )
}
