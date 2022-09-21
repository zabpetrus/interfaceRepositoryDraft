import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ToggleContextProvider } from '../contexts/ToggleContext'

function MyApp({ Component, pageProps }: AppProps) {
  
  return (
    <ToggleContextProvider>
      <Component {...pageProps} />
    </ToggleContextProvider>
    
  ) 
}

export default MyApp
