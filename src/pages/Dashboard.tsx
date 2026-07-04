import React, { useState } from 'react';
import CompanyDetailsModal from '../components/CompanyDetailsModal';
import { 
  Building2, 
  Calendar, 
  MapPin, 
  Filter, 
  Search,
  Star,
  Users,
  Briefcase,
  TrendingUp
} from 'lucide-react';

interface DashboardProps {
  userRole: 'student' | 'alumni' | 'tpo' | null;
}

const Dashboard: React.FC<DashboardProps> = ({ userRole }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [selectedCompany, setSelectedCompany] = useState<typeof placementDrives[0] | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const placementDrives = [
    {
      id: 1,
      company: 'Google',
      role: 'Software Engineer',
      location: 'Bangalore',
      package: '25-30 LPA',
      deadline: '2025-02-15',
      eligibility: '70% throughout',
      status: 'active',
      logo: '/api/placeholder/80/80'
    },
    {
      id: 2,
      company: 'Microsoft',
      role: 'Product Manager',
      location: 'Hyderabad',
      package: '22-28 LPA',
      deadline: '2025-02-20',
      eligibility: '75% throughout',
      status: 'active',
      logo: '/api/placeholder/80/80'
    },
    {
      id: 3,
      company: 'Amazon',
      role: 'Data Scientist',
      location: 'Mumbai',
      package: '18-24 LPA',
      deadline: '2025-02-18',
      eligibility: '65% throughout',
      status: 'upcoming',
      logo: '/api/placeholder/80/80'
    },
    {
      id: 4,
      company: 'Flipkart',
      role: 'Frontend Developer',
      location: 'Bangalore',
      package: '15-20 LPA',
      deadline: '2025-02-25',
      eligibility: '70% throughout',
      status: 'active',
      logo: '/api/placeholder/80/80'
    }
  ];

  const quickStats = [
    { label: 'Active Drives', value: '24', icon: Briefcase, color: 'text-blue-600' },
    { label: 'Applications', value: '12', icon: Users, color: 'text-green-600' },
    { label: 'Interviews', value: '3', icon: Calendar, color: 'text-purple-600' },
    { label: 'Success Rate', value: '85%', icon: TrendingUp, color: 'text-orange-600' }
  ];

  // Filtered drives based on search and filter
  const filteredDrives = placementDrives.filter((drive) => {
    const matchesSearch =
      drive.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      drive.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
      drive.location.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFilter =
      selectedFilter === 'all' ||
      drive.status === selectedFilter;

    return matchesSearch && matchesFilter;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'upcoming': return 'bg-blue-100 text-blue-800';
      case 'closed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleViewDetails = (drive: typeof placementDrives[0]) => {
    setSelectedCompany(drive);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedCompany(null);
  };

  if (!userRole) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Please Select Your Role</h2>
          <p className="text-gray-600">Choose your role from the header to access your personalized dashboard.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Dashboard - {userRole.charAt(0).toUpperCase() + userRole.slice(1)}
          </h1>
          <p className="text-gray-600">Track your placement journey and explore opportunities</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          {quickStats.map((stat, index) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
                <stat.icon className={`h-8 w-8 ${stat.color}`} />
              </div>
            </div>
          ))}
        </div>

        {/* Search and Filter */}
        <div className="bg-white p-6 rounded-xl shadow-sm mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search companies, roles, locations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex gap-2">
              <select
                value={selectedFilter}
                onChange={(e) => setSelectedFilter(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Drives</option>
                <option value="active">Active</option>
                <option value="upcoming">Upcoming</option>
                <option value="applied">Applied</option>
              </select>
              <button className="flex items-center px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50">
                <Filter className="h-5 w-5 mr-2" />
                Filter
              </button>
            </div>
          </div>
        </div>

        {/* Placement Drives Grid */}
        <div className="grid lg:grid-cols-2 gap-6">
          {filteredDrives.map((drive) => (
            <div key={drive.id} className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-shadow border border-gray-100">
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
                      <Building2 className="h-8 w-8 text-gray-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900">{drive.company}</h3>
                      <p className="text-gray-600">{drive.role}</p>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(drive.status)}`}>
                    {drive.status.charAt(0).toUpperCase() + drive.status.slice(1)}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="flex items-center text-gray-600">
                    <MapPin className="h-4 w-4 mr-2" />
                    <span className="text-sm">{drive.location}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span className="text-sm">{drive.deadline}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Star className="h-4 w-4 mr-2 text-yellow-500" />
                    <span className="text-sm">{drive.package}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Users className="h-4 w-4 mr-2" />
                    <span className="text-sm">{drive.eligibility}</span>
                  </div>
                </div>

                <div className="flex space-x-3">
                  <a
                    href="https://grow.google/certificates/interview-warmup/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 px-4 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-colors text-center"
                  >
                    Apply Now
                  </a>
                  <button 
                    onClick={() => handleViewDetails(drive)}
                    className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-8">
          <button className="bg-white border border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-50 transition-colors">
            Load More Drives
          </button>
        </div>
      </div>

      {/* Company Details Modal */}
      {selectedCompany && (
        <CompanyDetailsModal
          company={selectedCompany}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default Dashboard;