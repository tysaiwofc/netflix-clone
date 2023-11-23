// pages/sua-pagina.js
import { SessionProvider } from 'next-auth/react';
import type { AppProps } from 'next/app'

import '../styles/globals.css';

export default function SuaPagina({ 
  Component, 
  pageProps: {
    session,
    title, // Adicionando o título à props da página
    ...pageProps
  }
}: AppProps & { title?: string }) {
  return (
    <SessionProvider session={session}>
      <>

          <title>{title || 'Friendly'}</title>

        <Component {...pageProps} />
      </>
    </SessionProvider>
  )
}
