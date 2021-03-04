import Head from 'next/head'
import { Box, Flex, Heading, Image, Text } from '@chakra-ui/react'

import { useAuth } from '../hooks'
import Header from '../components/Header'
import { JobsListProvider } from '../contexts/JobsListContext'
import HomeSearchForm from '../components/HomeSearchForm'
import CustomLink from '../components/CustomLink'

export default function Home () {
  const { user } = useAuth()

  return (
    <JobsListProvider>
      <Box>
        <Head>
          <title>Apply | Find your dream job!</title>
        </Head>

        <Header />

        <Flex flexDirection="column" justifyContent="center" width="100%" maxWidth="700px" minHeight="80vh" padding="1.8rem" margin="0 auto">
          <Image src="/images/logo.svg" alt='Apply' width="100%" maxWidth="230px" margin="20px auto" />

          <Heading as="h1" size="lg" textAlign="center">Find the job of your dreams</Heading>

          <HomeSearchForm />

          { !user && (
            <Box marginTop="2rem" textAlign="center">
              <Text marginBottom="10px" fontSize="lg" fontWeight="700">
                Are you looking for a job? Apply for one. <CustomLink href="/login" text="Log In" />
              </Text>
              <Text marginBottom="10px" fontSize="lg" fontWeight="700">
                Are you an employer? Advertise your job here. <CustomLink href="/signup" text="Sign Up" />
              </Text>
            </Box>
          ) }
        </Flex>
      </Box>
    </JobsListProvider>
  )
}
