import React, { useState, useEffect } from 'react';
import CompanyDetailsModal from '../components/CompanyDetailsModal';
import { db, Company } from '../lib/db';
import { 
  Building2, 
  MapPin, 
  Users, 
  Star, 
  Search, 
  Filter,
  TrendingUp,
  Calendar,
  ChevronRight,
  Bookmark
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
  const [companies, setCompanies] = useState<Company[]>([]);
  const [savedCompanyIds, setSavedCompanyIds] = useState<number[]>([]);

  const loadData = () => {
    setCompanies(db.getCompanies());
    const saved = db.getSavedCompanies();
    setSavedCompanyIds(saved.map(c => c.id));
  };

  useEffect(() => {
    loadData();
  }, []);

  const industries = ['all', 'Technology', 'E-commerce', 'IT Services', 'Finance', 'Healthcare'];

  const filteredCompanies = companies.filter(company => {
    const matchesSearch = company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         company.industry.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesIndustry = selectedIndustry === 'all' || company.industry === selectedIndustry;
    return matchesSearch && matchesIndustry;
  });

  const handleSaveCompany = (e: React.MouseEvent, company: Company) => {
    e.stopPropagation();
    db.saveCompany(company);
    alert(`${company.name} saved for later!`);
    loadData();
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Company Directory</h1>
          <p className="text-gray-600">Explore top companies, check their compensation packages, and see dynamic eligibility criteria.</p>
        </div>

        {/* Search and Filter */}
        <div className="bg-white p-6 rounded-xl shadow-sm mb-8 border border-gray-100">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search companies..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>
            <div className="flex gap-2">
              <select
                value={selectedIndustry}
                onChange={(e) => setSelectedIndustry(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              >
                {industries.map(industry => (
                  <option key={industry} value={industry}>
                    {industry === 'all' ? 'All Industries' : industry}
                  </option>
                ))}
              </select>
              <button className="flex items-center px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                <Filter className="h-5 w-5 mr-2 text-gray-500" />
                Filters
              </button>
            </div>
          </div>
        </div>

        {/* Companies Grid */}
        <div className="grid lg:grid-cols-2 gap-6">
          {filteredCompanies.map((company) => {
            const isSaved = savedCompanyIds.includes(company.id);

            return (
              <div key={company.id} className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-shadow border border-gray-100 overflow-hidden flex flex-col justify-between">
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-4">
                      <img 
                        src={company.logo} 
                        alt={company.name} 
                        className="w-16 h-16 rounded-xl object-cover bg-gray-100 border border-gray-200"
                      />
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">{company.name}</h3>
                        <p className="text-sm text-blue-600 font-medium">{company.industry}</p>
                        <div className="flex items-center mt-1 text-xs text-gray-500">
                          <Star className="h-3.5 w-3.5 text-yellow-500 mr-1" />
                          <span className="font-semibold text-gray-700">{company.rating}</span>
                        </div>
                      </div>
                    </div>
                    <button 
                      onClick={(e) => handleSaveCompany(e, company)}
                      disabled={isSaved}
                      className={`p-2 rounded-lg border transition-all ${
                        isSaved 
                          ? 'bg-green-50 text-green-600 border-green-200' 
                          : 'hover:bg-gray-100 border-gray-200 text-gray-400'
                      }`}
                      title={isSaved ? "Saved" : "Save for Later"}
                    >
                      <Bookmark className="h-5 w-5 fill-current" />
                    </button>
                  </div>

                  <p className="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed">{company.description}</p>

                  <div className="grid grid-cols-2 gap-3 mb-4 text-xs text-gray-500 bg-gray-50 p-3 rounded-lg">
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-1.5 text-gray-400" />
                      <span>{company.location}</span>
                    </div>
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-1.5 text-gray-400" />
                      <span>{company.employees} Employees</span>
                    </div>
                    <div className="flex items-center">
                      <TrendingUp className="h-4 w-4 mr-1.5 text-green-500" />
                      <span>Avg Package: {company.packageRange}</span>
                    </div>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1.5 text-gray-400" />
                      <span>Hiring: {company.hiringFrequency}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between py-2 border-t border-b border-gray-100 text-center mb-6">
                    <div>
                      <div className="text-lg font-bold text-gray-900">{company.openPositions}</div>
                      <div className="text-xs text-gray-500">Open Positions</div>
                    </div>
                    <div>
                      <div className="text-lg font-bold text-gray-900">{company.recentHires}</div>
                      <div className="text-xs text-gray-500">Recent Hires</div>
                    </div>
                    <div>
                      <div className="text-lg font-bold text-green-600">{company.eligibility}</div>
                      <div className="text-xs text-gray-500">Eligibility</div>
                    </div>
                  </div>
                </div>

                <div className="p-6 pt-0 border-t border-gray-100 flex space-x-3 bg-gray-50 bg-opacity-30">
                  <button
                    className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 px-4 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-colors font-semibold text-sm shadow-sm"
                    onClick={() => setSelectedCompany({ 
                      id: company.id, 
                      company: company.name, 
                      role: company.industry, 
                      package: company.packageRange, 
                      deadline: company.hiringFrequency, 
                      eligibility: company.eligibility, 
                      status: 'active', 
                      location: company.location 
                    })}
                  >
                    View Details
                  </button>
                  <a
                    href="https://grow.google/certificates/interview-warmup/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors text-center font-semibold text-sm flex items-center justify-center"
                  >
                    Apply Now
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {/* Load More */}
        <div className="text-center mt-8">
          <button className="bg-white border border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-50 transition-colors font-medium">
            Load More Companies
          </button>
        </div>
      </div>

      {/* Details Modal (Moved outside loop to prevent modal duplication error) */}
      {selectedCompany && (
        <CompanyDetailsModal
          isOpen={!!selectedCompany}
          onClose={() => setSelectedCompany(null)}
          company={selectedCompany}
        />
      )}
    </div>
  );
};

export default Companies;