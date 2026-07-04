import React, { useState } from 'react';
import { 
  BarChart3,
  Users,
  Building2,
  Calendar,
  TrendingUp,
  Plus,
  Edit,
  Trash2,
  Filter,
  Search,
  Download,
  Eye,

  
  
} from 'lucide-react';

interface TPOPanelProps {
  userRole: 'student' | 'alumni' | 'tpo' | null;
}

const TPOPanel: React.FC<TPOPanelProps> = ({ userRole }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');

  if (userRole !== 'tpo') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Access Restricted</h2>
          <p className="text-gray-600">This panel is only accessible to TPO users.</p>
        </div>
      </div>
    );
  }

  const placementStats = [
    { label: 'Total Students', value: '450', change: '+12%', icon: Users, color: 'text-blue-600' },
    { label: 'Companies Registered', value: '85', change: '+8%', icon: Building2, color: 'text-green-600' },
    { label: 'Active Drives', value: '24', change: '+15%', icon: Calendar, color: 'text-purple-600' },
    { label: 'Placement Rate', value: '78%', change: '+5%', icon: TrendingUp, color: 'text-orange-600' }
  ];

  const recentDrives = [
    {
      id: 1,
      company: 'Google',
      role: 'Software Engineer',
      applications: 45,
      shortlisted: 12,
      selected: 3,
      status: 'ongoing',
      deadline: '2025-02-15',
      package: '25-30 LPA'
    },
    {
      id: 2,
      company: 'Microsoft',
      role: 'Product Manager',
      applications: 32,
      shortlisted: 8,
      selected: 2,
      status: 'completed',
      deadline: '2025-02-10',
      package: '22-28 LPA'
    },
    {
      id: 3,
      company: 'Amazon',
      role: 'Data Scientist',
      applications: 28,
      shortlisted: 6,
      selected: 1,
      status: 'upcoming',
      deadline: '2025-02-20',
      package: '18-24 LPA'
    }
  ];

  const pendingActions = [
    { id: 1, type: 'Company Registration', company: 'Flipkart', priority: 'high', date: '2025-01-12' },
    { id: 2, type: 'Drive Approval', company: 'Paytm', priority: 'medium', date: '2025-01-11' },
    { id: 3, type: 'Student Verification', company: 'Swiggy', priority: 'low', date: '2025-01-10' }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ongoing': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'upcoming': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const tabs = [
    { id: 'overview', name: 'Overview', icon: BarChart3 },
    { id: 'drives', name: 'Placement Drives', icon: Calendar },
    { id: 'companies', name: 'Companies', icon: Building2 },
    { id: 'students', name: 'Students', icon: Users }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">TPO Control Panel</h1>
            <p className="text-gray-600">Manage placement drives and track student progress</p>
          </div>
          <div className="flex space-x-3 mt-4 md:mt-0">
            <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-colors flex items-center">
              <Plus className="h-5 w-5 mr-2" />
              Add Drive
            </button>
            <button className="bg-white border border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-50 transition-colors flex items-center">
              <Download className="h-5 w-5 mr-2" />
              Export Data
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white p-1 rounded-xl shadow-sm mb-8">
          <nav className="flex space-x-1">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                <tab.icon className="h-5 w-5 mr-2" />
                {tab.name}
              </button>
            ))}
          </nav>
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Stats Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {placementStats.map((stat, index) => (
                <div key={index} className="bg-white p-6 rounded-xl shadow-sm">
                  <div className="flex items-center justify-between mb-3">
                    <stat.icon className={`h-8 w-8 ${stat.color}`} />
                    <span className="text-sm text-green-600 font-medium">{stat.change}</span>
                  </div>
                  <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
                  <div className="text-gray-600 text-sm">{stat.label}</div>
                </div>
              ))}
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              {/* Recent Drives */}
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Placement Drives</h3>
                <div className="space-y-4">
                  {recentDrives.slice(0, 3).map(drive => (
                    <div key={drive.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <div>
                        <h4 className="font-medium text-gray-900">{drive.company}</h4>
                        <p className="text-sm text-gray-600">{drive.role}</p>
                        <div className="flex items-center mt-2 space-x-4">
                          <span className="text-sm text-gray-500">{drive.applications} applications</span>
                          <span className="text-sm text-gray-500">{drive.selected} selected</span>
                        </div>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(drive.status)}`}>
                        {drive.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Pending Actions */}
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Pending Actions</h3>
                <div className="space-y-4">
                  {pendingActions.map(action => (
                    <div key={action.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <div>
                        <h4 className="font-medium text-gray-900">{action.type}</h4>
                        <p className="text-sm text-gray-600">{action.company}</p>
                        <p className="text-sm text-gray-500">{action.date}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${getPriorityColor(action.priority)}`}>
                          {action.priority}
                        </span>
                        <button className="text-blue-600 hover:text-blue-700">
                          <Eye className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Drives Tab */}
        {activeTab === 'drives' && (
          <div className="space-y-6">
            {/* Search and Filter */}
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search drives..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="flex gap-2">
                  <select className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option>All Status</option>
                    <option>Ongoing</option>
                    <option>Completed</option>
                    <option>Upcoming</option>
                  </select>
                  <button className="flex items-center px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50">
                    <Filter className="h-5 w-5 mr-2" />
                    Filter
                  </button>
                </div>
              </div>
            </div>

            {/* Drives Table */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Company</th>
                      <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Role</th>
                      <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Applications</th>
                      <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Selected</th>
                      <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Status</th>
                      <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {recentDrives.map(drive => (
                      <tr key={drive.id}>
                        <td className="px-6 py-4">
                          <div className="flex items-center">
                            <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center mr-3">
                              <Building2 className="h-5 w-5 text-gray-600" />
                            </div>
                            <div>
                              <div className="font-medium text-gray-900">{drive.company}</div>
                              <div className="text-sm text-gray-500">{drive.package}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-gray-900">{drive.role}</td>
                        <td className="px-6 py-4 text-gray-900">{drive.applications}</td>
                        <td className="px-6 py-4 text-gray-900">{drive.selected}</td>
                        <td className="px-6 py-4">
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(drive.status)}`}>
                            {drive.status}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex space-x-2">
                            <button className="text-blue-600 hover:text-blue-700">
                              <Edit className="h-4 w-4" />
                            </button>
                            <button className="text-green-600 hover:text-green-700">
                              <Eye className="h-4 w-4" />
                            </button>
                            <button className="text-red-600 hover:text-red-700">
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Companies and Students tabs would have similar structured content */}
        {activeTab === 'companies' && (
          <div className="bg-white p-8 rounded-xl shadow-sm text-center">
            <Building2 className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Companies Management</h3>
            <p className="text-gray-600">Manage company registrations, partnerships, and collaboration details.</p>
          </div>
        )}

        {activeTab === 'students' && (
          <div className="bg-white p-8 rounded-xl shadow-sm text-center">
            <Users className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Student Management</h3>
            <p className="text-gray-600">Track student applications, eligibility, and placement progress.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TPOPanel;