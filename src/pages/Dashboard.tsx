import React, { useState, useEffect } from 'react';
import CompanyDetailsModal from '../components/CompanyDetailsModal';
import { db, Drive, Application } from '../lib/db';
import { 
  Building2, 
  Calendar, 
  MapPin, 
  Filter, 
  Search,
  Star,
  Users,
  Briefcase,
  TrendingUp,
  X,
  FileText,
  CheckCircle,
  Clock,
  AlertCircle
} from 'lucide-react';

interface DashboardProps {
  userRole: 'student' | 'alumni' | 'tpo' | null;
}

const Dashboard: React.FC<DashboardProps> = ({ userRole }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [selectedCompany, setSelectedCompany] = useState<Drive | null>(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  
  // Database States
  const [drives, setDrives] = useState<Drive[]>([]);
  const [applications, setApplications] = useState<Application[]>([]);
  
  // Application Modal State
  const [applyModalOpen, setApplyModalOpen] = useState(false);
  const [activeApplyDrive, setActiveApplyDrive] = useState<Drive | null>(null);
  const [applyForm, setApplyForm] = useState({
    name: 'Aman Varma',
    email: 'aman@example.com',
    college: 'ANITS',
    gpa: '8.4 CGPA',
    skills: 'React, Node.js, Python, SQL',
    resumeLink: 'https://drive.google.com/file/d/sample-resume/view'
  });
  const [applySuccess, setApplySuccess] = useState(false);

  // Load drives and applications
  const loadData = () => {
    setDrives(db.getDrives());
    setApplications(db.getApplications());
  };

  useEffect(() => {
    loadData();
  }, []);

  // Compute dynamic stats
  const activeDrivesCount = drives.filter(d => d.status === 'active').length;
  const myApplications = applications.filter(a => a.studentEmail === 'aman@example.com');
  const interviewSessions = db.getSessions().filter(s => s.studentEmail === 'aman@example.com' && s.status === 'confirmed');
  const selectedCount = myApplications.filter(a => a.status === 'selected').length;
  const successRate = myApplications.length > 0 
    ? Math.round((selectedCount / myApplications.length) * 100) 
    : 0;

  const quickStats = [
    { label: 'Active Drives', value: activeDrivesCount.toString(), icon: Briefcase, color: 'text-blue-600' },
    { label: 'My Applications', value: myApplications.length.toString(), icon: Users, color: 'text-green-600' },
    { label: 'Confirmed Interviews', value: interviewSessions.length.toString(), icon: Calendar, color: 'text-purple-600' },
    { label: 'Success Rate', value: `${successRate}%`, icon: TrendingUp, color: 'text-orange-600' }
  ];

  // Filtered drives based on search and filter
  const filteredDrives = drives.filter((drive) => {
    const matchesSearch =
      drive.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      drive.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
      drive.location.toLowerCase().includes(searchTerm.toLowerCase());

    const hasApplied = myApplications.some(app => app.driveId === drive.id);

    if (selectedFilter === 'all') {
      return matchesSearch;
    } else if (selectedFilter === 'applied') {
      return matchesSearch && hasApplied;
    } else {
      return matchesSearch && drive.status === selectedFilter;
    }
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'upcoming': return 'bg-blue-100 text-blue-800';
      case 'closed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleViewDetails = (drive: Drive) => {
    setSelectedCompany(drive);
    setIsDetailsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsDetailsModalOpen(false);
    setSelectedCompany(null);
  };

  const openApplyModal = (drive: Drive) => {
    setActiveApplyDrive(drive);
    setApplyModalOpen(true);
    setApplySuccess(false);
  };

  const handleApplySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeApplyDrive) return;

    db.applyToDrive({
      driveId: activeApplyDrive.id,
      companyName: activeApplyDrive.company,
      roleName: activeApplyDrive.role,
      studentName: applyForm.name,
      studentEmail: applyForm.email,
      studentCollege: applyForm.college,
      gpa: applyForm.gpa,
      skills: applyForm.skills,
      resumeLink: applyForm.resumeLink
    });

    setApplySuccess(true);
    setTimeout(() => {
      setApplyModalOpen(false);
      loadData();
    }, 1500);
  };

  if (!userRole) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center p-8 bg-white rounded-2xl shadow-md border border-gray-100 max-w-md">
          <AlertCircle className="h-16 w-16 text-blue-600 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Please Select Your Role</h2>
          <p className="text-gray-600 mb-6">Choose your role (Student, Alumni, or TPO) from the header navigation to access your personalized dashboard.</p>
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
          <p className="text-gray-600">Track your placement journey, interview schedules, and explore active job drives.</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          {quickStats.map((stat, index) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100">
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

        {/* Main Section Tabs & Filter */}
        <div className="bg-white p-6 rounded-xl shadow-sm mb-8 border border-gray-100">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex-1 w-full relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search companies, roles, locations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>
            <div className="flex gap-2 w-full md:w-auto">
              <select
                value={selectedFilter}
                onChange={(e) => setSelectedFilter(e.target.value)}
                className="w-full md:w-auto px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all bg-white"
              >
                <option value="all">All Opportunities</option>
                <option value="active">Active Drives</option>
                <option value="upcoming">Upcoming Drives</option>
                <option value="applied">Applied Jobs</option>
              </select>
              <button className="flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                <Filter className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Dynamic Display (List / Grid) */}
        {filteredDrives.length === 0 ? (
          <div className="bg-white text-center py-16 rounded-xl shadow-sm border border-gray-100">
            <Briefcase className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No Drives Found</h3>
            <p className="text-gray-600">Try adjusting your filters or search query to find other opportunities.</p>
          </div>
        ) : (
          <div className="grid lg:grid-cols-2 gap-6">
            {filteredDrives.map((drive) => {
              const app = myApplications.find(a => a.driveId === drive.id);
              const isApplied = !!app;

              return (
                <div key={drive.id} className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-shadow border border-gray-100 overflow-hidden">
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-4">
                        <img 
                          src={drive.logo || 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=compress&cs=tinysrgb&w=80'} 
                          alt={drive.company}
                          className="w-16 h-16 rounded-lg object-cover bg-gray-100 border border-gray-200"
                        />
                        <div>
                          <h3 className="text-xl font-bold text-gray-900">{drive.company}</h3>
                          <p className="text-gray-600 font-medium">{drive.role}</p>
                        </div>
                      </div>
                      <div className="flex flex-col items-end space-y-2">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider ${getStatusColor(drive.status)}`}>
                          {drive.status}
                        </span>
                        {isApplied && (
                          <span className={`px-2 py-0.5 rounded text-xs font-semibold uppercase tracking-wider ${
                            app.status === 'selected' ? 'bg-green-100 text-green-800' :
                            app.status === 'shortlisted' ? 'bg-purple-100 text-purple-800' :
                            app.status === 'rejected' ? 'bg-red-100 text-red-800' :
                            'bg-blue-100 text-blue-800'
                          }`}>
                            {app.status}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-6 bg-gray-50 p-4 rounded-lg text-sm text-gray-600">
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-2 text-gray-400" />
                        <span>{drive.location}</span>
                      </div>
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                        <span>Deadline: {drive.deadline}</span>
                      </div>
                      <div className="flex items-center">
                        <Star className="h-4 w-4 mr-2 text-yellow-500" />
                        <span className="font-semibold text-gray-800">{drive.package}</span>
                      </div>
                      <div className="flex items-center">
                        <Users className="h-4 w-4 mr-2 text-gray-400" />
                        <span>Eligibility: {drive.eligibility}</span>
                      </div>
                    </div>

                    <div className="flex space-x-3">
                      {isApplied ? (
                        <button
                          disabled
                          className="flex-1 bg-gray-100 text-gray-400 py-2.5 px-4 rounded-lg font-medium cursor-not-allowed flex items-center justify-center"
                        >
                          <CheckCircle className="h-5 w-5 mr-2 text-green-500" />
                          Applied
                        </button>
                      ) : (
                        <button
                          onClick={() => openApplyModal(drive)}
                          disabled={drive.status === 'closed'}
                          className={`flex-1 py-2.5 px-4 rounded-lg font-medium text-white transition-colors text-center ${
                            drive.status === 'closed' 
                              ? 'bg-gray-300 cursor-not-allowed'
                              : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700'
                          }`}
                        >
                          Apply Now
                        </button>
                      )}
                      <button 
                        onClick={() => handleViewDetails(drive)}
                        className="px-4 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-gray-700 font-medium"
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Load More */}
        <div className="text-center mt-8">
          <button className="bg-white border border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-50 transition-colors font-medium">
            Load More Drives
          </button>
        </div>
      </div>

      {/* Apply Modal */}
      {applyModalOpen && activeApplyDrive && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full overflow-hidden shadow-2xl animate-fade-in border border-gray-100">
            <div className="p-6 border-b border-gray-200 flex justify-between items-center bg-gradient-to-r from-blue-50 to-purple-50">
              <div>
                <h3 className="text-xl font-bold text-gray-900">Application Form</h3>
                <p className="text-sm text-gray-600">{activeApplyDrive.company} — {activeApplyDrive.role}</p>
              </div>
              <button 
                onClick={() => setApplyModalOpen(false)}
                className="p-1.5 hover:bg-gray-200 rounded-full transition-colors"
              >
                <X className="h-6 w-6 text-gray-500" />
              </button>
            </div>

            <form onSubmit={handleApplySubmit} className="p-6 space-y-4">
              {applySuccess ? (
                <div className="text-center py-8">
                  <div className="bg-green-100 text-green-600 p-3 rounded-full w-fit mx-auto mb-4">
                    <CheckCircle className="h-12 w-12" />
                  </div>
                  <h4 className="text-lg font-bold text-gray-900 mb-1">Applied Successfully!</h4>
                  <p className="text-gray-600 text-sm">Your application has been registered and is pending TPO review.</p>
                </div>
              ) : (
                <>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Full Name</label>
                    <input 
                      type="text" 
                      required
                      value={applyForm.name}
                      onChange={(e) => setApplyForm({...applyForm, name: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Email Address</label>
                    <input 
                      type="email" 
                      required
                      value={applyForm.email}
                      onChange={(e) => setApplyForm({...applyForm, email: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">College</label>
                      <input 
                        type="text" 
                        required
                        value={applyForm.college}
                        onChange={(e) => setApplyForm({...applyForm, college: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">GPA / Percentage</label>
                      <input 
                        type="text" 
                        required
                        placeholder="e.g. 8.4 CGPA or 82%"
                        value={applyForm.gpa}
                        onChange={(e) => setApplyForm({...applyForm, gpa: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Skills</label>
                    <input 
                      type="text" 
                      required
                      placeholder="e.g. React, Node.js, SQL"
                      value={applyForm.skills}
                      onChange={(e) => setApplyForm({...applyForm, skills: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Resume Link (Google Drive/Dropbox)</label>
                    <div className="relative">
                      <FileText className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input 
                        type="url" 
                        required
                        placeholder="https://drive.google.com/..."
                        value={applyForm.resumeLink}
                        onChange={(e) => setApplyForm({...applyForm, resumeLink: e.target.value})}
                        className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  <div className="flex space-x-3 pt-4">
                    <button
                      type="button"
                      onClick={() => setApplyModalOpen(false)}
                      className="flex-1 py-2.5 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="flex-1 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-lg hover:from-blue-700 hover:to-purple-700 transition-colors"
                    >
                      Submit Application
                    </button>
                  </div>
                </>
              )}
            </form>
          </div>
        </div>
      )}

      {/* Company Details Modal */}
      {selectedCompany && (
        <CompanyDetailsModal
          company={{
            id: selectedCompany.id,
            company: selectedCompany.company,
            role: selectedCompany.role,
            location: selectedCompany.location,
            package: selectedCompany.package,
            deadline: selectedCompany.deadline,
            eligibility: selectedCompany.eligibility,
            status: selectedCompany.status
          }}
          isOpen={isDetailsModalOpen}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default Dashboard;