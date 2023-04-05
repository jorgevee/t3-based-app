// Create hero component using tailwindcss
import { useSession } from 'next-auth/react';
import Link from 'next/link';
const Hero = (): JSX.Element => {
  const { data: session, status } = useSession();
  return (
    <section className="text-gray-600 body-font">
      <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
        <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6 mb-10 md:mb-0">
          <img
            className="object-cover object-center rounded-lg shadow-md"
            alt="hero"
            src="https://dummyimage.com/720x600"
          />
        </div>
        <div className="lg:flex-grow md:w-1/2 lg:pl-24 md:pl-16 flex flex-col md:items-start md:text-left items-center text-center">
          <h1 className="title-font sm:text-5xl text-4xl mb-4 font-bold text-gray-900 leading-tight">
            Your Programmer
            <br className="hidden lg:inline-block text-blue-500" />
            Solution
          </h1>
          <p className="mb-8 leading-relaxed text-lg font-medium text-gray-700">
            Use Cometflow to quickly identify and resolve code errors, crashes,
            and API issues. Cometflow is trusted by developers and organizations
            to identify the most important issues and to learn from them.
          </p>
          <div className="flex justify-center">
            {session ? (
              <Link
                href="/dashboard"
                className="inline-flex text-white bg-violet-500 border-0 py-3 px-8 focus:outline-none hover:bg-violet-600 rounded-full text-lg font-medium"
              >
                Dashboard
              </Link>
            ) : (
              <Link
                href="/auth/login"
                className="inline-flex text-white bg-violet-500 border-0 py-3 px-8 focus:outline-none hover:bg-violet-600 rounded-full text-lg font-medium"
              >
                Sign In
              </Link>
            )}
            <Link
              href="/contact"
              className="ml-4 inline-flex text-gray-700 bg-gray-100 border-0 py-3 px-8 focus:outline-none hover:bg-gray-200 rounded-full text-lg font-medium"
            >
              Contact
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
