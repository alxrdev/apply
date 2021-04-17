import { AppProps } from 'next/app'
import { Provider as AuthProvider } from 'next-auth/client'

import ThemeContainer from '../components/ThemeContainer'

import '../styles/globals.scss'

function MyApp ({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider session={pageProps.session}>
      <ThemeContainer>
        <div className="page">
          <Component {...pageProps} />
        </div>
      </ThemeContainer>
    </AuthProvider>
  )
}

export default MyApp
