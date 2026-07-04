import React from 'react';
import { 
  X, 
  Building2, 
  MapPin, 
  Users, 
  Star, 
  Calendar,
  TrendingUp,
  Award,
  Globe,
  Clock,
  CheckCircle,
  Target,
  Briefcase,
  GraduationCap
} from 'lucide-react';

// Define a specific type for the detailed company data to replace 'any'
interface CompanyDetails {
  description: string;
  founded: string;
  headquarters: string;
  employees: string;
  website: string;
  industry: string;
  revenue: string;
  rating: number;
  culture: string[];
  benefits: string[];
  hiringProcess: string[];
  requirements: string[];
  recentNews: string[];
}

interface CompanyDetailsModalProps {
  company: {
    id: number;
    company: string;
    role: string;
    location: string;
    package: string;
    deadline: string;
    eligibility: string;
    status: string;
  };
  isOpen: boolean;
  onClose: () => void;
}

const CompanyDetailsModal: React.FC<CompanyDetailsModalProps> = ({ company, isOpen, onClose }) => {
  if (!isOpen) return null;

  // Extended company data based on the company name
  const getCompanyDetails = (companyName: string): CompanyDetails => {
    // Use Record<string, CompanyDetails> for a strongly-typed dictionary
    const companyData: Record<string, CompanyDetails> = {
      'Google': {
        description: 'Google LLC is an American multinational technology company that specializes in Internet-related services and products, which include online advertising technologies, a search engine, cloud computing, software, and hardware.',
        founded: '1998',
        headquarters: 'Mountain View, California',
        employees: '156,000+',
        website: 'www.google.com',
        industry: 'Technology',
        revenue: '$282.8 billion',
        rating: 4.4,
        culture: [
          'Innovation-driven environment',
          'Work-life balance focus',
          'Collaborative team culture',
          'Learning and development opportunities'
        ],
        benefits: [
          'Comprehensive health insurance',
          'Free meals and snacks',
          'Flexible working hours',
          'Stock options',
          'Professional development budget',
          'Parental leave'
        ],
        hiringProcess: [
          'Online Application',
          'Phone/Video Screening',
          'Technical Phone Interview',
          'On-site Interviews (4-5 rounds)',
          'Hiring Committee Review',
          'Final Decision'
        ],
        requirements: [
          'Bachelor\'s degree in Computer Science or related field',
          'Strong programming skills in Java, Python, or C++',
          'Experience with data structures and algorithms',
          'Problem-solving abilities',
          'Good communication skills'
        ],
        recentNews: [
          'Google announces new AI initiatives for 2025',
          'Expansion of cloud services in India',
          'New sustainability commitments'
        ]
      },
      'Microsoft': {
        description: 'Microsoft Corporation is an American multinational technology corporation which produces computer software, consumer electronics, personal computers, and related services.',
        founded: '1975',
        headquarters: 'Redmond, Washington',
        employees: '221,000+',
        website: 'www.microsoft.com',
        industry: 'Technology',
        revenue: '$211.9 billion',
        rating: 4.4,
        culture: [
          'Growth mindset philosophy',
          'Inclusive and diverse workplace',
          'Customer-centric approach',
          'Continuous learning culture'
        ],
        benefits: [
          'Health and wellness programs',
          'Flexible work arrangements',
          'Stock purchase plan',
          'Professional development',
          'Tuition assistance',
          'Volunteer time off'
        ],
        hiringProcess: [
          'Application Review',
          'Recruiter Screening',
          'Technical Assessment',
          'Virtual/On-site Interviews',
          'Final Interview',
          'Offer Decision'
        ],
        requirements: [
          'Degree in relevant field',
          'Technical expertise in Microsoft technologies',
          'Strong analytical skills',
          'Team collaboration experience',
          'Customer focus mindset'
        ],
        recentNews: [
          'Microsoft Azure growth continues',
          'New partnerships in AI and cloud',
          'Sustainability initiatives expansion'
        ]
      },
      'Amazon': {
        description: 'Amazon.com, Inc. is an American multinational technology company which focuses on e-commerce, cloud computing, digital streaming, and artificial intelligence.',
        founded: '1994',
        headquarters: 'Seattle, Washington',
        employees: '1,500,000+',
        website: 'www.amazon.com',
        industry: 'E-commerce & Cloud Computing',
        revenue: '$513.9 billion',
        rating: 3.9,
        culture: [
          'Customer obsession',
          'Ownership mentality',
          'Invent and simplify',
          'High performance standards'
        ],
        benefits: [
          'Comprehensive medical coverage',
          'Career advancement opportunities',
          'Employee discount',
          'Retirement savings plan',
          'Paid time off',
          'Parental leave'
        ],
        hiringProcess: [
          'Online Application',
          'Phone Screening',
          'Technical Assessment',
          'Loop Interviews',
          'Bar Raiser Interview',
          'Final Decision'
        ],
        requirements: [
          'Bachelor\'s degree preferred',
          'Relevant work experience',
          'Strong problem-solving skills',
          'Leadership principles alignment',
          'Technical competency'
        ],
        recentNews: [
          'AWS continues market leadership',
          'New fulfillment centers opening',
          'Investment in renewable energy'
        ]
      },
      'Flipkart': {
        description: 'Flipkart is an Indian e-commerce company, headquartered in Bangalore, Karnataka, India. The company initially focused on online book sales before expanding into other product categories.',
        founded: '2007',
        headquarters: 'Bangalore, Karnataka',
        employees: '50,000+',
        website: 'www.flipkart.com',
        industry: 'E-commerce',
        revenue: '$23 billion',
        rating: 4.1,
        culture: [
          'Innovation and agility',
          'Customer-first approach',
          'Entrepreneurial spirit',
          'Collaborative environment'
        ],
        benefits: [
          'Health insurance',
          'Flexible working hours',
          'Employee stock options',
          'Learning and development',
          'Wellness programs',
          'Performance bonuses'
        ],
        hiringProcess: [
          'Application Submission',
          'Initial Screening',
          'Technical Round',
          'System Design (for senior roles)',
          'HR Interview',
          'Final Decision'
        ],
        requirements: [
          'Engineering degree preferred',
          'Strong coding skills',
          'E-commerce domain knowledge',
          'Problem-solving abilities',
          'Team player attitude'
        ],
        recentNews: [
          'Flipkart expands grocery delivery',
          'New technology initiatives',
          'Partnership with local brands'
        ]
      }
    };

    // Return the specific company data, or a default object if not found
    return companyData[companyName] || {
      description: 'Leading company in its industry with excellent growth opportunities.',
      founded: 'N/A',
      headquarters: 'Multiple Locations',
      employees: 'N/A',
      website: 'N/A',
      industry: 'Technology',
      revenue: 'N/A',
      rating: 4.0,
      culture: ['Professional environment', 'Growth opportunities', 'Team collaboration'],
      benefits: ['Health insurance', 'Professional development', 'Competitive salary'],
      hiringProcess: ['Application', 'Screening', 'Interview', 'Decision'],
      requirements: ['Relevant degree', 'Technical skills', 'Good communication'],
      recentNews: ['Company continues to grow', 'New initiatives launched']
    };
  };

  const details = getCompanyDetails(company.company);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg flex items-center justify-center">
              <Building2 className="h-8 w-8 text-blue-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{company.company}</h2>
              <p className="text-gray-600">{company.role}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="h-6 w-6 text-gray-500" />
          </button>
        </div>

        <div className="p-6">
          {/* Quick Info Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-blue-50 p-4 rounded-lg text-center">
              <Calendar className="h-6 w-6 text-blue-600 mx-auto mb-2" />
              <div className="text-sm text-gray-600">Founded</div>
              <div className="font-semibold text-gray-900">{details.founded}</div>
            </div>
            <div className="bg-green-50 p-4 rounded-lg text-center">
              <Users className="h-6 w-6 text-green-600 mx-auto mb-2" />
              <div className="text-sm text-gray-600">Employees</div>
              <div className="font-semibold text-gray-900">{details.employees}</div>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg text-center">
              <TrendingUp className="h-6 w-6 text-purple-600 mx-auto mb-2" />
              <div className="text-sm text-gray-600">Revenue</div>
              <div className="font-semibold text-gray-900">{details.revenue}</div>
            </div>
            <div className="bg-yellow-50 p-4 rounded-lg text-center">
              <Star className="h-6 w-6 text-yellow-600 mx-auto mb-2" />
              <div className="text-sm text-gray-600">Rating</div>
              <div className="font-semibold text-gray-900">{details.rating}/5</div>
            </div>
          </div>

          {/* Job Details */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-xl mb-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Position Details</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <div className="flex items-center mb-2">
                  <Briefcase className="h-5 w-5 text-blue-600 mr-2" />
                  <span className="font-medium">Role:</span>
                </div>
                <p className="text-gray-700 ml-7">{company.role}</p>
              </div>
              <div>
                <div className="flex items-center mb-2">
                  <MapPin className="h-5 w-5 text-blue-600 mr-2" />
                  <span className="font-medium">Location:</span>
                </div>
                <p className="text-gray-700 ml-7">{company.location}</p>
              </div>
              <div>
                <div className="flex items-center mb-2">
                  <TrendingUp className="h-5 w-5 text-green-600 mr-2" />
                  <span className="font-medium">Package:</span>
                </div>
                <p className="text-gray-700 ml-7">{company.package}</p>
              </div>
              <div>
                <div className="flex items-center mb-2">
                  <Clock className="h-5 w-5 text-red-600 mr-2" />
                  <span className="font-medium">Deadline:</span>
                </div>
                <p className="text-gray-700 ml-7">{company.deadline}</p>
              </div>
              <div>
                <div className="flex items-center mb-2">
                  <GraduationCap className="h-5 w-5 text-purple-600 mr-2" />
                  <span className="font-medium">Eligibility:</span>
                </div>
                <p className="text-gray-700 ml-7">{company.eligibility}</p>
              </div>
              <div>
                <div className="flex items-center mb-2">
                  <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                  <span className="font-medium">Status:</span>
                </div>
                <span className={`ml-7 px-3 py-1 rounded-full text-sm font-medium ${
                  company.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                }`}>
                  {company.status.charAt(0).toUpperCase() + company.status.slice(1)}
                </span>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Company Overview */}
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Company Overview</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">{details.description}</p>

              <div className="mb-6">
                <h4 className="font-semibold text-gray-900 mb-3">Company Info</h4>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 text-gray-400 mr-2" />
                    <span className="text-sm text-gray-600">Headquarters: {details.headquarters}</span>
                  </div>
                  <div className="flex items-center">
                    <Globe className="h-4 w-4 text-gray-400 mr-2" />
                    <span className="text-sm text-gray-600">Website: {details.website}</span>
                  </div>
                  <div className="flex items-center">
                    <Building2 className="h-4 w-4 text-gray-400 mr-2" />
                    <span className="text-sm text-gray-600">Industry: {details.industry}</span>
                  </div>
                </div>
              </div>

              {/* Company Culture */}
              <div className="mb-6">
                <h4 className="font-semibold text-gray-900 mb-3">Company Culture</h4>
                <div className="space-y-2">
                  {details.culture.map((item: string, index: number) => (
                    <div key={index} className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      <span className="text-sm text-gray-600">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Benefits & Process */}
            <div>
              {/* Benefits */}
              <div className="mb-6">
                <h4 className="font-semibold text-gray-900 mb-3">Benefits & Perks</h4>
                <div className="space-y-2">
                  {details.benefits.map((benefit: string, index: number) => (
                    <div key={index} className="flex items-center">
                      <Award className="h-4 w-4 text-blue-500 mr-2" />
                      <span className="text-sm text-gray-600">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Hiring Process */}
              <div className="mb-6">
                <h4 className="font-semibold text-gray-900 mb-3">Hiring Process</h4>
                <div className="space-y-3">
                  {details.hiringProcess.map((step: string, index: number) => (
                    <div key={index} className="flex items-center">
                      <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-medium mr-3">
                        {index + 1}
                      </div>
                      <span className="text-sm text-gray-600">{step}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Requirements */}
              <div className="mb-6">
                <h4 className="font-semibold text-gray-900 mb-3">Key Requirements</h4>
                <div className="space-y-2">
                  {details.requirements.map((req: string, index: number) => (
                    <div key={index} className="flex items-center">
                      <Target className="h-4 w-4 text-purple-500 mr-2" />
                      <span className="text-sm text-gray-600">{req}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Recent News */}
          <div className="bg-gray-50 p-6 rounded-xl mb-6">
            <h4 className="font-semibold text-gray-900 mb-3">Recent Company News</h4>
            <div className="space-y-2">
              {details.recentNews.map((news: string, index: number) => (
                <div key={index} className="flex items-center">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                  <span className="text-sm text-gray-600">{news}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-4">
            <button className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-colors font-medium">
              Apply Now
            </button>
            <button
              className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium"
              onClick={() => {
                window.localStorage.setItem(`saved_${company.company}_${company.role}`, JSON.stringify(company));
                alert('Saved for later!');
              }}
            >
              Save for Later
            </button>
            <button
              className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium"
              onClick={() => {
                const shareUrl = window.location.origin + '/saved-companies';
                navigator.clipboard.writeText(shareUrl);
                alert('Share link to saved companies copied to clipboard!');
              }}
            >
              Share
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyDetailsModal;
