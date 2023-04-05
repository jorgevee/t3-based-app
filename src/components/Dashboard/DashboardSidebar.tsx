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
  return (
    //<div className="flex flex-col flex-1 h-screen overflow-hidden bg-gray-100 border border-gray-500">
    <div className="flex flex-col flex-1 h-screen overflow-hidden bg-gray-100 border border-gray-500">
      <div className="flex flex-col flex-1">
        <div className="flex items-center justify-between flex-shrink-0 p-4 bg-white border-b border-gray-200">
          <svg
            className="w-8 h-8 mr-3 text-gray-500"
            width="800px"
            height="800px"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              cx={9}
              cy={7}
              r={4}
              stroke="#000000"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M2 21V17C2 15.8954 2.89543 15 4 15H14C15.1046 15 16 15.8954 16 17V21"
              stroke="#000000"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M16 11H22"
              stroke="#000000"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span className="text-xl font-semibold text-gray-700">SaaS App</span>
        </div>
      </div>
      <nav className="w-full h-full overflow-y-auto bg-white border-r border-gray-200">
        {tabs.map((tab) => (
          <Link
            href={tab.href}
            key={tab.name}
            className="flex items-center h-12 px-6 hover:bg-violet-200"
          >
            {tab.name}
          </Link>
        ))}
        <button
          className="flex items-center h-12 px-6 hover:bg-red-200"
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
