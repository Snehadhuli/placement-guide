import React, { useState } from 'react';
import { 
  Search,
  MapPin,
  Building2,
  Calendar,
  MessageCircle,
  Star,
  Users,
  Award,
  BookOpen
} from 'lucide-react';

interface AlumniConnectProps {
  userRole: 'student' | 'alumni' | 'tpo' | null;
}

const AlumniConnect: React.FC<AlumniConnectProps> = ({ userRole }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCompany, setSelectedCompany] = useState('all');
  const [selectedDomain, setSelectedDomain] = useState('all');

  const alumni = [
    {
      id: 1,
      name: 'Harsha Vardhan Pentakota',
      role: 'Senior Software Engineer',
      company: 'Fact Set',
      location: 'Bangalore',
      graduationYear: 2024,
      experience: '5 years',
      domain: 'Software Development',
      rating: 4.9,
      sessionsCompleted: 45,
      expertise: ['System Design', 'DSA', 'Interview Prep'],
      availability: 'Available',
      responseTime: '< 2 hours',
      languages: ['English', 'Hindi'],
      bio: 'Passionate about helping students crack top-tier tech companies. Specialized in system design and coding interviews.',
      achievements: ['Factset SDE L5', 'Mentor of the Year 2023'],
      image: '/api/placeholder/80/80',
      linkedin: 'https://www.linkedin.com/in/harsha-vardhan-pentakota-657969259?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_contact_details%3BARauF%2FQ8RA%2Bok8v9iWZzeQ%3D%3D'
    },
    {
      id: 2,
      name: 'Venu Madhav Murapaka',
      role: 'Wireless System Engineer',
      company: 'Candela',
      location: 'Visakhapatnam',
      graduationYear: 2024,
      experience: '3 years',
      domain: 'Networks',
      rating: 4.8,
      sessionsCompleted: 32,
      expertise: ['Product Strategy', 'Market Research', 'Leadership'],
      availability: 'Available',
      responseTime: '< 4 hours',
      languages: ['English', 'Telugu'],
      bio: 'Helping students transition into product management roles. Expert in product strategy and market analysis.',
      achievements: ['Candela PM Excellence Award', 'Top Mentor 2023'],
      image: '/api/placeholder/80/80',
      linkedin: 'https://www.linkedin.com/in/venu-madhav-murapaka-160465256?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_contact_details%3BGGt8PLDNRHC94NI6qsmY5w%3D%3D'
    },
    {
      id: 3,
      name: 'RV Dhanush Kumar',
      role: ' Data Scientist',
      company: 'Inncircles',
      location: 'Mumbai',
      graduationYear: 2016,
      experience: '4 years',
      domain: 'Data Science',
      rating: 5.0,
      sessionsCompleted: 67,
      expertise: ['Machine Learning', 'Statistics', 'Python'],
      availability: 'Busy',
      responseTime: '< 24 hours',
      languages: ['English', 'Hindi', 'Marathi'],
      bio: 'Leading data science initiatives at Netflix. Passionate about ML and helping students enter the field.',
      achievements: ['Inncircles Innovation Award', 'Published Researcher'],
      image: '/api/placeholder/80/80',
      linkedin: 'https://www.linkedin.com/in/dhanush-awesome?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_contact_details%3BgQrxoUiBQ5GmuNzaKx814g%3D%3D'
    },
    {
      id: 4,
      name: 'Hima Bindu Gogineni',
      role: 'Assistant Professor',
      company: 'ANITS',
      location: 'Visakhapatnam',
      graduationYear: 2017,
      experience: '7 years',
      domain: 'DevOps',
      rating: 4.7,
      sessionsCompleted: 28,
      expertise: ['AWS', 'Kubernetes', 'CI/CD'],
      availability: 'Available',
      responseTime: '< 6 hours',
      languages: ['English', 'Tamil'],
      bio: 'Expert in cloud infrastructure and DevOps practices. Helping students build scalable systems.',
      achievements: ['AWS Certified Solutions Architect', 'DevOps Innovator'],
      image: '/api/placeholder/80/80',
      linkedin: 'https://www.linkedin.com/in/gogineni-hima-bindu-b58355204?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_contact_details%3BnKmkuiJ1RpaZ3S2bbrr9UQ%3D%3D'
    }
  ];

  const companies = ['all', 'Google', 'Microsoft', 'Netflix', 'Amazon', 'Meta', 'Apple'];
  const domains = ['all', 'Software Development', 'Product Management', 'Data Science', 'DevOps', 'Design'];

  const filteredAlumni = alumni.filter(person => {
    const matchesSearch = person.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         person.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         person.expertise.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCompany = selectedCompany === 'all' || person.company === selectedCompany;
    const matchesDomain = selectedDomain === 'all' || person.domain === selectedDomain;
    return matchesSearch && matchesCompany && matchesDomain;
  });

  const getAvailabilityColor = (availability: string) => {
    switch (availability) {
      case 'Available': return 'bg-green-100 text-green-800';
      case 'Busy': return 'bg-yellow-100 text-yellow-800';
      case 'Unavailable': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (!userRole) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Please Select Your Role</h2>
          <p className="text-gray-600">Choose your role from the header to access alumni connections.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Alumni Connect</h1>
          <p className="text-gray-600">Connect with successful alumni for mentorship and career guidance</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm text-center">
            <Users className="h-8 w-8 text-blue-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">500+</div>
            <div className="text-gray-600">Active Alumni</div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm text-center">
            <MessageCircle className="h-8 w-8 text-green-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">1.2k</div>
            <div className="text-gray-600">Sessions Completed</div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm text-center">
            <Star className="h-8 w-8 text-yellow-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">4.8</div>
            <div className="text-gray-600">Avg Rating</div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm text-center">
            <Award className="h-8 w-8 text-purple-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">95%</div>
            <div className="text-gray-600">Success Rate</div>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="bg-white p-6 rounded-xl shadow-sm mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name, company, or expertise..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex gap-2">
              <select
                value={selectedCompany}
                onChange={(e) => setSelectedCompany(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {companies.map(company => (
                  <option key={company} value={company}>
                    {company === 'all' ? 'All Companies' : company}
                  </option>
                ))}
              </select>
              <select
                value={selectedDomain}
                onChange={(e) => setSelectedDomain(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {domains.map(domain => (
                  <option key={domain} value={domain}>
                    {domain === 'all' ? 'All Domains' : domain}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Alumni Cards */}
        <div className="grid lg:grid-cols-2 gap-6">
          {filteredAlumni.map((person) => (
            <div key={person.id} className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-shadow border border-gray-100">
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center">
                      <Users className="h-8 w-8 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900">{person.name}</h3>
                      <p className="text-gray-600">{person.role}</p>
                      <div className="flex items-center mt-1">
                        <Building2 className="h-4 w-4 text-gray-400 mr-1" />
                        <span className="text-sm text-gray-600">{person.company}</span>
                      </div>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getAvailabilityColor(person.availability)}`}>
                    {person.availability}
                  </span>
                </div>

                <p className="text-gray-600 mb-4 line-clamp-2">{person.bio}</p>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="flex items-center text-gray-600">
                    <MapPin className="h-4 w-4 mr-2" />
                    <span className="text-sm">{person.location}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span className="text-sm">Class of {person.graduationYear}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Star className="h-4 w-4 mr-2 text-yellow-500" />
                    <span className="text-sm">{person.rating} ({person.sessionsCompleted} sessions)</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <MessageCircle className="h-4 w-4 mr-2" />
                    <span className="text-sm">{person.responseTime}</span>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="text-sm text-gray-600 mb-2">Expertise:</div>
                  <div className="flex flex-wrap gap-2">
                    {person.expertise.map((skill, index) => (
                      <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mb-6">
                  <div className="text-sm text-gray-600 mb-2">Recent Achievements:</div>
                  <div className="space-y-1">
                    {person.achievements.map((achievement, index) => (
                      <div key={index} className="flex items-center text-sm text-gray-700">
                        <Award className="h-3 w-3 mr-2 text-purple-500" />
                        {achievement}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex space-x-3">
                  <a
                    href={person.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 px-4 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-colors flex items-center justify-center"
                  >
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Message
                  </a>
                  <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                    <BookOpen className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-8">
          <button className="bg-white border border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-50 transition-colors">
            Load More Alumni
          </button>
        </div>
      </div>
    </div>
  );
};

export default AlumniConnect;