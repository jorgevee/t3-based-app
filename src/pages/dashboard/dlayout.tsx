import Head from 'next/head';
import { DashboardSidebar } from '~/components/Dashboard/DashboardSidebar';

export default function DLayout({ children, title }) {
  return (
    <div>
      <Head>
        <title>Dashboard</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex flex-row">
        <div className="side w-25">
          <DashboardSidebar />
        </div>
        <div className="main w-75">
          <h1 className="text-4xl font-bold">{title}</h1>
          <p className="text-lg font-medium text-gray-700">{children}</p>
        </div>
      </main>
    </div>
  );
}
