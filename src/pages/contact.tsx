import { trpc } from '~/utils/trpc';
import { useState } from 'react';
export default function Contact(): JSX.Element {
  // const { data } = trpc.user.getAll.useQuery();
  const [error, setError] = useState<string | null>(null);
  const submission = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('There is currently no api to submit to.');
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold mb-4">Contact Us</h1>
      <p className="text-lg mb-8">
        Get in touch with us by filling out the form below:
      </p>
      <form className="max-w-lg mx-auto py-8" onSubmit={submission}>
        <div className="mb-6">
          <label htmlFor="name" className="block text-gray-700 font-bold mb-2">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="w-full p-2 border border-gray-400 rounded-lg"
            required={true}
          />
        </div>

        <div className="mb-6">
          <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="w-full p-2 border border-gray-400 rounded-lg"
          />
        </div>

        <div className="mb-6">
          <label
            htmlFor="message"
            className="block text-gray-700 font-bold mb-2"
          >
            Message
          </label>
          <textarea
            id="message"
            name="message"
            className="w-full p-2 border border-gray-400 rounded-lg"
          ></textarea>
        </div>

        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-gradient-to-r from-gray-400 to-blue-500 hover:from-blue-500 hover:to-gray-400 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Submit
          </button>
        </div>
      </form>

      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
}
