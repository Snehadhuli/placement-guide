import React, { useState, useEffect } from 'react';
import { db, Drive, Application, Company } from '../lib/db';
import { 
  BarChart3,
  Users,
  Building2,
  Calendar,
  TrendingUp,
  Plus,
  Trash2,
  Filter,
  Search,
  Download,
  Eye,
  X,
  CheckCircle,
  XCircle,
  Clock,
  Briefcase,
  FileText
} from 'lucide-react';

interface TPOPanelProps {
  userRole: 'student' | 'alumni' | 'tpo' | null;
}

const TPOPanel: React.FC<TPOPanelProps> = ({ userRole }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');
  
  // Database States
  const [drives, setDrives] = useState<Drive[]>([]);
  const [applications, setApplications] = useState<Application[]>([]);
  const [companies, setCompanies] = useState<Company[]>([]);
  
  // Modal States
  const [addDriveModalOpen, setAddDriveModalOpen] = useState(false);
  const [newDriveForm, setNewDriveForm] = useState({
    company: '',
    role: '',
    location: '',
    package: '',
    deadline: '',
    eligibility: '70% throughout',
    status: 'active' as 'active' | 'upcoming' | 'closed',
    description: '',
    requirements: '',
    logo: ''
  });

  const [reviewApp, setReviewApp] = useState<Application | null>(null);

  // Load database data
  const loadData = () => {
    setDrives(db.getDrives());
    setApplications(db.getApplications());
    setCompanies(db.getCompanies());
  };

  useEffect(() => {
    loadData();
  }, []);

  if (userRole !== 'tpo') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center p-8 bg-white rounded-2xl shadow-md border border-gray-100 max-w-md">
          <XCircle className="h-16 w-16 text-red-600 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Access Restricted</h2>
          <p className="text-gray-600">This control panel is only accessible to TPO (Training & Placement Officer) users. Please switch your role in the header to gain access.</p>
        </div>
      </div>
    );
  }

  // Dynamic statistics
  const totalStudents = 450; // Mock total strength
  const registeredCompaniesCount = companies.length;
  const activeDrivesCount = drives.filter(d => d.status === 'active').length;
  
  const totalAppliedUnique = new Set(applications.map(a => a.studentEmail)).size;
  const totalSelectedUnique = new Set(applications.filter(a => a.status === 'selected').map(a => a.studentEmail)).size;
  const placementRate = Math.round((totalSelectedUnique / (totalAppliedUnique || 1)) * 100);

  const placementStats = [
    { label: 'Total Students', value: totalStudents.toString(), change: '+12%', icon: Users, color: 'text-blue-600' },
    { label: 'Companies Registered', value: registeredCompaniesCount.toString(), change: '+8%', icon: Building2, color: 'text-green-600' },
    { label: 'Active Drives', value: activeDrivesCount.toString(), change: '+15%', icon: Calendar, color: 'text-purple-600' },
    { label: 'Placement Rate', value: `${placementRate || 78}%`, change: '+5%', icon: TrendingUp, color: 'text-orange-600' }
  ];

  // Filters and Searching
  const filteredDrives = drives.filter(d => 
    d.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
    d.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredApplications = applications.filter(a => 
    a.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    a.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    a.roleName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
      case 'ongoing': return 'bg-green-100 text-green-800';
      case 'completed':
      case 'closed': return 'bg-gray-100 text-gray-800';
      case 'upcoming': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getAppStatusColor = (status: string) => {
    switch (status) {
      case 'applied': return 'bg-blue-100 text-blue-800';
      case 'shortlisted': return 'bg-purple-100 text-purple-800';
      case 'selected': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Add Drive Handler
  const handleAddDriveSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Choose standard logo or fallback
    const logoUrls = [
      'https://images.unsplash.com/photo-1549923746-c502d488f3aa?auto=compress&cs=tinysrgb&w=80',
      'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=compress&cs=tinysrgb&w=80',
      'https://images.unsplash.com/photo-1572021335469-31706a17aaef?auto=compress&cs=tinysrgb&w=80'
    ];
    const randomLogo = logoUrls[Math.floor(Math.random() * logoUrls.length)];

    db.addDrive({
      company: newDriveForm.company,
      role: newDriveForm.role,
      location: newDriveForm.location,
      package: newDriveForm.package,
      deadline: newDriveForm.deadline,
      eligibility: newDriveForm.eligibility,
      status: newDriveForm.status,
      logo: newDriveForm.logo || randomLogo,
      description: newDriveForm.description,
      requirements: newDriveForm.requirements.split(',').map(r => r.trim()).filter(Boolean)
    });

    setAddDriveModalOpen(false);
    setNewDriveForm({
      company: '',
      role: '',
      location: '',
      package: '',
      deadline: '',
      eligibility: '70% throughout',
      status: 'active',
      description: '',
      requirements: '',
      logo: ''
    });
    loadData();
  };

  // Update application status
  const handleUpdateStatus = (appId: string, status: Application['status']) => {
    db.updateApplicationStatus(appId, status);
    setReviewApp(null);
    loadData();
  };

  // Delete drive
  const handleDeleteDrive = (id: number) => {
    if (window.confirm('Are you sure you want to remove this placement drive?')) {
      db.deleteDrive(id);
      loadData();
    }
  };

  const tabs = [
    { id: 'overview', name: 'Overview', icon: BarChart3 },
    { id: 'drives', name: 'Placement Drives', icon: Calendar },
    { id: 'applications', name: 'Student Applications', icon: FileText },
    { id: 'companies', name: 'Companies Directory', icon: Building2 }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">TPO Control Panel</h1>
            <p className="text-gray-600">Manage company placement drives, review student profiles, and track hiring processes.</p>
          </div>
          <div className="flex space-x-3 mt-4 md:mt-0">
            <button 
              onClick={() => setAddDriveModalOpen(true)}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-colors flex items-center font-medium shadow-md"
            >
              <Plus className="h-5 w-5 mr-2" />
              Add Drive
            </button>
            <button 
              onClick={() => {
                const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify({ drives, applications, companies }, null, 2));
                const downloadAnchor = document.createElement('a');
                downloadAnchor.setAttribute("href", dataStr);
                downloadAnchor.setAttribute("download", "placement_report.json");
                document.body.appendChild(downloadAnchor);
                downloadAnchor.click();
                downloadAnchor.remove();
              }}
              className="bg-white border border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-50 transition-colors flex items-center font-medium"
            >
              <Download className="h-5 w-5 mr-2" />
              Export Report
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white p-1.5 rounded-xl shadow-sm mb-8 border border-gray-100 flex overflow-x-auto">
          <nav className="flex space-x-1">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  setSearchTerm('');
                }}
                className={`flex items-center px-5 py-3 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'bg-blue-600 text-white shadow-sm'
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
                <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                  <div className="flex items-center justify-between mb-3">
                    <stat.icon className={`h-8 w-8 ${stat.color}`} />
                    <span className="text-xs text-green-600 font-bold bg-green-50 px-2 py-0.5 rounded">{stat.change}</span>
                  </div>
                  <div className="text-3xl font-extrabold text-gray-900 mb-1">{stat.value}</div>
                  <div className="text-gray-500 text-sm font-medium">{stat.label}</div>
                </div>
              ))}
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              {/* Recent Active Drives */}
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-bold text-gray-900">Current Placement Drives</h3>
                  <button onClick={() => setActiveTab('drives')} className="text-sm font-semibold text-blue-600 hover:underline">View All</button>
                </div>
                <div className="space-y-4">
                  {drives.slice(0, 3).map(drive => {
                    const appsCount = applications.filter(a => a.driveId === drive.id).length;
                    const selectedCount = applications.filter(a => a.driveId === drive.id && a.status === 'selected').length;
                    
                    return (
                      <div key={drive.id} className="flex items-center justify-between p-4 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors">
                        <div>
                          <h4 className="font-bold text-gray-900">{drive.company}</h4>
                          <p className="text-sm text-gray-600">{drive.role} • <span className="font-medium text-blue-600">{drive.package}</span></p>
                          <div className="flex items-center mt-2 space-x-4 text-xs text-gray-500">
                            <span>{appsCount} Applications</span>
                            <span>{selectedCount} Selected</span>
                          </div>
                        </div>
                        <span className={`px-2.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider ${getStatusColor(drive.status)}`}>
                          {drive.status}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Pending Action: Review Applications */}
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-bold text-gray-900">Applications Pending Action</h3>
                  <button onClick={() => setActiveTab('applications')} className="text-sm font-semibold text-blue-600 hover:underline">View All</button>
                </div>
                <div className="space-y-4">
                  {applications.filter(a => a.status === 'applied').slice(0, 3).map(action => (
                    <div key={action.id} className="flex items-center justify-between p-4 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors">
                      <div>
                        <h4 className="font-bold text-gray-900">{action.studentName}</h4>
                        <p className="text-sm text-gray-600">Applied to: <span className="font-medium">{action.companyName} ({action.roleName})</span></p>
                        <p className="text-xs text-gray-400 mt-1">Submitted: {action.appliedDate}</p>
                      </div>
                      <button 
                        onClick={() => setReviewApp(action)}
                        className="bg-blue-50 text-blue-600 px-3 py-1.5 rounded-lg hover:bg-blue-100 transition-colors text-sm font-semibold flex items-center"
                      >
                        <Eye className="h-4 w-4 mr-1" />
                        Review
                      </button>
                    </div>
                  ))}
                  {applications.filter(a => a.status === 'applied').length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                      <CheckCircle className="h-10 w-10 text-green-500 mx-auto mb-2" />
                      <p className="text-sm font-medium">All applications have been processed!</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Drives Tab */}
        {activeTab === 'drives' && (
          <div className="space-y-6">
            {/* Search */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
              <div className="relative flex-1 max-w-lg">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search placement drives..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Drives Table */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr className="border-b border-gray-200">
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Company</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Role</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Applications</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Selected</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-4 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {filteredDrives.map(drive => {
                      const apps = applications.filter(a => a.driveId === drive.id);
                      const selected = apps.filter(a => a.status === 'selected');

                      return (
                        <tr key={drive.id} className="hover:bg-gray-50 transition-colors">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <img 
                                src={drive.logo} 
                                alt={drive.company}
                                className="w-10 h-10 rounded-lg object-cover mr-3 border border-gray-200"
                              />
                              <div>
                                <div className="font-bold text-gray-900">{drive.company}</div>
                                <div className="text-sm text-gray-500">{drive.package}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-gray-800 font-medium">{drive.role}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-gray-900">{apps.length} candidates</td>
                          <td className="px-6 py-4 whitespace-nowrap text-green-600 font-bold">{selected.length} students</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold uppercase tracking-wider ${getStatusColor(drive.status)}`}>
                              {drive.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                            <button 
                              onClick={() => handleDeleteDrive(drive.id)}
                              className="text-red-600 hover:text-red-900 p-2 hover:bg-red-50 rounded-lg transition-colors inline-flex"
                            >
                              <Trash2 className="h-5 w-5" />
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Applications Tab */}
        {activeTab === 'applications' && (
          <div className="space-y-6">
            {/* Search */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
              <div className="relative flex-1 max-w-lg">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search students, companies or status..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Applications Table */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr className="border-b border-gray-200">
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Student</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Job Applied</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">GPA</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Skills</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Date</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-4 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider">Review</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {filteredApplications.map(app => (
                      <tr key={app.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="font-bold text-gray-900">{app.studentName}</div>
                            <div className="text-xs text-gray-500">{app.studentEmail}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="font-medium text-gray-800">{app.companyName}</div>
                          <div className="text-xs text-gray-500">{app.roleName}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-gray-700 font-semibold">{app.gpa}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex flex-wrap gap-1 max-w-xs">
                            {app.skills.split(',').slice(0, 3).map((s, i) => (
                              <span key={i} className="px-1.5 py-0.5 bg-gray-100 text-gray-700 text-xs rounded">
                                {s.trim()}
                              </span>
                            ))}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-gray-500 text-sm">{app.appliedDate}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold uppercase tracking-wider ${getAppStatusColor(app.status)}`}>
                            {app.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-center">
                          <button 
                            onClick={() => setReviewApp(app)}
                            className="bg-blue-50 text-blue-600 hover:bg-blue-100 p-2 rounded-lg transition-colors inline-flex"
                          >
                            <Eye className="h-4 w-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Companies Directory Tab */}
        {activeTab === 'companies' && (
          <div className="grid md:grid-cols-2 gap-6">
            {companies.map(comp => (
              <div key={comp.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-start space-x-4">
                <img 
                  src={comp.logo} 
                  alt={comp.name} 
                  className="w-16 h-16 rounded-xl object-cover bg-gray-100 border border-gray-200"
                />
                <div>
                  <h3 className="text-xl font-bold text-gray-900">{comp.name}</h3>
                  <p className="text-sm text-blue-600 font-semibold mb-2">{comp.industry}</p>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{comp.description}</p>
                  <div className="grid grid-cols-2 gap-2 text-xs text-gray-500">
                    <div>Employees: <span className="font-semibold text-gray-800">{comp.employees}</span></div>
                    <div>Average Package: <span className="font-semibold text-green-600">{comp.packageRange}</span></div>
                    <div>Rating: <span className="font-semibold text-yellow-500">★ {comp.rating}</span></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Add Drive Modal */}
      {addDriveModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-gray-100">
            <div className="p-6 border-b border-gray-200 flex justify-between items-center bg-gradient-to-r from-blue-50 to-purple-50">
              <div>
                <h3 className="text-xl font-bold text-gray-900">Create Placement Drive</h3>
                <p className="text-sm text-gray-600">Register a new company hiring drive on the portal</p>
              </div>
              <button 
                onClick={() => setAddDriveModalOpen(false)}
                className="p-1.5 hover:bg-gray-200 rounded-full transition-colors"
              >
                <X className="h-6 w-6 text-gray-500" />
              </button>
            </div>

            <form onSubmit={handleAddDriveSubmit} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Company Name</label>
                  <input 
                    type="text" 
                    required
                    placeholder="e.g. Netflix"
                    value={newDriveForm.company}
                    onChange={(e) => setNewDriveForm({...newDriveForm, company: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Role Title</label>
                  <input 
                    type="text" 
                    required
                    placeholder="e.g. SDE Backend"
                    value={newDriveForm.role}
                    onChange={(e) => setNewDriveForm({...newDriveForm, role: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Location</label>
                  <input 
                    type="text" 
                    required
                    placeholder="e.g. Bangalore"
                    value={newDriveForm.location}
                    onChange={(e) => setNewDriveForm({...newDriveForm, location: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Package Range</label>
                  <input 
                    type="text" 
                    required
                    placeholder="e.g. 18-22 LPA"
                    value={newDriveForm.package}
                    onChange={(e) => setNewDriveForm({...newDriveForm, package: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Application Deadline</label>
                  <input 
                    type="date" 
                    required
                    value={newDriveForm.deadline}
                    onChange={(e) => setNewDriveForm({...newDriveForm, deadline: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Min. CGPA / Eligibility</label>
                  <input 
                    type="text" 
                    required
                    placeholder="e.g. 70% throughout"
                    value={newDriveForm.eligibility}
                    onChange={(e) => setNewDriveForm({...newDriveForm, eligibility: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Status</label>
                  <select
                    value={newDriveForm.status}
                    onChange={(e) => setNewDriveForm({...newDriveForm, status: e.target.value as any})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                  >
                    <option value="active">Active</option>
                    <option value="upcoming">Upcoming</option>
                    <option value="closed">Closed</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Custom Logo Image URL</label>
                  <input 
                    type="url" 
                    placeholder="https://example.com/logo.png"
                    value={newDriveForm.logo}
                    onChange={(e) => setNewDriveForm({...newDriveForm, logo: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Job Description</label>
                <textarea 
                  rows={3}
                  required
                  placeholder="Explain responsibilities, work scope..."
                  value={newDriveForm.description}
                  onChange={(e) => setNewDriveForm({...newDriveForm, description: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Key Requirements (Comma-separated)</label>
                <input 
                  type="text" 
                  placeholder="React, AWS, Node, Strong Communication"
                  value={newDriveForm.requirements}
                  onChange={(e) => setNewDriveForm({...newDriveForm, requirements: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="flex space-x-3 pt-4 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setAddDriveModalOpen(false)}
                  className="flex-1 py-2.5 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-lg hover:from-blue-700 hover:to-purple-700 transition-colors"
                >
                  Publish Opportunity
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Review Student Application Modal */}
      {reviewApp && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full overflow-hidden shadow-2xl border border-gray-100">
            <div className="p-6 border-b border-gray-200 flex justify-between items-center bg-gradient-to-r from-blue-50 to-purple-50">
              <div>
                <h3 className="text-xl font-bold text-gray-900">Review Candidate</h3>
                <p className="text-sm text-gray-600">Application ID: {reviewApp.id}</p>
              </div>
              <button 
                onClick={() => setReviewApp(null)}
                className="p-1.5 hover:bg-gray-200 rounded-full transition-colors"
              >
                <X className="h-6 w-6 text-gray-500" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              <div className="space-y-3">
                <div className="flex justify-between border-b border-gray-100 pb-2">
                  <span className="text-gray-500 text-sm">Student Name</span>
                  <span className="font-bold text-gray-800">{reviewApp.studentName}</span>
                </div>
                <div className="flex justify-between border-b border-gray-100 pb-2">
                  <span className="text-gray-500 text-sm">Email Address</span>
                  <span className="font-semibold text-gray-700">{reviewApp.studentEmail}</span>
                </div>
                <div className="flex justify-between border-b border-gray-100 pb-2">
                  <span className="text-gray-500 text-sm">College Name</span>
                  <span className="font-semibold text-gray-700">{reviewApp.studentCollege}</span>
                </div>
                <div className="flex justify-between border-b border-gray-100 pb-2">
                  <span className="text-gray-500 text-sm">Academic GPA</span>
                  <span className="font-bold text-blue-600">{reviewApp.gpa}</span>
                </div>
                <div className="border-b border-gray-100 pb-3">
                  <span className="text-gray-500 text-sm block mb-1">Key Skills</span>
                  <div className="flex flex-wrap gap-1">
                    {reviewApp.skills.split(',').map((skill, index) => (
                      <span key={index} className="px-2 py-0.5 bg-blue-50 text-blue-700 text-xs rounded-full font-medium">
                        {skill.trim()}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-500 text-sm">Resume Portfolio</span>
                  <a 
                    href={reviewApp.resumeLink} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-600 font-semibold text-sm hover:underline flex items-center"
                  >
                    <FileText className="h-4 w-4 mr-1" />
                    Open PDF Resume
                  </a>
                </div>
              </div>

              <div className="pt-4 space-y-2">
                <p className="text-sm font-semibold text-gray-700 mb-2">Update Application Status:</p>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    onClick={() => handleUpdateStatus(reviewApp.id, 'shortlisted')}
                    className="py-2 bg-purple-50 text-purple-700 border border-purple-200 rounded-lg text-xs font-bold hover:bg-purple-100 transition-colors"
                  >
                    Shortlist
                  </button>
                  <button
                    onClick={() => handleUpdateStatus(reviewApp.id, 'selected')}
                    className="py-2 bg-green-50 text-green-700 border border-green-200 rounded-lg text-xs font-bold hover:bg-green-100 transition-colors"
                  >
                    Approve / Select
                  </button>
                  <button
                    onClick={() => handleUpdateStatus(reviewApp.id, 'rejected')}
                    className="py-2 bg-red-50 text-red-700 border border-red-200 rounded-lg text-xs font-bold hover:bg-red-100 transition-colors"
                  >
                    Reject
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default TPOPanel;