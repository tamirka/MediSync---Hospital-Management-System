import React from 'react';
import { DashboardIcon, PatientsIcon, DoctorsIcon, AppointmentsIcon, BillingIcon, PharmacyIcon, ReportsIcon, UserCircleIcon } from './Icons';

type Page = 'Dashboard' | 'Patients' | 'Doctors' | 'Appointments' | 'Billing' | 'Pharmacy' | 'Reports' | 'PatientProfile';
type UserRole = 'Admin' | 'Doctor' | 'Patient';

interface SidebarProps {
  activePage: Page;
  setActivePage: (page: Page) => void;
  userRole: UserRole;
}

// FIX: Define a type for navigation items to ensure type safety for the 'page' property.
interface NavItemType {
  icon: React.ElementType;
  label: string;
  page: Page;
}

const NavItem: React.FC<{
  icon: React.ElementType;
  label: string;
  isActive: boolean;
  onClick: () => void;
}> = ({ icon: Icon, label, isActive, onClick }) => (
  <li>
    <a
      href="#"
      onClick={(e) => {
        e.preventDefault();
        onClick();
      }}
      className={`flex items-center p-3 my-1 rounded-lg transition-colors duration-200 ${
        isActive
          ? 'bg-primary text-white shadow-lg'
          : 'text-gray-600 hover:bg-teal-100 hover:text-primary'
      }`}
    >
      <Icon className="w-6 h-6" />
      <span className="ml-3 font-medium">{label}</span>
    </a>
  </li>
);

const Sidebar: React.FC<SidebarProps> = ({ activePage, setActivePage, userRole }) => {
  
  // FIX: Apply the NavItemType to ensure page property is of type Page.
  const adminNavItems: NavItemType[] = [
    { icon: DashboardIcon, label: 'Dashboard', page: 'Dashboard' },
    { icon: PatientsIcon, label: 'Patients', page: 'Patients' },
    { icon: DoctorsIcon, label: 'Doctors', page: 'Doctors' },
    { icon: AppointmentsIcon, label: 'Appointments', page: 'Appointments' },
    { icon: BillingIcon, label: 'Billing', page: 'Billing' },
    { icon: PharmacyIcon, label: 'Pharmacy', page: 'Pharmacy' },
    { icon: ReportsIcon, label: 'Reports', page: 'Reports' },
  ];
  
  // FIX: Apply the NavItemType to ensure page property is of type Page.
  const doctorNavItems: NavItemType[] = [
    { icon: DashboardIcon, label: 'My Dashboard', page: 'Dashboard' },
    { icon: PatientsIcon, label: 'My Patients', page: 'Patients' },
    { icon: AppointmentsIcon, label: 'My Appointments', page: 'Appointments' },
  ];

  // FIX: Apply the NavItemType to ensure page property is of type Page.
  const patientNavItems: NavItemType[] = [
    { icon: DashboardIcon, label: 'My Dashboard', page: 'Dashboard' },
    { icon: AppointmentsIcon, label: 'My Appointments', page: 'Appointments' },
    { icon: UserCircleIcon, label: 'My Medical Records', page: 'PatientProfile' },
    { icon: PharmacyIcon, label: 'My Prescriptions', page: 'Pharmacy' },
    { icon: BillingIcon, label: 'My Billing', page: 'Billing' },
  ];

  const getNavItems = () => {
    switch (userRole) {
      case 'Admin': return adminNavItems;
      case 'Doctor': return doctorNavItems;
      case 'Patient': return patientNavItems;
      default: return [];
    }
  }

  const navItems = getNavItems();

  return (
    <aside className="w-64 flex-shrink-0 bg-white shadow-xl flex flex-col">
      <div className="h-20 flex items-center justify-center bg-primary text-white">
        <h1 className="text-2xl font-bold tracking-wider">MediSync</h1>
      </div>
      <nav className="flex-1 px-4 py-6">
        <ul>
          {navItems.map((item) => (
            <NavItem
              key={item.page}
              icon={item.icon}
              label={item.label}
              isActive={activePage === item.page || (activePage === 'PatientProfile' && item.page === 'Patients' && userRole !== 'Patient')}
              onClick={() => setActivePage(item.page)}
            />
          ))}
        </ul>
      </nav>
      <div className="p-4 border-t border-gray-200">
        <p className="text-center text-xs text-gray-500">
          MediSync &copy; 2023
        </p>
      </div>
    </aside>
  );
};

export default Sidebar;