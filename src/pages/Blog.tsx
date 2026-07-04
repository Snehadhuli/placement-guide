import React, { useState } from 'react';
import { 
  PenTool, 
  Heart, 
  MessageCircle, 
  Share2, 
  Calendar,
  User,
  Tag,
  TrendingUp,
  Eye
} from 'lucide-react';

interface BlogProps {
  userRole: 'student' | 'alumni' | 'tpo' | null;
}

const Blog: React.FC<BlogProps> = ({ userRole }) => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const blogPosts = [
    {
      id: 1,
      title: 'How I Cracked Google Interview in 3 Attempts',
      excerpt: 'My journey from rejection to acceptance at Google. Tips, strategies, and lessons learned along the way.',
      author: 'Priya Sharma',
      authorRole: 'SDE at Google',
      date: '2025-01-10',
      category: 'Interview Experience',
      readTime: '8 min read',
      likes: 234,
      comments: 45,
      views: '2.3k',
      featured: true,
      image: 'https://images.pexels.com/photos/4974915/pexels-photo-4974915.jpeg?auto=compress&cs=tinysrgb&w=600'
    },
    {
      id: 2,
      title: 'Complete Preparation Guide for Technical Interviews',
      excerpt: 'A comprehensive guide covering data structures, algorithms, system design, and behavioral questions.',
      author: 'Rahul Kumar',
      authorRole: 'Software Engineer at Microsoft',
      date: '2025-01-08',
      category: 'Preparation Guide',
      readTime: '12 min read',
      likes: 189,
      comments: 32,
      views: '1.8k',
      featured: false,
      image: 'https://images.pexels.com/photos/3861958/pexels-photo-3861958.jpeg?auto=compress&cs=tinysrgb&w=600'
    },
    {
      id: 3,
      title: 'My Amazon Internship Experience and Full-Time Offer',
      excerpt: 'From internship application to receiving a full-time offer. What to expect and how to excel.',
      author: 'Sneha Patel',
      authorRole: 'Product Manager at Amazon',
      date: '2025-01-05',
      category: 'Internship',
      readTime: '6 min read',
      likes: 156,
      comments: 28,
      views: '1.5k',
      featured: false,
      image: 'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=600'
    },
    {
      id: 4,
      title: 'Transitioning from Service-Based to Product Companies',
      excerpt: 'My experience moving from TCS to Flipkart. Skills that matter and how to make the switch.',
      author: 'Arjun Mehta',
      authorRole: 'Senior Developer at Flipkart',
      date: '2025-01-03',
      category: 'Career Transition',
      readTime: '10 min read',
      likes: 203,
      comments: 38,
      views: '2.1k',
      featured: false,
      image: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=600'
    },
    {
      id: 5,
      title: 'Top 50 Data Science Interview Questions and Answers',
      excerpt: 'Comprehensive list of frequently asked data science questions with detailed explanations.',
      author: 'Dr. Meera Singh',
      authorRole: 'Data Scientist at Netflix',
      date: '2025-01-01',
      category: 'Interview Questions',
      readTime: '15 min read',
      likes: 287,
      comments: 52,
      views: '3.2k',
      featured: true,
      image: 'https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=600'
    }
  ];

  const categories = [
    'all',
    'Interview Experience',
    'Preparation Guide',
    'Internship',
    'Career Transition',
    'Interview Questions',
    'Salary Negotiation',
    'Resume Tips'
  ];

  const filteredPosts = selectedCategory === 'all' 
    ? blogPosts 
    : blogPosts.filter(post => post.category === selectedCategory);

  const featuredPosts = blogPosts.filter(post => post.featured);
  const regularPosts = filteredPosts.filter(post => !post.featured);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        {userRole === 'alumni' && (
          <div className="mb-6 text-right">
            <button className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
              <PenTool className="inline-block mr-2" /> Write a Post
            </button>
          </div>
        )}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Placement Experiences & Guides</h1>
            <p className="text-gray-600">Learn from successful placement stories and expert guidance</p>
          </div>
          
        </div>

        {/* Category Filter */}
        <div className="bg-white p-4 rounded-xl shadow-sm mb-8">
          <div className="flex flex-wrap gap-2">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedCategory === category
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category === 'all' ? 'All Posts' : category}
              </button>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Featured Posts */}
            {selectedCategory === 'all' && featuredPosts.length > 0 && (
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                  <TrendingUp className="h-6 w-6 mr-2 text-blue-600" />
                  Featured Posts
                </h2>
                <div className="space-y-6">
                  {featuredPosts.map(post => (
                    <div key={post.id} className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-shadow border border-gray-100 overflow-hidden">
                      <div className="md:flex">
                        <div className="md:w-1/3">
                          <img 
                            src={post.image} 
                            alt={post.title}
                            className="w-full h-48 md:h-full object-cover"
                          />
                        </div>
                        <div className="p-6 md:w-2/3">
                          <div className="flex items-center justify-between mb-3">
                            <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
                              {post.category}
                            </span>
                            <div className="flex items-center text-gray-500 text-sm">
                              <Eye className="h-4 w-4 mr-1" />
                              {post.views}
                            </div>
                          </div>
                          <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">{post.title}</h3>
                          <p className="text-gray-600 mb-4 line-clamp-2">{post.excerpt}</p>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <div className="flex items-center text-gray-500 text-sm">
                                <User className="h-4 w-4 mr-1" />
                                {post.author}
                              </div>
                              <div className="flex items-center text-gray-500 text-sm">
                                <Calendar className="h-4 w-4 mr-1" />
                                {new Date(post.date).toLocaleDateString()}
                              </div>
                            </div>
                            <div className="flex items-center space-x-4 text-gray-500 text-sm">
                              <div className="flex items-center">
                                <Heart className="h-4 w-4 mr-1" />
                                {post.likes}
                              </div>
                              <div className="flex items-center">
                                <MessageCircle className="h-4 w-4 mr-1" />
                                {post.comments}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Regular Posts */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                {selectedCategory === 'all' ? 'Latest Posts' : `Posts in ${selectedCategory}`}
              </h2>
              <div className="space-y-6">
                {regularPosts.map(post => (
                  <div key={post.id} className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-shadow border border-gray-100 p-6">
                    <div className="flex items-center justify-between mb-3">
                      <span className="px-3 py-1 bg-purple-100 text-purple-800 text-sm font-medium rounded-full">
                        {post.category}
                      </span>
                      <div className="flex items-center text-gray-500 text-sm">
                        <Eye className="h-4 w-4 mr-1" />
                        {post.views}
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2 hover:text-blue-600 cursor-pointer">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 mb-4 line-clamp-3">{post.excerpt}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center text-gray-500 text-sm">
                          <User className="h-4 w-4 mr-1" />
                          {post.author}
                        </div>
                        <div className="flex items-center text-gray-500 text-sm">
                          <Calendar className="h-4 w-4 mr-1" />
                          {new Date(post.date).toLocaleDateString()}
                        </div>
                        <span className="text-gray-500 text-sm">{post.readTime}</span>
                      </div>
                      <div className="flex items-center space-x-4 text-gray-500 text-sm">
                        <button className="flex items-center hover:text-red-500 transition-colors">
                          <Heart className="h-4 w-4 mr-1" />
                          {post.likes}
                        </button>
                        <button className="flex items-center hover:text-blue-500 transition-colors">
                          <MessageCircle className="h-4 w-4 mr-1" />
                          {post.comments}
                        </button>
                        <button className="flex items-center hover:text-green-500 transition-colors">
                          <Share2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Popular Tags */}
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Tag className="h-5 w-5 mr-2" />
                Popular Tags
              </h3>
              <div className="flex flex-wrap gap-2">
                {['Google', 'Microsoft', 'Amazon', 'Interview Tips', 'DSA', 'System Design', 'Resume', 'Internship'].map(tag => (
                  <span key={tag} className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full hover:bg-gray-200 cursor-pointer transition-colors">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Top Contributors */}
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Contributors</h3>
              <div className="space-y-4">
                {[
                  { name: 'Priya Sharma', posts: 12, role: 'SDE at Google' },
                  { name: 'Rahul Kumar', posts: 8, role: 'Engineer at Microsoft' },
                  { name: 'Dr. Meera Singh', posts: 15, role: 'Data Scientist at Netflix' }
                ].map((contributor, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center">
                      <User className="h-5 w-5 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-gray-900">{contributor.name}</div>
                      <div className="text-sm text-gray-500">{contributor.posts} posts • {contributor.role}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Writing Guidelines */}
            {userRole && (
              <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-xl">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Want to Share Your Experience?</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Help fellow students by sharing your placement journey, interview experiences, and career tips.
                </p>
                <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 px-4 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-colors">
                  Start Writing
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;