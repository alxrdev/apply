import { APIErrorResponse, APIValidationError } from '../types'

interface Error {
  [key: string]: string
}

const getApiValidationError = (response: APIErrorResponse): Error => {
  const errors: Error = {}

  if (response.error_details) {
    response.error_details.forEach((error: APIValidationError) => {
      errors[error.propertie] = error.constraints
    })
  }

  errors.globalError = response.error_message

  return errors
}

export default getApiValidationError
