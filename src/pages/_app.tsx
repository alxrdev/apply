import { AuthProvider } from '../contexts/AuthContext'
import ThemeContainer from '../components/ThemeContainer'

import '../styles/globals.scss'

interface MyAppProps {
  Component: any
  pageProps: any
}

function MyApp ({ Component, pageProps }: MyAppProps) {
  return (
    <AuthProvider userId="1">
      <ThemeContainer>
        <div className="page">
          <Component {...pageProps} />
        </div>
      </ThemeContainer>
    </AuthProvider>
  )
}

export default MyApp
