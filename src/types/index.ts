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
  userId: string
  title: string
  description: string
  address: Address
  jobType: string
  workTime: string
  workplace: string
  featured: boolean
  tags: string
  salary: number
  lastDate: Date
  createdAt: Date
}

export interface Address {
  country: string
  city: string
}

export interface APIErrorResponse {
  error_message: string
  error_status_code: number
  message: string
  success: boolean
  error_details?: any
}
