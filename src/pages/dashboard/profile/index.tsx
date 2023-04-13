import DLayout from '../dlayout';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import { trpc } from '~/utils/trpc';

type FormData = {
  name: string;
  email: string;
  password: string;
};

export default function DashboardProfile() {
  const { data: session } = useSession();
  const mutation = trpc.user.update.useMutation();

  const [formData, setFormData] = useState<FormData>({
    name: session?.user?.name ?? '',
    email: session?.user?.email ?? '',
    password: '',
  });

  const { name, email, password } = formData;

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await mutation.mutateAsync({
      id: session?.id ?? '',
      name,
      email,
      password,
    });
  };

  return (
    <div>
      <DLayout title="Profile">
        <div className="flex flex-col md:flex-row bg-white shadow-md p-4 rounded-lg">
          <p className="text-2xl font-semibold">Update Account</p>
          <form
            className="flex flex-col w-full md:w-1/2 mt-4 md:mt-0 md:ml-4"
            onSubmit={handleSubmit}
          >
            <label htmlFor="name" className="font-semibold mt-4">
              Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring focus:border-blue-500"
              value={formData.name}
              onChange={handleInputChange}
            />
            <label htmlFor="email" className="font-semibold mt-4">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring focus:border-blue-500"
              value={formData.email}
              onChange={handleInputChange}
            />
            <label htmlFor="password" className="font-semibold mt-4">
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring focus:border-blue-500"
              value={formData.password}
              onChange={handleInputChange}
            />
            {/* <label htmlFor="password">Confirm Password</label>
              <input
                type="text"
                name="password"
                id="password"
                className="border-2 border-gray-300"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              /> */}
            <button
              type="submit"
              className="bg-blue-500 text-white font-semibold py-2 rounded-lg mt-4 hover:bg-blue-600"
            >
              Update
            </button>
          </form>
        </div>
      </DLayout>
    </div>
  );
}
