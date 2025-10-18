import React from 'react';
import { User } from '../types';

interface HeaderProps {
  activePage: string;
  user: User;
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ activePage, user, onLogout }) => {
  const formatPageTitle = (page: string) => {
    if (page === 'PatientProfile') {
        return user.role === 'Patient' ? 'My Medical Records' : 'Patient Profile';
    }
    if (user.role === 'Patient') {
        if (page === 'Billing') return 'My Billing';
        if (page === 'Pharmacy') return 'My Prescriptions';
    }
    return page.replace(/([A-Z])/g, ' $1').trim();
  }

  return (
    <header className="flex items-center justify-between h-20 px-6 bg-white border-b border-gray-200 flex-shrink-0">
      <h1 className="text-2xl font-bold text-gray-800">{formatPageTitle(activePage)}</h1>
      <div className="flex items-center space-x-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search..."
            className="w-64 p-2 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <svg className="w-5 h-5 text-gray-400 absolute top-1/2 left-3 transform -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
        </div>
        <div className="flex items-center">
          <img
            src={user.imageUrl}
            alt="User Avatar"
            className="w-10 h-10 rounded-full"
          />
          <div className="ml-3 text-left">
            <p className="text-sm font-semibold text-gray-800">{user.name}</p>
            <p className="text-xs text-gray-500">{user.role}</p>
          </div>
        </div>
        <button
            onClick={onLogout}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 text-sm font-medium transition-colors"
        >
            Logout
        </button>
      </div>
    </header>
  );
};

export default Header;
