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
