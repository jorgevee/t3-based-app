import { useSession } from 'next-auth/react';
import Head from 'next/head';
import Link from 'next/link';
import DLayout from './dlayout';
import { DashboardSidebar } from '~/components/Dashboard/DashboardSidebar';
function DashboardMain() {
  const { data: session, status } = useSession();
  const loading = status === 'loading';
  //get current user's id from session
  //   const currentUser = session.id;
  //   console.log(currentUser);

  if (loading) return <div className="text-center">Loading...</div>;
  //if no seession return not authorized eles return dashboard
  return (
    <div>
      <DLayout title="Home">
        <div className="flex flex-col md:flex-row">
          <p className="text-2xl font-semibold">
            Welcome {session?.user?.name}
          </p>
        </div>
      </DLayout>
    </div>
  );
}

export default DashboardMain;
