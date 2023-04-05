import Head from 'next/head';
import { DashboardSidebar } from '~/components/Dashboard/DashboardSidebar';

export default function DLayout({ children, title }: any) {
  return (
    <div>
      <Head>
        <title>Dashboard - {title} </title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex flex-col sm:flex-row">
        <div className="w-1/4 sm:w-1/5 bg-gray-100">
          <DashboardSidebar />
        </div>
        <div className="w-3/4 sm:w-4/5 bg-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h1 className="text-4xl font-bold text-center pb-4">{title}</h1>
            <p className="text-lg font-medium text-gray-700">{children}</p>
          </div>
        </div>
      </main>
    </div>
  );
}
