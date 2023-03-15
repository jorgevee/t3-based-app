import clsx from 'clsx';
import DLayout from '../dlayout';
export default function DashboardTechData({ data }) {
  return (
    <DLayout title="Tech Data">
      <div className="flex flex-col justify-center items-center p-4 bg-white rounded-lg shadow-md">
        <h2 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-4">
          {data?.name} ({data?.symbol})
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <div className="flex flex-col justify-center items-center bg-gray-100 p-2 sm:p-4 md:p-6 rounded-lg shadow-md">
            <h3 className="text-base sm:text-lg font-semibold mb-2">
              Market Cap
            </h3>
            <p className="text-lg sm:text-2xl font-bold">
              ${(+data?.marketCapUsd).toLocaleString()}
            </p>
          </div>
          <div className="flex flex-col justify-center items-center bg-gray-100 p-2 sm:p-4 md:p-6 rounded-lg shadow-md">
            <h3 className="text-base sm:text-lg font-semibold mb-2">
              24h Volume
            </h3>
            <p className="text-lg sm:text-2xl font-bold">
              ${(+data?.volumeUsd24Hr).toLocaleString()}
            </p>
          </div>
          <div className="flex flex-col justify-center items-center bg-gray-100 p-2 sm:p-4 md:p-6 rounded-lg shadow-md">
            <h3 className="text-base sm:text-lg font-semibold mb-2">Price</h3>
            <p className="text-lg sm:text-2xl font-bold">
              ${(+data?.priceUsd).toLocaleString()}
            </p>
          </div>
          <div className="flex flex-col justify-center items-center bg-gray-100 p-2 sm:p-4 md:p-6 rounded-lg shadow-md">
            <h3 className="text-base sm:text-lg font-semibold mb-2">
              24h Change
            </h3>
            <p
              className={clsx('text-2xl font-bold', {
                'text-green-500': data?.changePercent24Hr > 0,
                'text-red-500': data?.changePercent24Hr < 0,
              })}
            >
              {(+data?.changePercent24Hr).toFixed(2)}%
            </p>
          </div>
        </div>
      </div>
    </DLayout>
  );
}

export async function getServerSideProps({ params }) {
  const API = 'https://api.coincap.io/v2/assets/bitcoin';
  const res = await fetch(API);
  const data = await res.json();
  //   console.log('data: ', data.data.id);
  return {
    props: {
      data: data.data,
    },
  };
}
