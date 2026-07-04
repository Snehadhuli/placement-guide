import React, { useState } from 'react';
import CompanyDetailsModal from '../components/CompanyDetailsModal';
import { 
  Building2, 
  MapPin, 
  Users, 
  Star, 
  Search, 
  Filter,
  TrendingUp,

  Calendar,
  ChevronRight
} from 'lucide-react';

const Companies = () => {
  const [selectedCompany, setSelectedCompany] = useState<{
    id: number;
    company: string;
    role: string;
    location: string;
    package: string;
    deadline: string;
    eligibility: string;
    status: string;
  } | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedIndustry, setSelectedIndustry] = useState('all');

  const companies = [
    {
      id: 1,
      name: 'Google',
      industry: 'Technology',
      location: 'Multiple Locations',
      employees: '50,000+',
      rating: 4.8,
      packageRange: '15-50 LPA',
      hiringFrequency: 'Quarterly',
      eligibility: '70% throughout',
      openPositions: 12,
      description: 'Leading technology company focused on search, cloud computing, and AI.',
      recentHires: 45,
      logo: '/api/placeholder/80/80'
    },
    {
      id: 2,
      name: 'Microsoft',
      industry: 'Technology',
      location: 'Hyderabad, Bangalore',
      employees: '30,000+',
      rating: 4.7,
      packageRange: '12-45 LPA',
      hiringFrequency: 'Quarterly',
      eligibility: '75% throughout',
      openPositions: 8,
      description: 'Global technology company developing software, services, and solutions.',
      recentHires: 38,
      logo: '/api/placeholder/80/80'
    },
    {
      id: 3,
      name: 'Amazon',
      industry: 'E-commerce',
      location: 'Mumbai, Bangalore',
      employees: '25,000+',
      rating: 4.5,
      packageRange: '10-40 LPA',
      hiringFrequency: 'Bi-annual',
      eligibility: '65% throughout',
      openPositions: 15,
      description: 'E-commerce and cloud computing giant with diverse opportunities.',
      recentHires: 52,
      logo: '/api/placeholder/80/80'
    },
    {
      id: 4,
      name: 'Tata Consultancy Services',
      industry: 'IT Services',
      location: 'Pan India',
      employees: '100,000+',
      rating: 4.2,
      packageRange: '6-25 LPA',
      hiringFrequency: 'Monthly',
      eligibility: '60% throughout',
      openPositions: 200,
      description: 'Leading IT services and consulting company with global presence.',
      recentHires: 180,
      logo: '/api/placeholder/80/80'
    },
    {
      id: 5,
      name: 'Wipro',
      industry: 'IT Services',
      location: 'Bangalore, Pune',
      employees: '75,000+',
      rating: 4.1,
      packageRange: '5-22 LPA',
      hiringFrequency: 'Monthly',
      eligibility: '60% throughout',
      openPositions: 150,
      description: 'Global IT services company specializing in digital transformation.',
      recentHires: 125,
      logo: '/api/placeholder/80/80'
    },
    {
      id: 6,
      name: 'Infosys',
      industry: 'IT Services',
      location: 'Mysore, Bangalore',
      employees: '80,000+',
      rating: 4.3,
      packageRange: '7-30 LPA',
      hiringFrequency: 'Quarterly',
      eligibility: '65% throughout',
      openPositions: 120,
      description: 'Pioneer in next-generation digital services and consulting.',
      recentHires: 95,
      logo: '/api/placeholder/80/80'
    }
  ];

  const industries = ['all', 'Technology', 'E-commerce', 'IT Services', 'Finance', 'Healthcare'];

  const filteredCompanies = companies.filter(company => {
    const matchesSearch = company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         company.industry.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesIndustry = selectedIndustry === 'all' || company.industry === selectedIndustry;
    return matchesSearch && matchesIndustry;
  });

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Company Directory</h1>
          <p className="text-gray-600">Explore top companies and their hiring opportunities</p>
        </div>

        {/* Search and Filter */}
        <div className="bg-white p-6 rounded-xl shadow-sm mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search companies..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex gap-2">
              <select
                value={selectedIndustry}
                onChange={(e) => setSelectedIndustry(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {industries.map(industry => (
                  <option key={industry} value={industry}>
                    {industry === 'all' ? 'All Industries' : industry}
                  </option>
                ))}
              </select>
              <button className="flex items-center px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50">
                <Filter className="h-5 w-5 mr-2" />
                More Filters
              </button>
            </div>
          </div>
        </div>

        {/* Companies Grid */}
        <div className="grid lg:grid-cols-2 gap-6">
          {filteredCompanies.map((company) => (
            <div key={company.id} className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-shadow border border-gray-100">
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
                      <Building2 className="h-8 w-8 text-gray-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900">{company.name}</h3>
                      <p className="text-gray-600">{company.industry}</p>
                      <div className="flex items-center mt-1">
                        <Star className="h-4 w-4 text-yellow-400 mr-1" />
                        <span className="text-sm text-gray-600">{company.rating}</span>
                      </div>
                    </div>
                  </div>
                  <button className="p-2 hover:bg-gray-50 rounded-lg">
                    <ChevronRight className="h-5 w-5 text-gray-400" />
                  </button>
                </div>

                <p className="text-gray-600 mb-4 line-clamp-2">{company.description}</p>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="flex items-center text-gray-600">
                    <MapPin className="h-4 w-4 mr-2" />
                    <span className="text-sm">{company.location}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Users className="h-4 w-4 mr-2" />
                    <span className="text-sm">{company.employees}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <TrendingUp className="h-4 w-4 mr-2 text-green-600" />
                    <span className="text-sm">{company.packageRange}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span className="text-sm">{company.hiringFrequency}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between mb-6">
                  <div className="text-center">
                    <div className="text-lg font-semibold text-gray-900">{company.openPositions}</div>
                    <div className="text-sm text-gray-600">Open Positions</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-semibold text-gray-900">{company.recentHires}</div>
                    <div className="text-sm text-gray-600">Recent Hires</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-semibold text-green-600">{company.eligibility}</div>
                    <div className="text-sm text-gray-600">Min. Eligibility</div>
                  </div>
                </div>

                <div className="flex space-x-3">
                  <button
                    className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 px-4 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-colors"
                    onClick={() => setSelectedCompany({ ...company, company: company.name, role: company.industry, package: company.packageRange, deadline: company.hiringFrequency, eligibility: company.eligibility, status: 'active', location: company.location })}
                  >
                    View Openings
                  </button>
                  <a
                    href="https://grow.google/certificates/interview-warmup/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors text-center"
                  >
                    Apply Now
                  </a>
                  <button
                    className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                    onClick={() => setSelectedCompany({ ...company, company: company.name, role: company.industry, package: company.packageRange, deadline: company.hiringFrequency, eligibility: company.eligibility, status: 'active', location: company.location })}
                  >
                    Company Profile
                  </button>
      {/* Details Modal */}
      {selectedCompany && (
        <CompanyDetailsModal
          isOpen={!!selectedCompany}
          onClose={() => setSelectedCompany(null)}
          company={selectedCompany}
        />
      )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-8">
          <button className="bg-white border border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-50 transition-colors">
            Load More Companies
          </button>
        </div>
      </div>
    </div>
  );
};

export default Companies;