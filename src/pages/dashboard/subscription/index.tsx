// display current user's name
import { trpc } from '~/utils/trpc';
import DLayout from '../dlayout';
export default function DashboardSettings() {
  return (
    <div>
      <DLayout title="Subscription">
        <p className="text-lg font-medium text-gray-700">Subscription</p>
        <p className="text-lg font-medium text-gray-700">
          New Plans coming soon!
        </p>
      </DLayout>
    </div>
  );
}
//
