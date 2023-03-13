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
      <form className="flex flex-col items-center" onSubmit={submission}>
        <input
          type="text"
          placeholder="Name"
          className="w-full p-2 mb-4 border border-gray-400 rounded-lg"
          required={true}
        />
        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 mb-4 border border-gray-400 rounded-lg"
        />
        <textarea
          placeholder="Message"
          className="w-full p-2 mb-4 border border-gray-400 rounded-lg"
        ></textarea>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Submit
        </button>
      </form>
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
}
