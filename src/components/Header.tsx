import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { GraduationCap, User, Menu, X } from 'lucide-react';

interface HeaderProps {
  userRole: 'student' | 'alumni' | 'tpo' | null;
  setUserRole: (role: 'student' | 'alumni' | 'tpo' | null) => void;
}

const Header: React.FC<HeaderProps> = ({ userRole, setUserRole }) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const location = useLocation();

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Dashboard', href: '/dashboard' },
    { name: 'Companies', href: '/companies' },
    { name: 'Blog', href: '/blog' },
    { name: 'Alumni Connect', href: '/alumni-connect' },
  ];

  if (userRole === 'tpo') {
    navigation.push({ name: 'TPO Panel', href: '/tpo-panel' });
  }

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <div className="bg-gradient-to-br from-blue-600 to-purple-600 p-2 rounded-lg">
              <GraduationCap className="h-8 w-8 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Placement Guide
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`px-3 py-2 text-sm font-medium transition-colors ${
                  location.pathname === item.href
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : 'text-gray-700 hover:text-blue-600'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* User Role Selector & Profile */}
          <div className="hidden md:flex items-center space-x-4">
            <select
              value={userRole || ''}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setUserRole(e.target.value as 'student' | 'alumni' | 'tpo' | null)}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Role</option>
              <option value="student">Student</option>
              <option value="alumni">Alumni</option>
              <option value="tpo">TPO</option>
            </select>
            <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-2 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-colors">
              <User className="h-5 w-5" />
            </button>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <nav className="flex flex-col space-y-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`px-3 py-2 text-sm font-medium ${
                    location.pathname === item.href
                      ? 'text-blue-600 bg-blue-50'
                      : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                  } rounded-lg`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </nav>
            <div className="mt-4 pt-4 border-t border-gray-200">
              <select
                value={userRole || ''}
               onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setUserRole(e.target.value as 'student' | 'alumni' | 'tpo' | null)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Role</option>
                <option value="student">Student</option>
                <option value="alumni">Alumni</option>
                <option value="tpo">TPO</option>
              </select>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;