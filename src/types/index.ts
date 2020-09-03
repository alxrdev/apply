export interface Job {
  id: string
  title: string
  description: string
  employeer: string
  address: {
    country: string
    city: string
    state: string
  }
  jobType: string
  salary: number
}

export interface APIErrorResponse {
  error_message: string
  error_status_code: number
  message: string
  success: boolean
  error_details?: any
}
