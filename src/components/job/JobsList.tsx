import { Box, Text } from '@chakra-ui/layout'
import { CollectionResponse, Job } from '../../types'

import JobItem from './JobItem'

interface JobsListProps {
  jobs: CollectionResponse<Job>
}

export default function JobsList ({ jobs } : JobsListProps) {
  return (
    <Box marginTop="20px">
      <Text as="p" fontSize="sm">Total jobs found: {jobs.totalItems}</Text>

      <Box marginTop="20px">
        {jobs.data.map((job: Job) => (
          <JobItem key={job.id} job={job} />
        ))}
      </Box>
    </Box>
  )
}
