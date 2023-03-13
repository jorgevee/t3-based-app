// create header using tailwind css
import Link from 'next/link';
import { useState } from 'react';
import { useSession, signOut, signIn } from 'next-auth/react';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { data: session, status } = useSession();
  return (
    <div className="bg-gray-800">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between flex-wrap">
          <div className="flex items-center flex-shrink-0 text-white mr-6">
            <Link href="/">
              <p>
                <span className="font-semibold text-xl tracking-tight">
                  App
                </span>
              </p>
            </Link>
          </div>
          <div className="block lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="flex items-center px-3 py-2 border rounded text-gray-500 border-gray-400 hover:text-white hover:border-white"
            >
              <svg
                className="fill-current h-3 w-3"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <title>Menu</title>
                <path
                  fillRule="evenodd"
                  d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
          <div
            className={`${
              isOpen ? 'block' : 'hidden'
            } w-full block flex-grow lg:flex lg:items-center lg:w-auto`}
          >
            <div className="text-sm lg:flex-grow">
              <Link href="/blog" legacyBehavior>
                <a className="block mt-4 lg:inline-block lg:mt-0 text-gray-200 hover:text-white mr-4">
                  Blog
                </a>
              </Link>
              <Link href="/about" legacyBehavior>
                <a className="block mt-4 lg:inline-block lg:mt-0 text-gray-200 hover:text-white mr-4">
                  About
                </a>
              </Link>
              <Link href="/contact" legacyBehavior>
                <a className="block mt-4 lg:inline-block lg:mt-0 text-gray-200 hover:text-white mr-4">
                  Contact
                </a>
              </Link>
            </div>
            <div>
              {
                //if no session show login button else show logout button
                !session ? (
                  <div className="flex flex-col lg:flex-row">
                    <Link
                      href="/auth/login"
                      className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-gray-800 hover:bg-white mt-4 lg:mt-0 mr-4"
                    >
                      Sign In
                    </Link>
                    <Link
                      href="/auth/signup"
                      className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-gray-800 hover:bg-white mt-4 lg:mt-0"
                    >
                      Sign Up
                    </Link>
                  </div>
                ) : (
                  <button
                    onClick={() => signOut({ callbackUrl: '/' })}
                    className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-gray-800 hover:bg-white mt-4 lg:mt-0"
                  >
                    Logout
                  </button>
                )
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
