export interface User {
  id: string,
  name: string,
  role: string,
  avatar: string,
  createdAt: Date,
}

export interface CollectionResponse<T> {
  success: boolean,
  message: string,
  totalItems: number,
  previousPage: string,
  nextPage: string,
  data: Array<Job>
}

export interface Job {
  id: string
  user: User
  title: string
  description: string
  address: Address
  jobType: string
  salary: number
  createdAt: Date
}

export interface Address {
  state: string
  city: string
}

export interface APIErrorResponse {
  error_message: string
  error_status_code: number
  message: string
  success: boolean
  error_details?: any
}
