import Head from 'next/head';
import { ReactNode } from 'react';
import Header from './Header/Header';
import { Footer } from './Footer/footer';
import { useSession } from 'next-auth/react';

type DefaultLayoutProps = { children: ReactNode };

export const DefaultLayout = ({ children }: DefaultLayoutProps) => {
  return (
    <>
      <Head>
        <title>SaaS App</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="description" content="A description of the page" />
        <meta name="keywords" content="some, keywords, for, the, page" />
      </Head>
      <main>
        <Header />
        {children}
        <Footer />
      </main>
    </>
  );
};
