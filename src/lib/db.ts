// Client-side mock database using LocalStorage to allow the placement guide
// to be fully interactive and run out-of-the-box for anyone.

export interface Drive {
  id: number;
  company: string;
  role: string;
  location: string;
  package: string;
  deadline: string;
  eligibility: string;
  status: 'active' | 'upcoming' | 'closed';
  logo: string;
  description?: string;
  requirements?: string[];
}

export interface Alumni {
  id: number;
  name: string;
  role: string;
  company: string;
  location: string;
  graduationYear: number;
  experience: string;
  domain: string;
  rating: number;
  sessionsCompleted: number;
  expertise: string[];
  availability: 'Available' | 'Busy' | 'Unavailable';
  responseTime: string;
  languages: string[];
  bio: string;
  achievements: string[];
  image: string;
  linkedin: string;
}

export interface Comment {
  id: string;
  author: string;
  role: string;
  text: string;
  date: string;
}

export interface Blog {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  authorRole: string;
  date: string;
  category: string;
  readTime: string;
  likes: number;
  comments: number;
  commentsList: Comment[];
  views: string;
  featured: boolean;
  image: string;
}

export interface Application {
  id: string;
  driveId: number;
  companyName: string;
  roleName: string;
  studentName: string;
  studentEmail: string;
  studentCollege: string;
  gpa: string;
  skills: string;
  resumeLink: string;
  status: 'applied' | 'shortlisted' | 'selected' | 'rejected';
  appliedDate: string;
}

export interface ChatMessage {
  id: string;
  senderRole: 'student' | 'alumni' | 'tpo';
  senderName: string;
  alumniId: number; // to scope chat to specific alumni
  content: string;
  timestamp: string;
}

export interface MentorshipSession {
  id: string;
  alumniId: number;
  alumniName: string;
  studentName: string;
  studentEmail: string;
  topic: string;
  date: string;
  time: string;
  status: 'pending' | 'confirmed' | 'cancelled';
}

export interface Company {
  id: number;
  name: string;
  industry: string;
  location: string;
  employees: string;
  rating: number;
  packageRange: string;
  hiringFrequency: string;
  eligibility: string;
  openPositions: number;
  description: string;
  recentHires: number;
  logo: string;
}

export interface UserAccount {
  email: string;
  password?: string;
  role: 'student' | 'alumni' | 'tpo';
  name: string;
  college?: string;
  graduationYear?: string;
}

// Keys for LocalStorage
const KEYS = {
  DRIVES: 'pg_drives',
  ALUMNI: 'pg_alumni',
  BLOGS: 'pg_blogs',
  APPLICATIONS: 'pg_applications',
  MESSAGES: 'pg_messages',
  SESSIONS: 'pg_sessions',
  COMPANIES: 'pg_companies',
  SAVED_COMPANIES: 'pg_saved_companies',
  USERS: 'pg_users',
  ACTIVE_USER: 'pg_active_user',
};

// Seed Data
const defaultDrives: Drive[] = [
  {
    id: 1,
    company: 'Google',
    role: 'Software Engineer',
    location: 'Bangalore',
    package: '25-30 LPA',
    deadline: '2026-08-15',
    eligibility: '70% throughout',
    status: 'active',
    logo: 'https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?auto=compress&cs=tinysrgb&w=80',
    description: 'Join the Google Engineering team to develop systems at scale. You will work on cutting edge products like Google Search, Cloud, and AI systems.',
    requirements: ['CS/IT or related engineering background', 'Strong DSA problem solving in C++, Java, or Python', 'Basic understanding of system design principles']
  },
  {
    id: 2,
    company: 'Microsoft',
    role: 'Product Manager',
    location: 'Hyderabad',
    package: '22-28 LPA',
    deadline: '2026-08-20',
    eligibility: '75% throughout',
    status: 'active',
    logo: 'https://images.unsplash.com/photo-1625014618427-fbc980b974f5?auto=compress&cs=tinysrgb&w=80',
    description: 'Drive the direction of Microsoft products. As a PM, you will collaborate with engineering and design to conceptualize and ship high-impact features.',
    requirements: ['Exceptional leadership and communication skills', 'Tech-savvy with analytical mindset', 'Prior project management or internship experience is a plus']
  },
  {
    id: 3,
    company: 'Amazon',
    role: 'Data Scientist',
    location: 'Mumbai',
    package: '18-24 LPA',
    deadline: '2026-08-18',
    eligibility: '65% throughout',
    status: 'upcoming',
    logo: 'https://images.unsplash.com/photo-1523474253046-8cd2748b5fd2?auto=compress&cs=tinysrgb&w=80',
    description: 'Build machine learning algorithms to improve Amazon logistics, supply chain, and personalization models.',
    requirements: ['Strong foundations in probability, statistics, and linear algebra', 'Proficiency in Python/R and SQL', 'Experience with ML frameworks (Scikit-Learn, PyTorch)']
  },
  {
    id: 4,
    company: 'Flipkart',
    role: 'Frontend Developer',
    location: 'Bangalore',
    package: '15-20 LPA',
    deadline: '2026-08-25',
    eligibility: '70% throughout',
    status: 'active',
    logo: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=compress&cs=tinysrgb&w=80',
    description: 'Create responsive, smooth, and beautiful web interfaces for India\'s leading e-commerce application.',
    requirements: ['Expertise in React, HTML5, CSS3, and JavaScript', 'Experience with TailwindCSS or Styled Components', 'Performance optimization skills']
  }
];

const defaultAlumni: Alumni[] = [
  {
    id: 1,
    name: 'Harsha Vardhan Pentakota',
    role: 'Senior Software Engineer',
    company: 'Fact Set',
    location: 'Bangalore',
    graduationYear: 2024,
    experience: '2 years',
    domain: 'Software Development',
    rating: 4.9,
    sessionsCompleted: 45,
    expertise: ['System Design', 'DSA', 'Interview Prep'],
    availability: 'Available',
    responseTime: '< 2 hours',
    languages: ['English', 'Hindi', 'Telugu'],
    bio: 'Passionate about helping students crack top-tier tech companies. Specialized in system design and coding interviews.',
    achievements: ['Factset SDE L5', 'Mentor of the Year 2025'],
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=compress&cs=tinysrgb&w=150',
    linkedin: 'https://www.linkedin.com/in/harsha-vardhan-pentakota-657969259'
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
    bio: 'Helping students transition into network and product engineering roles. Expert in product strategy and market analysis.',
    achievements: ['Candela PM Excellence Award', 'Top Mentor 2025'],
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=compress&cs=tinysrgb&w=150',
    linkedin: 'https://www.linkedin.com/in/venu-madhav-murapaka-160465256'
  },
  {
    id: 3,
    name: 'RV Dhanush Kumar',
    role: 'Data Scientist',
    company: 'Inncircles',
    location: 'Mumbai',
    graduationYear: 2023,
    experience: '3 years',
    domain: 'Data Science',
    rating: 5.0,
    sessionsCompleted: 67,
    expertise: ['Machine Learning', 'Statistics', 'Python'],
    availability: 'Busy',
    responseTime: '< 24 hours',
    languages: ['English', 'Hindi', 'Marathi'],
    bio: 'Leading data science initiatives at Inncircles. Passionate about ML and helping students enter the field.',
    achievements: ['Inncircles Innovation Award', 'Published Researcher'],
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=compress&cs=tinysrgb&w=150',
    linkedin: 'https://www.linkedin.com/in/dhanush-awesome'
  },
  {
    id: 4,
    name: 'Hima Bindu Gogineni',
    role: 'Assistant Professor',
    company: 'ANITS',
    location: 'Visakhapatnam',
    graduationYear: 2022,
    experience: '4 years',
    domain: 'DevOps',
    rating: 4.7,
    sessionsCompleted: 28,
    expertise: ['AWS', 'Kubernetes', 'CI/CD'],
    availability: 'Available',
    responseTime: '< 6 hours',
    languages: ['English', 'Tamil', 'Telugu'],
    bio: 'Expert in cloud infrastructure and DevOps practices. Helping students build scalable systems.',
    achievements: ['AWS Certified Solutions Architect', 'DevOps Innovator'],
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=compress&cs=tinysrgb&w=150',
    linkedin: 'https://www.linkedin.com/in/gogineni-hima-bindu-b58355204'
  }
];

const defaultBlogs: Blog[] = [
  {
    id: 1,
    title: 'How I Cracked Google Interview in 3 Attempts',
    excerpt: 'My journey from rejection to acceptance at Google. Tips, strategies, and lessons learned along the way.',
    content: 'CRACKING GOOGLE: MY 3-YEAR JOURNEY\n\nGetting a job at Google was my dream since high school. But it didn\'t come easy. It took three attempts and plenty of failure to get here. Here are the key takeaways:\n\n1. Master the Fundamentals: Don\'t just memorize questions. Understand the underlying concepts of Data Structures & Algorithms. Learn to analyze time and space complexity instantly.\n\n2. Think Out Loud: In the interview, communication is as important as the code. Write clean code and explain your thought process at every step.\n\n3. Resume Matters: Highlight your projects with active metrics, e.g. "Optimized API load time by 35% using Redis caching."\n\nPersistence is key. Keep coding!',
    author: 'Priya Sharma',
    authorRole: 'SDE at Google',
    date: '2026-06-10',
    category: 'Interview Experience',
    readTime: '8 min read',
    likes: 234,
    comments: 2,
    commentsList: [
      { id: 'c1', author: 'Aman Varma', role: 'student', text: 'Super inspiring! Thanks for sharing this.', date: '2026-06-11' },
      { id: 'c2', author: 'Rahul Kumar', role: 'student', text: 'How long did you prepare for the system design round?', date: '2026-06-12' }
    ],
    views: '2.3k',
    featured: true,
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=compress&cs=tinysrgb&w=600'
  },
  {
    id: 2,
    title: 'Complete Preparation Guide for Technical Interviews',
    excerpt: 'A comprehensive guide covering data structures, algorithms, system design, and behavioral questions.',
    content: 'TECHNICAL INTERVIEW ULTIMATE PREP GUIDE\n\nPreparing for tech interviews can feel overwhelming. Let\'s break it down into manageable segments:\n\n- Month 1: Basic DSA. Arrays, Linked Lists, Stacks, Queues, Recursion.\n- Month 2: Advanced DSA. Trees, Graphs, Dynamic Programming, Backtracking.\n- Month 3: System Design. High-Level Design (HLD), Low-Level Design (LLD), databases, caching, load balancers.\n- Month 4: Mock interviews and behavioral prep (STAR method).\n\nFocus on quality over quantity. Solving 150 well-chosen problems is better than 500 random ones.',
    author: 'Rahul Kumar',
    authorRole: 'Software Engineer at Microsoft',
    date: '2026-06-08',
    category: 'Preparation Guide',
    readTime: '12 min read',
    likes: 189,
    comments: 0,
    commentsList: [],
    views: '1.8k',
    featured: false,
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=compress&cs=tinysrgb&w=600'
  },
  {
    id: 3,
    title: 'My Amazon Internship Experience and Full-Time Offer',
    excerpt: 'From internship application to receiving a full-time offer. What to expect and how to excel.',
    content: 'AMAZON INTERNSHIP CHRONICLES\n\nI joined Amazon as a summer intern, and at the end of 8 weeks, I received a Pre-Placement Offer (PPO). Here is what worked for me:\n\n- Ask Questions: Don\'t stay blocked for more than 2 hours without seeking help. But when you ask, show what you have already tried.\n- Master the Leadership Principles: Amazon\'s culture revolves around its Leadership Principles. Own your project, show bias for action, and invent/simplify wherever possible.\n- Document Everything: Keep a daily log of what you did, errors resolved, and architecture decisions. This is extremely useful for the final presentation.',
    author: 'Sneha Patel',
    authorRole: 'Product Manager at Amazon',
    date: '2026-06-05',
    category: 'Internship',
    readTime: '6 min read',
    likes: 156,
    comments: 0,
    commentsList: [],
    views: '1.5k',
    featured: false,
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=compress&cs=tinysrgb&w=600'
  }
];

const defaultCompanies: Company[] = [
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
    description: 'Leading technology company focused on search, cloud computing, consumer electronics, and AI.',
    recentHires: 45,
    logo: 'https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?auto=compress&cs=tinysrgb&w=80'
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
    description: 'Global technology giant developing software, personal computers, systems, and cloud services.',
    recentHires: 38,
    logo: 'https://images.unsplash.com/photo-1625014618427-fbc980b974f5?auto=compress&cs=tinysrgb&w=80'
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
    description: 'E-commerce, digital streaming, hardware, and AWS cloud computing leader.',
    recentHires: 52,
    logo: 'https://images.unsplash.com/photo-1523474253046-8cd2748b5fd2?auto=compress&cs=tinysrgb&w=80'
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
    description: 'Global IT service provider and consulting firm based in India.',
    recentHires: 180,
    logo: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=compress&cs=tinysrgb&w=80'
  }
];

// Helper to check and initialize localStorage
const initializeDB = () => {
  if (!localStorage.getItem(KEYS.DRIVES)) {
    localStorage.setItem(KEYS.DRIVES, JSON.stringify(defaultDrives));
  }
  if (!localStorage.getItem(KEYS.ALUMNI)) {
    localStorage.setItem(KEYS.ALUMNI, JSON.stringify(defaultAlumni));
  }
  if (!localStorage.getItem(KEYS.BLOGS)) {
    localStorage.setItem(KEYS.BLOGS, JSON.stringify(defaultBlogs));
  }
  if (!localStorage.getItem(KEYS.COMPANIES)) {
    localStorage.setItem(KEYS.COMPANIES, JSON.stringify(defaultCompanies));
  }
  if (!localStorage.getItem(KEYS.APPLICATIONS)) {
    localStorage.setItem(KEYS.APPLICATIONS, JSON.stringify([]));
  }
  if (!localStorage.getItem(KEYS.MESSAGES)) {
    localStorage.setItem(KEYS.MESSAGES, JSON.stringify([]));
  }
  if (!localStorage.getItem(KEYS.SESSIONS)) {
    localStorage.setItem(KEYS.SESSIONS, JSON.stringify([]));
  }
  if (!localStorage.getItem(KEYS.USERS)) {
    const seedUsers: UserAccount[] = [
      {
        email: 'student@example.com',
        password: 'student123',
        role: 'student',
        name: 'Aman Varma',
        college: 'ANITS',
        graduationYear: '2026'
      },
      {
        email: 'alumni@example.com',
        password: 'alumni123',
        role: 'alumni',
        name: 'Harsha Vardhan',
        college: 'ANITS',
        graduationYear: '2024'
      },
      {
        email: 'tpo@example.com',
        password: 'tpo123',
        role: 'tpo',
        name: 'TPO Admin'
      }
    ];
    localStorage.setItem(KEYS.USERS, JSON.stringify(seedUsers));
  }
};

// Initialize right away when imported
initializeDB();

// Database Access Functions
export const db = {
  // Drives
  getDrives: (): Drive[] => {
    initializeDB();
    return JSON.parse(localStorage.getItem(KEYS.DRIVES) || '[]');
  },
  addDrive: (drive: Omit<Drive, 'id'>): Drive => {
    const drives = db.getDrives();
    const newDrive: Drive = {
      ...drive,
      id: drives.length > 0 ? Math.max(...drives.map(d => d.id)) + 1 : 1
    };
    drives.push(newDrive);
    localStorage.setItem(KEYS.DRIVES, JSON.stringify(drives));
    return newDrive;
  },
  updateDrive: (drive: Drive): void => {
    const drives = db.getDrives();
    const updated = drives.map(d => d.id === drive.id ? drive : d);
    localStorage.setItem(KEYS.DRIVES, JSON.stringify(updated));
  },
  deleteDrive: (id: number): void => {
    const drives = db.getDrives();
    const filtered = drives.filter(d => d.id !== id);
    localStorage.setItem(KEYS.DRIVES, JSON.stringify(filtered));
  },

  // Alumni
  getAlumni: (): Alumni[] => {
    initializeDB();
    return JSON.parse(localStorage.getItem(KEYS.ALUMNI) || '[]');
  },
  updateAlumni: (alumni: Alumni): void => {
    const allAlumni = db.getAlumni();
    const updated = allAlumni.map(a => a.id === alumni.id ? alumni : a);
    localStorage.setItem(KEYS.ALUMNI, JSON.stringify(updated));
  },

  // Blogs
  getBlogs: (): Blog[] => {
    initializeDB();
    return JSON.parse(localStorage.getItem(KEYS.BLOGS) || '[]');
  },
  addBlog: (blog: Omit<Blog, 'id' | 'likes' | 'comments' | 'commentsList' | 'views'>): Blog => {
    const blogs = db.getBlogs();
    const newBlog: Blog = {
      ...blog,
      id: blogs.length > 0 ? Math.max(...blogs.map(b => b.id)) + 1 : 1,
      likes: 0,
      comments: 0,
      commentsList: [],
      views: '1'
    };
    blogs.unshift(newBlog);
    localStorage.setItem(KEYS.BLOGS, JSON.stringify(blogs));
    return newBlog;
  },
  likeBlog: (id: number): number => {
    const blogs = db.getBlogs();
    let newLikes = 0;
    const updated = blogs.map(b => {
      if (b.id === id) {
        b.likes += 1;
        newLikes = b.likes;
      }
      return b;
    });
    localStorage.setItem(KEYS.BLOGS, JSON.stringify(updated));
    return newLikes;
  },
  addCommentToBlog: (id: number, text: string, author: string, role: string): Comment => {
    const blogs = db.getBlogs();
    const newComment: Comment = {
      id: Math.random().toString(36).substr(2, 9),
      author,
      role,
      text,
      date: new Date().toISOString().split('T')[0]
    };
    const updated = blogs.map(b => {
      if (b.id === id) {
        b.commentsList = b.commentsList || [];
        b.commentsList.push(newComment);
        b.comments = b.commentsList.length;
      }
      return b;
    });
    localStorage.setItem(KEYS.BLOGS, JSON.stringify(updated));
    return newComment;
  },

  // Applications
  getApplications: (): Application[] => {
    initializeDB();
    return JSON.parse(localStorage.getItem(KEYS.APPLICATIONS) || '[]');
  },
  applyToDrive: (application: Omit<Application, 'id' | 'status' | 'appliedDate'>): Application => {
    const apps = db.getApplications();
    const newApp: Application = {
      ...application,
      id: Math.random().toString(36).substr(2, 9),
      status: 'applied',
      appliedDate: new Date().toISOString().split('T')[0]
    };
    apps.push(newApp);
    localStorage.setItem(KEYS.APPLICATIONS, JSON.stringify(apps));
    return newApp;
  },
  updateApplicationStatus: (appId: string, status: Application['status']): void => {
    const apps = db.getApplications();
    const updated = apps.map(a => a.id === appId ? { ...a, status } : a);
    localStorage.setItem(KEYS.APPLICATIONS, JSON.stringify(updated));
  },

  // Chat Messages
  getChatMessages: (alumniId: number): ChatMessage[] => {
    initializeDB();
    const msgs: ChatMessage[] = JSON.parse(localStorage.getItem(KEYS.MESSAGES) || '[]');
    return msgs.filter(m => m.alumniId === alumniId);
  },
  sendChatMessage: (msg: Omit<ChatMessage, 'id' | 'timestamp'>): ChatMessage => {
    const msgs: ChatMessage[] = JSON.parse(localStorage.getItem(KEYS.MESSAGES) || '[]');
    const newMsg: ChatMessage = {
      ...msg,
      id: Math.random().toString(36).substr(2, 9),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    msgs.push(newMsg);
    localStorage.setItem(KEYS.MESSAGES, JSON.stringify(msgs));
    return newMsg;
  },

  // Mentorship Sessions
  getSessions: (): MentorshipSession[] => {
    initializeDB();
    return JSON.parse(localStorage.getItem(KEYS.SESSIONS) || '[]');
  },
  requestSession: (session: Omit<MentorshipSession, 'id' | 'status'>): MentorshipSession => {
    const sessions = db.getSessions();
    const newSession: MentorshipSession = {
      ...session,
      id: Math.random().toString(36).substr(2, 9),
      status: 'pending'
    };
    sessions.push(newSession);
    localStorage.setItem(KEYS.SESSIONS, JSON.stringify(sessions));
    return newSession;
  },
  updateSessionStatus: (sessionId: string, status: MentorshipSession['status']): void => {
    const sessions = db.getSessions();
    const updated = sessions.map(s => s.id === sessionId ? { ...s, status } : s);
    localStorage.setItem(KEYS.SESSIONS, JSON.stringify(updated));
  },

  // Companies & Saved Companies
  getCompanies: (): Company[] => {
    initializeDB();
    return JSON.parse(localStorage.getItem(KEYS.COMPANIES) || '[]');
  },
  getSavedCompanies: (): Company[] => {
    return JSON.parse(localStorage.getItem(KEYS.SAVED_COMPANIES) || '[]');
  },
  saveCompany: (company: Company): void => {
    const saved = db.getSavedCompanies();
    if (!saved.some(c => c.id === company.id)) {
      saved.push(company);
      localStorage.setItem(KEYS.SAVED_COMPANIES, JSON.stringify(saved));
    }
  },
  removeSavedCompany: (id: number): void => {
    const saved = db.getSavedCompanies();
    const filtered = saved.filter(c => c.id !== id);
    localStorage.setItem(KEYS.SAVED_COMPANIES, JSON.stringify(filtered));
  },

  // Authentication & Users
  getUsers: (): UserAccount[] => {
    initializeDB();
    return JSON.parse(localStorage.getItem(KEYS.USERS) || '[]');
  },
  registerUser: (user: UserAccount): { success: boolean; error?: string } => {
    const users = db.getUsers();
    if (users.some(u => u.email.toLowerCase() === user.email.toLowerCase())) {
      return { success: false, error: 'User with this email already exists.' };
    }
    users.push(user);
    localStorage.setItem(KEYS.USERS, JSON.stringify(users));
    return { success: true };
  },
  loginUser: (email: string, password: string, role: 'student' | 'alumni' | 'tpo'): { success: boolean; user?: UserAccount; error?: string } => {
    const users = db.getUsers();
    const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());
    
    if (!user) {
      return { success: false, error: 'Account not found with this email.' };
    }
    if (user.password !== password) {
      return { success: false, error: 'Invalid password.' };
    }
    if (user.role !== role) {
      return { success: false, error: `Invalid role selected. This email is registered as a ${user.role}.` };
    }

    // Set active user session
    const sessionUser = { ...user };
    delete sessionUser.password;
    localStorage.setItem(KEYS.ACTIVE_USER, JSON.stringify(sessionUser));
    localStorage.setItem('pg_role', role); // Sync header role
    return { success: true, user: sessionUser };
  },
  getActiveUser: (): UserAccount | null => {
    const userStr = localStorage.getItem(KEYS.ACTIVE_USER);
    if (!userStr) return null;
    try {
      return JSON.parse(userStr);
    } catch {
      return null;
    }
  },
  logoutUser: (): void => {
    localStorage.removeItem(KEYS.ACTIVE_USER);
    localStorage.removeItem('pg_role');
  }
};
