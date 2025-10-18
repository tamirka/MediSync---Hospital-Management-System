import React from 'react';
import type { Patient, BillingInvoice } from '../types';
import { mockInvoices } from '../data/mockData';
import { BillingIcon } from '../components/Icons';

interface BillingProps {
  patient?: Patient;
}

const getStatusClass = (status: BillingInvoice['status']) => {
  switch (status) {
    case 'Paid':
      return 'bg-green-100 text-green-800';
    case 'Due':
      return 'bg-yellow-100 text-yellow-800';
    case 'Overdue':
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

const Billing: React.FC<BillingProps> = ({ patient }) => {
  if (!patient) {
    // Admin view placeholder
    return (
      <div className="flex flex-col items-center justify-center h-full text-center">
        <BillingIcon className="w-24 h-24 text-gray-300 mb-4" />
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Billing Module</h2>
        <p className="text-lg text-gray-500">
          This is the admin view for billing management, which is currently under development.
        </p>
      </div>
    );
  }

  const patientInvoices = mockInvoices.filter(invoice => invoice.patientId === patient.id);

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-800">My Billing History</h2>
        <button className="px-4 py-2 bg-primary text-white rounded-lg shadow hover:bg-primary-focus transition-colors">
          Pay All Due
        </button>
      </div>
       <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full leading-normal">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Invoice ID</th>
                <th className="px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Date</th>
                <th className="px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Service</th>
                <th className="px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Amount</th>
                <th className="px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
                 <th className="px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody>
              {patientInvoices.map((invoice) => (
                <tr key={invoice.id} className="hover:bg-gray-50">
                  <td className="px-5 py-4 border-b border-gray-200 bg-white text-sm">{invoice.id}</td>
                  <td className="px-5 py-4 border-b border-gray-200 bg-white text-sm">{invoice.date}</td>
                  <td className="px-5 py-4 border-b border-gray-200 bg-white text-sm font-semibold">{invoice.service}</td>
                  <td className="px-5 py-4 border-b border-gray-200 bg-white text-sm">${invoice.amount.toFixed(2)}</td>
                  <td className="px-5 py-4 border-b border-gray-200 bg-white text-sm">
                    <span className={`px-2 py-1 font-semibold leading-tight rounded-full text-xs ${getStatusClass(invoice.status)}`}>
                      {invoice.status}
                    </span>
                  </td>
                  <td className="px-5 py-4 border-b border-gray-200 bg-white text-sm">
                    {invoice.status !== 'Paid' && <button className="text-primary hover:text-primary-focus font-medium">Pay Now</button>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Billing;
