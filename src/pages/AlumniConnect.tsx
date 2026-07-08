import React, { useState, useEffect, useRef } from 'react';
import { db, Alumni, ChatMessage, MentorshipSession } from '../lib/db';
import { 
  Search,
  MapPin,
  Building2,
  Calendar,
  MessageCircle,
  Star,
  Users,
  Award,
  BookOpen,
  Send,
  X,
  Clock,
  Check,
  CalendarRange,
  ChevronRight,
  MessageSquare,
  AlertCircle
} from 'lucide-react';

interface AlumniConnectProps {
  userRole: 'student' | 'alumni' | 'tpo' | null;
}

const AlumniConnect: React.FC<AlumniConnectProps> = ({ userRole }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCompany, setSelectedCompany] = useState('all');
  const [selectedDomain, setSelectedDomain] = useState('all');

  // Database states
  const [alumni, setAlumni] = useState<Alumni[]>([]);
  const [sessions, setSessions] = useState<MentorshipSession[]>([]);
  
  // Interactive Chat Drawer state
  const [activeChatAlumni, setActiveChatAlumni] = useState<Alumni | null>(null);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [newMessageText, setNewMessageText] = useState('');
  const chatBottomRef = useRef<HTMLDivElement>(null);

  // Mentorship Session Modal state
  const [activeBookingAlumni, setActiveBookingAlumni] = useState<Alumni | null>(null);
  const [bookingForm, setBookingForm] = useState({
    topic: 'Resume Review',
    date: '',
    time: ''
  });
  const [bookingSuccess, setBookingSuccess] = useState(false);

  // Load database data
  const loadData = () => {
    setAlumni(db.getAlumni());
    setSessions(db.getSessions());
  };

  useEffect(() => {
    loadData();
  }, []);

  // Scroll chat to bottom when message list updates
  useEffect(() => {
    if (chatBottomRef.current) {
      chatBottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatMessages]);

  if (!userRole) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center p-8 bg-white rounded-2xl shadow-md border border-gray-100 max-w-md">
          <AlertCircle className="h-16 w-16 text-blue-600 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Please Select Your Role</h2>
          <p className="text-gray-600">Choose your role (Student, Alumni, or TPO) from the header navigation to access alumni connections.</p>
        </div>
      </div>
    );
  }

  // Get unique companies and domains for filters
  const companies = ['all', ...Array.from(new Set(alumni.map(person => person.company)))];
  const domains = ['all', ...Array.from(new Set(alumni.map(person => person.domain)))];

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
      case 'Available': return 'bg-green-100 text-green-800 border-green-200';
      case 'Busy': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Unavailable': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Open Chat Room
  const openChatRoom = (person: Alumni) => {
    setActiveChatAlumni(person);
    setChatMessages(db.getChatMessages(person.id));
  };

  // Close Chat Room
  const closeChatRoom = () => {
    setActiveChatAlumni(null);
    setChatMessages([]);
  };

  // Send message
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessageText.trim() || !activeChatAlumni) return;

    // Send student message
    const studentMsg = db.sendChatMessage({
      alumniId: activeChatAlumni.id,
      senderRole: 'student',
      senderName: 'Aman Varma',
      content: newMessageText.trim()
    });

    // Update message list instantly
    const updatedMessages = [...chatMessages, studentMsg];
    setChatMessages(updatedMessages);
    setNewMessageText('');

    // Generate simulated reply after 1 second
    setTimeout(() => {
      const replies = [
        "Hey! Thanks for writing to me. I'd love to help you prepare for this role. Are you available for a mock session next week?",
        "Hello Aman! That sounds like a great project. Let's schedule a session to review your resume structure.",
        "Sure, I can guide you on that. Feel free to book a general mentorship session using the booking button!",
        "Hi! ANITS has changed a lot. I'd be happy to share my interview experience at my company. Please book a slot."
      ];
      const randomReply = replies[Math.floor(Math.random() * replies.length)];

      const alumniMsg = db.sendChatMessage({
        alumniId: activeChatAlumni.id,
        senderRole: 'alumni',
        senderName: activeChatAlumni.name,
        content: randomReply
      });

      setChatMessages(prev => [...prev, alumniMsg]);
    }, 1000);
  };

  // Open mentorship scheduling modal
  const openBookingModal = (person: Alumni) => {
    setActiveBookingAlumni(person);
    setBookingForm({
      topic: 'Resume Review',
      date: new Date(Date.now() + 86400000).toISOString().split('T')[0], // tomorrow
      time: '14:00'
    });
    setBookingSuccess(false);
  };

  // Book mentorship session
  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeBookingAlumni) return;

    db.requestSession({
      alumniId: activeBookingAlumni.id,
      alumniName: activeBookingAlumni.name,
      studentName: 'Aman Varma',
      studentEmail: 'aman@example.com',
      topic: bookingForm.topic,
      date: bookingForm.date,
      time: bookingForm.time
    });

    setBookingSuccess(true);
    setTimeout(() => {
      setActiveBookingAlumni(null);
      loadData();
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Alumni Connect</h1>
          <p className="text-gray-600">Get direct mentorship, guidance, mock interviews, and referral support from your seniors working in tech.</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center hover:shadow-md transition-shadow">
            <Users className="h-8 w-8 text-blue-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">{alumni.length}</div>
            <div className="text-gray-500 text-sm font-medium">Active Alumni</div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center hover:shadow-md transition-shadow">
            <MessageCircle className="h-8 w-8 text-green-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">
              {alumni.reduce((sum, a) => sum + a.sessionsCompleted, 0)}+
            </div>
            <div className="text-gray-500 text-sm font-medium">Sessions Completed</div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center hover:shadow-md transition-shadow">
            <Star className="h-8 w-8 text-yellow-500 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">4.9</div>
            <div className="text-gray-500 text-sm font-medium">Average Rating</div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center hover:shadow-md transition-shadow">
            <Award className="h-8 w-8 text-purple-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">95%</div>
            <div className="text-gray-500 text-sm font-medium">Guidance Success</div>
          </div>
        </div>

        {/* Scheduled Sessions Tracker */}
        {sessions.filter(s => s.studentEmail === 'aman@example.com').length > 0 && (
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-8">
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
              <CalendarRange className="h-5 w-5 text-blue-600 mr-2" />
              My Mentorship Sessions
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {sessions.filter(s => s.studentEmail === 'aman@example.com').map(session => (
                <div key={session.id} className="p-4 border border-gray-100 rounded-lg bg-gray-50 flex items-start space-x-3">
                  <div className="p-2 bg-blue-100 text-blue-600 rounded-lg">
                    <Calendar className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">{session.alumniName}</h4>
                    <p className="text-sm text-gray-600">{session.topic}</p>
                    <p className="text-xs text-gray-500 mt-1">{session.date} • {session.time}</p>
                    <span className={`inline-block mt-2 px-2 py-0.5 rounded text-xs font-semibold ${
                      session.status === 'confirmed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {session.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Search and Filter */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name, company, or expertise..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>
            <div className="flex gap-2">
              <select
                value={selectedCompany}
                onChange={(e) => setSelectedCompany(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all bg-white"
              >
                <option value="all">All Companies</option>
                {companies.filter(c => c !== 'all').map(company => (
                  <option key={company} value={company}>{company}</option>
                ))}
              </select>
              <select
                value={selectedDomain}
                onChange={(e) => setSelectedDomain(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all bg-white"
              >
                <option value="all">All Domains</option>
                {domains.filter(d => d !== 'all').map(domain => (
                  <option key={domain} value={domain}>{domain}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Alumni Cards */}
        {filteredAlumni.length === 0 ? (
          <div className="bg-white text-center py-16 rounded-xl shadow-sm border border-gray-100">
            <Users className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No Alumni Found</h3>
            <p className="text-gray-600">Try modifying your search text or company/domain filters.</p>
          </div>
        ) : (
          <div className="grid lg:grid-cols-2 gap-6">
            {filteredAlumni.map((person) => (
              <div key={person.id} className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-shadow border border-gray-100 overflow-hidden flex flex-col justify-between">
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-4">
                      <img 
                        src={person.image || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=compress&cs=tinysrgb&w=150'} 
                        alt={person.name} 
                        className="w-16 h-16 rounded-full object-cover border-2 border-blue-100"
                      />
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">{person.name}</h3>
                        <p className="text-gray-600 font-medium text-sm">{person.role}</p>
                        <div className="flex items-center mt-1 text-gray-500 text-xs font-medium">
                          <Building2 className="h-4 w-4 mr-1 text-gray-400" />
                          <span>{person.company}</span>
                        </div>
                      </div>
                    </div>
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold border ${getAvailabilityColor(person.availability)}`}>
                      {person.availability}
                    </span>
                  </div>

                  <p className="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed">{person.bio}</p>

                  <div className="grid grid-cols-2 gap-3 mb-4 text-xs text-gray-500 bg-gray-50 p-3 rounded-lg">
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-1.5 text-gray-400" />
                      <span>{person.location}</span>
                    </div>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1.5 text-gray-400" />
                      <span>Graduated: {person.graduationYear}</span>
                    </div>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 mr-1.5 text-yellow-500" />
                      <span className="font-semibold text-gray-700">{person.rating} ({person.sessionsCompleted} sessions)</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1.5 text-gray-400" />
                      <span>Reply Time: {person.responseTime}</span>
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="text-xs font-bold text-gray-700 mb-1.5 uppercase tracking-wide">Expertise</div>
                    <div className="flex flex-wrap gap-1.5">
                      {person.expertise.map((skill, index) => (
                        <span key={index} className="px-2 py-0.5 bg-blue-50 text-blue-700 text-xs rounded-full font-semibold border border-blue-100">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mb-6">
                    <div className="text-xs font-bold text-gray-700 mb-1.5 uppercase tracking-wide">Recent Accomplishments</div>
                    <div className="space-y-1">
                      {person.achievements.map((achievement, index) => (
                        <div key={index} className="flex items-center text-xs text-gray-700 font-medium">
                          <Award className="h-3.5 w-3.5 mr-1.5 text-purple-500" />
                          <span>{achievement}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="p-6 pt-0 border-t border-gray-100 flex space-x-3 bg-gray-50 bg-opacity-30">
                  <button
                    onClick={() => openChatRoom(person)}
                    className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 px-4 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-colors flex items-center justify-center font-semibold text-sm shadow-sm"
                  >
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Message
                  </button>
                  <button 
                    onClick={() => openBookingModal(person)}
                    className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors text-gray-700 flex items-center justify-center"
                    title="Book Mentorship Session"
                  >
                    <BookOpen className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Load More */}
        <div className="text-center mt-8">
          <button className="bg-white border border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-50 transition-colors font-medium">
            Load More Alumni
          </button>
        </div>
      </div>

      {/* Floating Chat Box / Drawer (Right side) */}
      {activeChatAlumni && (
        <div className="fixed top-0 right-0 h-screen w-full sm:w-[450px] bg-white shadow-2xl z-50 flex flex-col border-l border-gray-200 animate-slide-in">
          {/* Header */}
          <div className="p-4 border-b border-gray-200 flex items-center justify-between bg-gradient-to-r from-blue-50 to-purple-50">
            <div className="flex items-center space-x-3">
              <img 
                src={activeChatAlumni.image} 
                alt={activeChatAlumni.name} 
                className="w-10 h-10 rounded-full object-cover border"
              />
              <div>
                <h4 className="font-bold text-gray-900 text-sm">{activeChatAlumni.name}</h4>
                <p className="text-xs text-green-600 font-semibold">{activeChatAlumni.role} @ {activeChatAlumni.company}</p>
              </div>
            </div>
            <button 
              onClick={closeChatRoom}
              className="p-1.5 hover:bg-gray-200 rounded-full transition-colors"
            >
              <X className="h-6 w-6 text-gray-500" />
            </button>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 bg-opacity-50">
            {chatMessages.length === 0 ? (
              <div className="text-center py-16 text-gray-400 text-sm">
                <MessageCircle className="h-12 w-12 mx-auto mb-2 text-gray-300" />
                <p>No messages yet. Say hi to {activeChatAlumni.name.split(' ')[0]} to start mentoring!</p>
              </div>
            ) : (
              chatMessages.map(msg => (
                <div 
                  key={msg.id} 
                  className={`flex flex-col max-w-[80%] ${msg.senderRole === 'student' ? 'ml-auto items-end' : 'mr-auto items-start'}`}
                >
                  <span className="text-[10px] text-gray-400 mb-0.5">{msg.senderName}</span>
                  <div className={`p-3 rounded-2xl text-sm leading-relaxed ${
                    msg.senderRole === 'student'
                      ? 'bg-blue-600 text-white rounded-tr-none'
                      : 'bg-white text-gray-800 border rounded-tl-none shadow-sm'
                  }`}>
                    {msg.content}
                  </div>
                  <span className="text-[9px] text-gray-400 mt-1">{msg.timestamp}</span>
                </div>
              ))
            )}
            <div ref={chatBottomRef} />
          </div>

          {/* Input Panel */}
          <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-200 bg-white flex items-center space-x-2">
            <input
              type="text"
              placeholder="Type your message..."
              value={newMessageText}
              onChange={(e) => setNewMessageText(e.target.value)}
              className="flex-1 px-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            />
            <button
              type="submit"
              disabled={!newMessageText.trim()}
              className={`p-2.5 rounded-xl text-white ${
                newMessageText.trim() ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-300 cursor-not-allowed'
              } transition-colors`}
            >
              <Send className="h-4 w-4" />
            </button>
          </form>
        </div>
      )}

      {/* Book Mentorship Session Modal */}
      {activeBookingAlumni && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full overflow-hidden shadow-2xl border border-gray-100">
            <div className="p-6 border-b border-gray-200 flex justify-between items-center bg-gradient-to-r from-blue-50 to-purple-50">
              <div>
                <h3 className="text-xl font-bold text-gray-900">Schedule Mentorship</h3>
                <p className="text-sm text-gray-600">With {activeBookingAlumni.name}</p>
              </div>
              <button 
                onClick={() => setActiveBookingAlumni(null)}
                className="p-1.5 hover:bg-gray-200 rounded-full transition-colors"
              >
                <X className="h-6 w-6 text-gray-500" />
              </button>
            </div>

            <form onSubmit={handleBookingSubmit} className="p-6 space-y-4">
              {bookingSuccess ? (
                <div className="text-center py-8">
                  <div className="bg-green-100 text-green-600 p-3 rounded-full w-fit mx-auto mb-4">
                    <Check className="h-12 w-12" />
                  </div>
                  <h4 className="text-lg font-bold text-gray-900 mb-1">Session Requested!</h4>
                  <p className="text-gray-600 text-sm">Your mentorship slot request has been sent to the alumni for approval.</p>
                </div>
              ) : (
                <>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Select Topic</label>
                    <select
                      value={bookingForm.topic}
                      onChange={(e) => setBookingForm({...bookingForm, topic: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                    >
                      <option value="Resume Review">Resume Critique & Review</option>
                      <option value="Mock Technical Interview">Mock Coding / Technical Interview</option>
                      <option value="System Design Basics">System Design Architecture</option>
                      <option value="General Mentorship">General Career Path Mentorship</option>
                      <option value="Salary Negotiation tips">Salary Negotiation Tips</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">Date</label>
                      <input 
                        type="date" 
                        required
                        value={bookingForm.date}
                        onChange={(e) => setBookingForm({...bookingForm, date: e.target.value})}
                        className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">Preferred Time</label>
                      <input 
                        type="time" 
                        required
                        value={bookingForm.time}
                        onChange={(e) => setBookingForm({...bookingForm, time: e.target.value})}
                        className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  <div className="flex space-x-3 pt-4">
                    <button
                      type="button"
                      onClick={() => setActiveBookingAlumni(null)}
                      className="flex-1 py-2.5 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="flex-1 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-lg hover:from-blue-700 hover:to-purple-700 transition-colors"
                    >
                      Request Slot
                    </button>
                  </div>
                </>
              )}
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AlumniConnect;