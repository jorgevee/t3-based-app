import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { trpc } from '../utils/trpc';
import { useSession } from 'next-auth/react';

export default function Property(): JSX.Element {
  const { data: session } = useSession();
  const [propertyData, setPropertyData] = useState({
    name: '',
    description: '',
    price: '',
    location: '',
    userId: session?.id ?? '', // add null fallback value here
  });
  console.log('property data:', propertyData);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPropertyData({ ...propertyData, [name]: value });
  };
  const createMutation = trpc.property.create.useMutation();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    propertyData.userId = session?.id ?? '';
    await createMutation.mutateAsync(propertyData);
  };
  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold mb-4">Create a Property</h1>
      <p className="text-lg mb-8">
        Create a new property by filling out the form below:
      </p>
      <form className="max-w-lg mx-auto py-8" onSubmit={handleSubmit}>
        <div className="mb-6">
          <label htmlFor="name" className="block text-gray-700 font-bold mb-2">
            Prop Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="w-full p-2 border border-gray-400 rounded-lg"
            required={true}
            onChange={handleChange}
          />
          <label
            htmlFor="description"
            className="block text-gray-700 font-bold mb-2"
          >
            Description
          </label>
          <input
            type="text"
            id="description"
            name="description"
            className="w-full p-2 border border-gray-400 rounded-lg"
            required={true}
            onChange={handleChange}
          />
          <label htmlFor="price" className="block text-gray-700 font-bold mb-2">
            Price
          </label>
          <input
            type="text"
            id="price"
            name="price"
            className="w-full p-2 border border-gray-400 rounded-lg"
            required={true}
            onChange={handleChange}
          />
          <label
            htmlFor="location"
            className="block text-gray-700 font-bold mb-2"
          >
            Location
          </label>
          <input
            type="text"
            id="location"
            name="location"
            className="w-full p-2 border border-gray-400 rounded-lg"
            required={true}
            onChange={handleChange}
          />
        </div>
        <button
          type="submit"
          className="bg-gradient-to-r from-gray-400 to-blue-500 hover:from-blue-500 hover:to-gray-400 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
