import React, { useEffect, useState } from 'react';
import { db, Company } from '../lib/db';
import { Building2, MapPin, Trash2, Calendar, Star, TrendingUp, Users } from 'lucide-react';

const SavedCompanies = () => {
  const [saved, setSaved] = useState<Company[]>([]);

  const loadData = () => {
    setSaved(db.getSavedCompanies());
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleRemove = (id: number) => {
    db.removeSavedCompany(id);
    loadData();
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Saved Companies</h1>
          <p className="text-gray-600">Track and manage companies you are interested in for future applications.</p>
        </div>

        {saved.length === 0 ? (
          <div className="bg-white text-center py-16 rounded-xl shadow-sm border border-gray-100">
            <Building2 className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No Saved Companies</h3>
            <p className="text-gray-600">Explore the Company Directory and bookmark companies to save them here.</p>
          </div>
        ) : (
          <div className="grid gap-6">
            {saved.map((company) => (
              <div key={company.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden p-6 md:flex md:items-center md:justify-between hover:shadow-md transition-shadow">
                <div className="flex items-center space-x-4 mb-4 md:mb-0">
                  <img 
                    src={company.logo} 
                    alt={company.name} 
                    className="w-16 h-16 rounded-xl object-cover bg-gray-100 border border-gray-200"
                  />
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">{company.name}</h2>
                    <p className="text-sm text-blue-600 font-semibold mb-1">{company.industry}</p>
                    <div className="flex items-center space-x-3 text-xs text-gray-500">
                      <div className="flex items-center">
                        <MapPin className="h-3.5 w-3.5 mr-1" />
                        <span>{company.location}</span>
                      </div>
                      <div className="flex items-center">
                        <Star className="h-3.5 w-3.5 text-yellow-500 mr-1" />
                        <span>{company.rating}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-4 items-center text-xs text-gray-600 mb-4 md:mb-0 md:bg-gray-50 md:p-3 md:rounded-lg">
                  <div className="flex items-center">
                    <TrendingUp className="h-4 w-4 mr-1 text-green-500" />
                    <span>LPA: {company.packageRange}</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1 text-gray-400" />
                    <span>Hiring: {company.hiringFrequency}</span>
                  </div>
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-1 text-gray-400" />
                    <span>Openings: {company.openPositions}</span>
                  </div>
                </div>

                <div>
                  <button
                    onClick={() => handleRemove(company.id)}
                    className="w-full md:w-auto px-4 py-2 border border-red-200 text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors font-semibold text-sm flex items-center justify-center"
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SavedCompanies;