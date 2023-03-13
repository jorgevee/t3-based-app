// Create a sidebar component using tailwindcss for the dashboard
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useState } from 'react';

const tabs = [
  {
    name: 'Dashboard',
    href: '/dashboard',
  },
  {
    name: 'Tech Data',
    href: '/dashboard/tech-data',
  },
  {
    name: 'Subscription',
    href: '/dashboard/subscription',
  },
  {
    name: 'Profile',
    href: '/dashboard/profile',
  },
];

export const DashboardSidebar = () => {
  const { data: session, status } = useSession();
  const loading = status === 'loading';
  const router = useRouter();
  const [active, setActive] = useState(false);

  if (loading) return null;
  if (!session) {
    router.push('/');
    return null;
  }

  return (
    <div className="flex flex-col flex-1 h-screen overflow-hidden bg-gray-100">
      <div className="flex items-center flex-shrink-0 px-8 py-4 bg-gray-900">
        <div className="flex items-center">
          <svg
            className="w-8 h-8 mr-2 text-gray-500 fill-current"
            viewBox="0 0 24 24"
          >
            <path d="M0 0h24v24H0z" fill="none" />
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-2-5h4v-2h-4v2zm0-4h4V7h-4v2z" />
          </svg>
          <span className="text-xl font-semibold text-gray-700">SaaS App</span>
        </div>
      </div>
      <nav className="flex flex-col flex-1">
        {tabs.map((tab) => (
          <Link
            href={tab.href}
            key={tab.name}
            className="flex items-center h-12 px-6 text-gray-500 hover:bg-gray-200"
          >
            {tab.name}
          </Link>
        ))}
        <button
          className="flex items-center h-12 px-6 hover:bg-green-200"
          onClick={() => signOut()}
        >
          <svg
            className="w-6 h-6 mr-3 text-gray-500 fill-current"
            viewBox="0 0 24 24"
          >
            <path d="M0 0h24v24H0z" fill="none" />
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-2-5h4v-2h-4v2zm0-4h4V7h-4v2z" />
          </svg>
          <span>Sign Out</span>
        </button>
      </nav>
    </div>
  );
};
