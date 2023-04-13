import { useState } from 'react';
import { trpc } from '~/utils/trpc';
import { useSession } from 'next-auth/react';
import { useQuery } from '@tanstack/react-query';

const loadingCircle = (
  <div className="flex justify-center items-center">
    <svg
      className="animate-spin -ml-1 mr-3 h-5 w-5 text-violet-500"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      ></circle>
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8v8z"
      ></path>
    </svg>
    <p>Loading...</p>
  </div>
);

export default function MyProperties(): JSX.Element {
  const { data: session } = useSession();
  const [properties, setProperties] = useState<any>([]);

  const allProperties = trpc.property.myProperties.useQuery(
    {
      id: session?.id || '',
    },
    {
      // set loading state when query is in loading state
      onSettled: () => setLoadingProperties(true),
      // set properties when query is successfully resolved with data
      onSuccess: (data) => setProperties(data),
    },
  );
  console.log('properties', properties);

  const [loadingProperties, setLoadingProperties] = useState(false);

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-4 text-center">My Properties</h1>
      <p className="text-lg mb-8 text-center">
        Discover all the properties you&apos;ve added to your account.
      </p>
      {allProperties.isLoading && loadingCircle}
      {properties?.map((property: any) => (
        <div key={property.id} className="border border-gray-400 p-4 mt-4">
          <h2 className="text-xl font-bold mb-2">{property?.name}</h2>
          <p className="mb-2">{property.description}</p>
          <p className="mb-2 text-lg font-bold">${property.price}</p>
          <p className="text-gray-600">{property.location}</p>
        </div>
      ))}
    </div>
  );
}

//we will first check for authentication. Generate a getServerSideProps function that will check if the user is authenticated. If not, redirect to the login page. If the user is authenticated, return the props to the page.
export async function getServerSideProps(context: any) {
  const { req } = context;
  const session = req.cookies['next-auth.session-token'];
  // const providers = await getProviders();
  if (!session) {
    return {
      redirect: {
        destination: '/dashboard',
        permanent: false,
      },
    };
  }
  return {
    props: {
      // providers,
    },
  };
}
