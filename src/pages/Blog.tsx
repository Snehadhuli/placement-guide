import React, { useState, useEffect } from 'react';
import { db, Blog, Comment } from '../lib/db';
import { 
  PenTool, 
  Heart, 
  MessageCircle, 
  Share2, 
  Calendar,
  User,
  Tag,
  TrendingUp,
  Eye,
  X,
  Plus,
  Send,
  AlertCircle
} from 'lucide-react';

interface BlogProps {
  userRole: 'student' | 'alumni' | 'tpo' | null;
}

const BlogPage: React.FC<BlogProps> = ({ userRole }) => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  // Database States
  const [posts, setPosts] = useState<Blog[]>([]);
  
  // Modal States
  const [activeReadPost, setActiveReadPost] = useState<Blog | null>(null);
  const [writePostModalOpen, setWritePostModalOpen] = useState(false);
  
  // Comment Form State
  const [newCommentText, setNewCommentText] = useState('');
  
  // Write Post Form State
  const [newPostForm, setNewPostForm] = useState({
    title: '',
    category: 'Interview Experience',
    excerpt: '',
    content: '',
    image: '',
    author: 'Aman Varma',
    authorRole: 'Student'
  });

  const loadData = () => {
    setPosts(db.getBlogs());
    // Keep active read post in sync if comments list changes
    if (activeReadPost) {
      const currentPost = db.getBlogs().find(b => b.id === activeReadPost.id);
      if (currentPost) setActiveReadPost(currentPost);
    }
  };

  useEffect(() => {
    loadData();
  }, [activeReadPost?.id]);

  // Categories
  const categories = [
    'all',
    'Interview Experience',
    'Preparation Guide',
    'Internship',
    'Career Transition',
    'Interview Questions'
  ];

  const filteredPosts = selectedCategory === 'all' 
    ? posts 
    : posts.filter(post => post.category === selectedCategory);

  const featuredPosts = posts.filter(post => post.featured);
  const regularPosts = filteredPosts.filter(post => !post.featured);

  // Like handler
  const handleLikePost = (e: React.MouseEvent, id: number) => {
    e.stopPropagation(); // prevent opening read modal
    db.likeBlog(id);
    loadData();
  };

  // Submit comment
  const handleCommentSubmit = (e: React.FormEvent, postId: number) => {
    e.preventDefault();
    if (!newCommentText.trim()) return;

    const authorName = userRole === 'student' ? 'Aman Varma' : userRole === 'alumni' ? 'Harsha Vardhan' : 'TPO Admin';
    const authorRole = userRole || 'student';

    db.addCommentToBlog(postId, newCommentText.trim(), authorName, authorRole);
    setNewCommentText('');
    loadData();
  };

  // Submit new post
  const handleWritePostSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Choose standard placeholder image
    const blogImages = [
      'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=compress&cs=tinysrgb&w=600',
      'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=compress&cs=tinysrgb&w=600',
      'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=compress&cs=tinysrgb&w=600'
    ];
    const randomImage = blogImages[Math.floor(Math.random() * blogImages.length)];

    const authorName = userRole === 'alumni' ? 'Harsha Vardhan' : 'Aman Varma';
    const authorRole = userRole === 'alumni' ? 'Alumni (Class of 2024)' : 'Student (ANITS)';

    db.addBlog({
      title: newPostForm.title,
      category: newPostForm.category,
      excerpt: newPostForm.excerpt,
      content: newPostForm.content,
      image: newPostForm.image || randomImage,
      author: authorName,
      authorRole: authorRole,
      date: new Date().toISOString().split('T')[0],
      readTime: `${Math.max(3, Math.round(newPostForm.content.split(' ').length / 200))} min read`,
      featured: false
    });

    setWritePostModalOpen(false);
    setNewPostForm({
      title: '',
      category: 'Interview Experience',
      excerpt: '',
      content: '',
      image: '',
      author: 'Aman Varma',
      authorRole: 'Student'
    });
    loadData();
  };

  if (!userRole) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center p-8 bg-white rounded-2xl shadow-md border border-gray-100 max-w-md">
          <AlertCircle className="h-16 w-16 text-blue-600 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Please Select Your Role</h2>
          <p className="text-gray-600">Choose your role (Student, Alumni, or TPO) from the header navigation to read and share placement stories.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Write Post Trigger */}
        {(userRole === 'alumni' || userRole === 'student') && (
          <div className="mb-6 text-right">
            <button 
              onClick={() => setWritePostModalOpen(true)}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2.5 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-colors flex items-center inline-flex shadow-md"
            >
              <PenTool className="mr-2 h-4 w-4" /> Write a Post
            </button>
          </div>
        )}

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Placement Experiences & Guides</h1>
          <p className="text-gray-600">Read verified interview walkthroughs, prep timelines, and internship stories shared directly by alumni.</p>
        </div>
        
        {/* Category Filter */}
        <div className="bg-white p-4 rounded-xl shadow-sm mb-8 border border-gray-100">
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
          <div className="lg:col-span-2 space-y-8">
            
            {/* Featured Posts (Only visible on All Posts tab) */}
            {selectedCategory === 'all' && featuredPosts.length > 0 && (
              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                  <TrendingUp className="h-6 w-6 mr-2 text-blue-600" />
                  Featured Story
                </h2>
                {featuredPosts.map(post => (
                  <div 
                    key={post.id} 
                    onClick={() => setActiveReadPost(post)}
                    className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-shadow border border-gray-100 overflow-hidden cursor-pointer md:flex"
                  >
                    <div className="md:w-1/3">
                      <img 
                        src={post.image} 
                        alt={post.title}
                        className="w-full h-48 md:h-full object-cover"
                      />
                    </div>
                    <div className="p-6 md:w-2/3 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-semibold rounded-full uppercase">
                            {post.category}
                          </span>
                          <div className="flex items-center text-gray-500 text-xs">
                            <Eye className="h-4 w-4 mr-1" />
                            {post.views} Views
                          </div>
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-2 hover:text-blue-600 transition-colors line-clamp-2">{post.title}</h3>
                        <p className="text-gray-600 text-sm mb-4 line-clamp-3 leading-relaxed">{post.excerpt}</p>
                      </div>

                      <div className="flex items-center justify-between border-t border-gray-50 pt-4">
                        <div className="flex items-center space-x-3 text-xs text-gray-500">
                          <div className="flex items-center font-medium text-gray-700">
                            <User className="h-3.5 w-3.5 mr-1" />
                            {post.author}
                          </div>
                          <span>•</span>
                          <div className="flex items-center">
                            <Calendar className="h-3.5 w-3.5 mr-1" />
                            {post.date}
                          </div>
                        </div>
                        <div className="flex items-center space-x-4 text-xs text-gray-500 font-semibold">
                          <button 
                            onClick={(e) => handleLikePost(e, post.id)}
                            className="flex items-center hover:text-red-500 transition-colors bg-gray-50 px-2.5 py-1.5 rounded-lg"
                          >
                            <Heart className="h-4 w-4 mr-1 text-red-400 fill-current" />
                            {post.likes}
                          </button>
                          <div className="flex items-center bg-gray-50 px-2.5 py-1.5 rounded-lg">
                            <MessageCircle className="h-4 w-4 mr-1 text-blue-400" />
                            {post.comments}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Regular Posts List */}
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900">
                {selectedCategory === 'all' ? 'Recent Feed' : `Guides in ${selectedCategory}`}
              </h2>
              {regularPosts.length === 0 && (
                <div className="bg-white p-8 text-center rounded-xl border border-gray-100 text-gray-500">
                  No post logs found in this category yet. Click "Write a Post" to share the first!
                </div>
              )}
              {regularPosts.map(post => (
                <div 
                  key={post.id} 
                  onClick={() => setActiveReadPost(post)}
                  className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-shadow border border-gray-100 p-6 cursor-pointer"
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="px-3 py-1 bg-purple-100 text-purple-800 text-xs font-semibold rounded-full uppercase">
                      {post.category}
                    </span>
                    <div className="flex items-center text-gray-500 text-xs">
                      <Eye className="h-4 w-4 mr-1" />
                      {post.views} Views
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2 hover:text-blue-600 transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3 leading-relaxed">{post.excerpt}</p>
                  
                  <div className="flex items-center justify-between border-t border-gray-50 pt-4">
                    <div className="flex items-center space-x-4 text-xs text-gray-500">
                      <div className="flex items-center font-medium text-gray-700">
                        <User className="h-3.5 w-3.5 mr-1" />
                        {post.author}
                      </div>
                      <span>•</span>
                      <div className="flex items-center">
                        <Calendar className="h-3.5 w-3.5 mr-1" />
                        {post.date}
                      </div>
                      <span>•</span>
                      <span>{post.readTime}</span>
                    </div>
                    <div className="flex items-center space-x-4 text-xs text-gray-500 font-semibold">
                      <button 
                        onClick={(e) => handleLikePost(e, post.id)}
                        className="flex items-center hover:text-red-500 transition-colors bg-gray-50 px-2.5 py-1.5 rounded-lg"
                      >
                        <Heart className="h-4 w-4 mr-1 text-red-400 fill-current" />
                        {post.likes}
                      </button>
                      <div className="flex items-center bg-gray-50 px-2.5 py-1.5 rounded-lg">
                        <MessageCircle className="h-4 w-4 mr-1 text-blue-400" />
                        {post.comments}
                      </div>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          navigator.clipboard.writeText(window.location.href);
                          alert('Article link copied to clipboard!');
                        }}
                        className="flex items-center hover:text-green-500 transition-colors bg-gray-50 p-1.5 rounded-lg"
                      >
                        <Share2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Popular Tags */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                <Tag className="h-5 w-5 mr-2 text-blue-600" />
                Trending Keywords
              </h3>
              <div className="flex flex-wrap gap-2">
                {['Google', 'Microsoft', 'Amazon', 'Interview Tips', 'DSA', 'System Design', 'Resume', 'Internship'].map(tag => (
                  <span 
                    key={tag} 
                    onClick={() => setSearchTerm(tag)}
                    className="px-3 py-1 bg-gray-50 text-gray-700 text-xs font-semibold rounded-full hover:bg-blue-50 hover:text-blue-600 cursor-pointer transition-colors border border-gray-100"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Placement Guidelines */}
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-xl border border-blue-100">
              <h3 className="text-lg font-bold text-gray-900 mb-3">Share Your Journey!</h3>
              <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                Your interview logs, mistake reports, and prep schedules could be the difference-maker for your juniors. Add your experience now!
              </p>
              <button 
                onClick={() => setWritePostModalOpen(true)}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2.5 px-4 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-colors font-semibold text-sm shadow-sm"
              >
                Create Guide Post
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Read Blog Post Modal */}
      {activeReadPost && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-gray-100">
            
            {/* Modal Image & Header */}
            <div className="relative h-64 w-full">
              <img 
                src={activeReadPost.image} 
                alt={activeReadPost.title} 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70"></div>
              <button 
                onClick={() => setActiveReadPost(null)}
                className="absolute top-4 right-4 bg-black bg-opacity-50 text-white hover:bg-opacity-80 p-2 rounded-full transition-all"
              >
                <X className="h-6 w-6" />
              </button>
              <div className="absolute bottom-4 left-6 right-6 text-white">
                <span className="px-2.5 py-0.5 bg-blue-600 rounded text-xs font-bold uppercase tracking-wider mb-2 inline-block">
                  {activeReadPost.category}
                </span>
                <h2 className="text-2xl font-bold leading-tight">{activeReadPost.title}</h2>
              </div>
            </div>

            <div className="p-6">
              {/* Author metadata */}
              <div className="flex items-center space-x-3 mb-6 bg-gray-50 p-3 rounded-lg border border-gray-100">
                <div className="bg-blue-100 text-blue-600 p-2 rounded-full">
                  <User className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-sm">{activeReadPost.author}</h4>
                  <p className="text-xs text-gray-500">{activeReadPost.authorRole} • Posted on {activeReadPost.date}</p>
                </div>
              </div>

              {/* Main Content */}
              <div className="prose max-w-none text-gray-700 text-sm leading-relaxed whitespace-pre-line mb-8">
                {activeReadPost.content}
              </div>

              {/* Comments Section */}
              <div className="border-t border-gray-200 pt-6">
                <h4 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                  <MessageCircle className="h-5 w-5 mr-2 text-blue-600" />
                  Comments ({activeReadPost.commentsList?.length || 0})
                </h4>

                {/* Comment Form */}
                <form onSubmit={(e) => handleCommentSubmit(e, activeReadPost.id)} className="flex items-center space-x-2 mb-6">
                  <input
                    type="text"
                    required
                    placeholder="Ask a question or add details..."
                    value={newCommentText}
                    onChange={(e) => setNewCommentText(e.target.value)}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  />
                  <button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700 text-white p-2.5 rounded-xl transition-colors"
                  >
                    <Send className="h-4 w-4" />
                  </button>
                </form>

                {/* Comments List */}
                <div className="space-y-4">
                  {(activeReadPost.commentsList || []).map(comment => (
                    <div key={comment.id} className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-bold text-gray-900">{comment.author}</span>
                        <span className="text-[10px] text-gray-400">{comment.date}</span>
                      </div>
                      <span className="text-[10px] bg-blue-100 text-blue-800 px-1.5 py-0.5 rounded font-semibold uppercase tracking-wider mb-2 inline-block">
                        {comment.role}
                      </span>
                      <p className="text-gray-700 text-sm">{comment.text}</p>
                    </div>
                  ))}
                  {(activeReadPost.commentsList || []).length === 0 && (
                    <p className="text-center text-gray-400 text-sm py-4">No comments yet. Be the first to start the discussion!</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Write Post Modal */}
      {writePostModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-gray-100">
            <div className="p-6 border-b border-gray-200 flex justify-between items-center bg-gradient-to-r from-blue-50 to-purple-50">
              <div>
                <h3 className="text-xl font-bold text-gray-900">Write Guide Post</h3>
                <p className="text-sm text-gray-600">Share your interview experience or preparation timeline</p>
              </div>
              <button 
                onClick={() => setWritePostModalOpen(false)}
                className="p-1.5 hover:bg-gray-200 rounded-full transition-colors"
              >
                <X className="h-6 w-6 text-gray-500" />
              </button>
            </div>

            <form onSubmit={handleWritePostSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Article Title</label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. My Placement Experience at Google (SDE-1)"
                  value={newPostForm.title}
                  onChange={(e) => setNewPostForm({...newPostForm, title: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Category</label>
                  <select
                    value={newPostForm.category}
                    onChange={(e) => setNewPostForm({...newPostForm, category: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                  >
                    <option value="Interview Experience">Interview Experience</option>
                    <option value="Preparation Guide">Preparation Guide</option>
                    <option value="Internship">Internship Experience</option>
                    <option value="Career Transition">Career Transition</option>
                    <option value="Interview Questions">Interview Questions</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Banner Image URL (Optional)</label>
                  <input 
                    type="url" 
                    placeholder="https://images.unsplash.com/..."
                    value={newPostForm.image}
                    onChange={(e) => setNewPostForm({...newPostForm, image: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Short Excerpt (1-2 sentences summarizing)</label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. Step by step details of the 4 technical coding rounds and resume tips."
                  value={newPostForm.excerpt}
                  onChange={(e) => setNewPostForm({...newPostForm, excerpt: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Full Article Content</label>
                <textarea 
                  rows={6}
                  required
                  placeholder="Share details like eligibility criteria, coding questions, system design details, and tips for interview preparation..."
                  value={newPostForm.content}
                  onChange={(e) => setNewPostForm({...newPostForm, content: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="flex space-x-3 pt-4 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setWritePostModalOpen(false)}
                  className="flex-1 py-2.5 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-lg hover:from-blue-700 hover:to-purple-700 transition-colors"
                >
                  Publish Article
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogPage;