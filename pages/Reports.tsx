
import React from 'react';
import { ReportsIcon } from '../components/Icons';

const Reports: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center">
      <ReportsIcon className="w-24 h-24 text-gray-300 mb-4" />
      <h2 className="text-3xl font-bold text-gray-800 mb-2">Reports & Analytics</h2>
      <p className="text-lg text-gray-500">
        This feature is currently under development. Advanced reporting and data visualization tools will be available soon.
      </p>
    </div>
  );
};

export default Reports;
