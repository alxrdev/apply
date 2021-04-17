import { Box, Container } from '@chakra-ui/layout'
import Head from 'next/head'

import Header from '../components/header/Header'
import HeaderSearchForm from '../components/header/HeaderSearchForm'
import JobsList from '../components/job/JobsList'

// interface JobsProps {}

export default function Jobs () {
  return (
    <Box>
      <Head>
        <title>Apply | Search jobs</title>
      </Head>

      <Header>
        <HeaderSearchForm />
      </Header>

      <Container
        maxWidth="container.md"
        margin="0 auto"
      >
        <JobsList jobs={{
          success: true,
          message: 'All jobs',
          totalItems: 10,
          previousPage: '',
          nextPage: '',
          data: [
            {
              id: '12345',
              title: 'Full Stack Developer',
              jobType: 'Full-time',
              salary: 123.55,
              address: {
                city: 'Sao Mateus',
                state: 'ES'
              },
              createdAt: new Date(),
              description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Id vitae debitis explicabo vero quo tempore totam, minima perspiciatis sequi non illo sit inventore nesciunt! Nostrum, eaque? Quam magnam inventore nam?',
              user: {
                id: '123456',
                avatar: 'https://holoscdh.com.br/wp-content/plugins/imageuploader/avatar/d750142eab298111e467-1610126626779.png',
                address: null,
                bio: null,
                createdAt: null,
                headline: null,
                name: 'PicPay',
                role: 'employer'
              }
            },
            {
              id: '123456',
              title: 'Full Stack Developer',
              jobType: 'Full-time',
              salary: 123.55,
              address: {
                city: 'Sao Mateus',
                state: 'ES'
              },
              createdAt: new Date(),
              description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Id vitae debitis explicabo vero quo tempore totam, minima perspiciatis sequi non illo sit inventore nesciunt! Nostrum, eaque? Quam magnam inventore nam?',
              user: {
                id: '123456',
                avatar: 'https://holoscdh.com.br/wp-content/plugins/imageuploader/avatar/d750142eab298111e467-1610126626779.png',
                address: null,
                bio: null,
                createdAt: null,
                headline: null,
                name: 'PicPay',
                role: 'employer'
              }
            }
          ]
        }} />
      </Container>
    </Box>
  )
}
