import React from 'react';
import { Link } from 'react-router-dom';
import {
  Building2,
  Users,
  BookOpen,
  TrendingUp,
  Award,
  ArrowRight
} from 'lucide-react';

interface HomePageProps {
  userRole: 'student' | 'alumni' | 'tpo' | null;
}

const HomePage: React.FC<HomePageProps> = ({ userRole }) => {
  const features = [
    {
      icon: Building2,
      title: 'Centralized Placement Drives',
      description: 'Access all placement opportunities in one unified dashboard with real-time updates.'
    },
    {
      icon: Users,
      title: 'Alumni Mentorship',
      description: 'Connect with successful alumni for career guidance and industry insights.'
    },
    {
      icon: BookOpen,
      title: 'Experience Blog',
      description: 'Share and read placement experiences, interview tips, and success stories.'
    },
    {
      icon: TrendingUp,
      title: 'Company Analytics',
      description: 'Get detailed hiring trends, salary insights, and eligibility criteria.'
    }
  ];

  const stats = [
    { label: 'Active Companies', value: '150+', icon: Building2 },
    { label: 'Alumni Network', value: '5,000+', icon: Users },
    { label: 'Success Rate', value: '94%', icon: Award },
    { label: 'Monthly Placements', value: '200+', icon: TrendingUp }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 via-white to-purple-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              Your Gateway to
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {' '}Career Success
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Bridge the gap between academic excellence and career opportunities.
              Connect with industry leaders, access exclusive placement drives,
              and get mentored by successful alumni.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to={userRole ? "/dashboard" : "/login"}
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all transform hover:scale-105 shadow-lg"
              >
                Explore Opportunities
              </Link>
              <Link
                to="/alumni-connect"
                className="border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-600 hover:text-white transition-all"
              >
                Connect with Alumni
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="bg-gradient-to-br from-blue-100 to-purple-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <stat.icon className="h-8 w-8 text-blue-600" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Everything You Need for Placement Success
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our comprehensive platform provides all the tools and resources
              you need to land your dream job.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature) => (
              <div key={feature.title} className="bg-white p-8 rounded-xl shadow-sm hover:shadow-lg transition-shadow border border-gray-100">
                <div className="bg-gradient-to-br from-blue-100 to-purple-100 p-3 rounded-lg w-fit mb-6">
                  <feature.icon className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-xl text-gray-600">Simple steps to kickstart your career journey</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-6">1</div>
              <h3 className="text-xl font-semibold mb-3">Create Your Profile</h3>
              <p className="text-gray-600">Set up your profile with academic details, skills, and career preferences.</p>
            </div>
            <div className="text-center">
              <div className="bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-6">2</div>
              <h3 className="text-xl font-semibold mb-3">Explore Opportunities</h3>
              <p className="text-gray-600">Browse placement drives, company profiles, and connect with alumni mentors.</p>
            </div>
            <div className="text-center">
              <div className="bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-6">3</div>
              <h3 className="text-xl font-semibold mb-3">Land Your Dream Job</h3>
              <p className="text-gray-600">Apply to companies, prepare with resources, and secure your ideal position.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Ready to Start Your Career Journey?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of students who have successfully landed their dream jobs through our platform.
          </p>
          <Link
            to={userRole ? "/dashboard" : "/login"}
            className="inline-flex items-center bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            Get Started Today
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;