import type { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { trpc } from '../../utils/trpc';
import Link from 'next/link';

const SignUp: NextPage = () => {
  const router = useRouter();
  const [FormData, setFormData] = useState({
    email: '',
    password: '',
    error: '',
    success: '',
  });
  const { email, password, error, success } = FormData;

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setFormData({ ...FormData, [name]: value });
  }

  const mutation = trpc.auth.signup.useMutation();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const user = await mutation.mutateAsync({ email, password });
      router.push('/dashboard');
      FormData.success = 'User created successfully';
    } catch (error) {
      FormData.error = error?.data?.message;
      FormData.success = '';
    }
  };

  return (
    <div>
      <Head>
        <title>Sign Up - MyApp</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="Sign Up Page" content="Sign Up - MyApp" />
      </Head>

      <main className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-50 sm:px-6 lg:px-8">
        <form onSubmit={handleSubmit} className="w-full max-w-sm">
          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              name="email"
              required={true}
              placeholder="Enter your email"
              value={email}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              name="password"
              placeholder="Enter your password"
              value={password}
              onChange={handleInputChange}
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Sign Up
            </button>
            <Link
              href="/auth/login"
              passHref
              className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
            >
              Already have an account?
            </Link>
          </div>
        </form>
        {error && <p className="text-red-500">{error}</p>}
        {success && <p className="text-green-500">{success}</p>}
      </main>
    </div>
  );
};

export default SignUp;
export async function getServerSideProps(context: any) {
  const { req } = context;
  const session = req.cookies['next-auth.session-token'];
  // const providers = await getProviders();
  if (session) {
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
