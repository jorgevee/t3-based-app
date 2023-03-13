// About us page

import Link from 'next/link';

export default function About() {
  return (
    <div className="container mx-auto">
      <h1 className="text-center text-4xl">About us</h1>
      <p className="text-gray-500">
        This is a demo app using trpc, next.js, and tailwindcss. It is a saas
        app boilerplate.
      </p>
      <p>
        <Link href="/" className="text-blue-500">
          Go back home
        </Link>
      </p>
    </div>
  );
}
