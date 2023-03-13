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

  if (loading) return null;
  //if no seession return not authorized eles return dashboard
  if (session) {
    return (
      <div>
        <DLayout title="Dashboard">
          <p>Hello there user!</p>
        </DLayout>
      </div>
    );
  }
}

export default DashboardMain;
