import { ValidationError } from 'yup'

interface Error {
  [key: string]: string
}

export default function getValidationError (error: ValidationError): Error {
  const validationError: Error = {}
  validationError[error.path] = error.message
  return validationError
}
