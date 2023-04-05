// display current user's name
import { trpc } from '~/utils/trpc';
import DLayout from '../dlayout';

const plans = [
  {
    id: 1,
    name: 'Basic',
    price: 9.99,
    description: 'Basic plan',
  },
  {
    id: 2,
    name: 'Premium',
    price: 19.99,
    description: 'Premium plan',
  },
  {
    id: 3,
    name: 'Ultimate',
    price: 29.99,
    description: 'Ultimate plan',
  },
];
function planCard(plan) {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full p-4 bg-white rounded-lg shadow-md">
      <p className="text-lg font-semibold text-gray-700">{plan.name}</p>
      <p className="text-2xl font-semibold text-gray-700">${plan.price}</p>
      <p className="text-gray-500">{plan.description}</p>
      <button className="px-4 py-2 mt-4 text-sm font-medium text-white bg-gray-800 rounded-md hover:bg-gray-700">
        Subscribe
      </button>
    </div>
  );
}

export default function DashboardSettings() {
  return (
    <div className="min-h-screen bg-gray-100">
      <DLayout title="Subscription">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h2 className="text-3xl font-semibold text-gray-900">
            Choose a plan
          </h2>
          <p className="mt-4 max-w-2xl text-xl text-gray-500">
            Select the plan that works best for you and your team.
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-800">
            All plans coming soon!
          </p>
          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.map((plan) => (
              <div
                key={plan.id}
                className="bg-white rounded-lg shadow-md overflow-hidden"
              >
                {planCard(plan)}
              </div>
            ))}
          </div>
        </div>
      </DLayout>
    </div>
  );
}
