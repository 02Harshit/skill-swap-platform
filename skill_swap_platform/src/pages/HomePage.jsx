import React, { useState, useEffect } from 'react';
import { User, MapPin, Clock, Star, Search, Menu, X, LogIn, UserPlus } from 'lucide-react';

const HomePage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState('login');

  // Mock data for demonstration
  const mockUsers = [
    {
      id: 1,
      name: "Alice Johnson",
      location: "San Francisco, CA",
      profilePhoto: "https://images.unsplash.com/photo-1494790108755-2616b612b5bc?w=150&h=150&fit=crop&crop=face",
      skillsOffered: ["React", "JavaScript", "UI/UX Design"],
      skillsWanted: ["Python", "Data Analysis", "Machine Learning"],
      availability: "Weekends, Evenings",
      rating: 4.8,
      isPublic: true
    },
    {
      id: 2,
      name: "Bob Smith",
      location: "New York, NY",
      profilePhoto: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      skillsOffered: ["Python", "Data Science", "SQL"],
      skillsWanted: ["React", "Frontend Development", "AWS"],
      availability: "Weekdays after 6 PM",
      rating: 4.9,
      isPublic: true
    },
    {
      id: 3,
      name: "Carol Davis",
      location: "Austin, TX",
      profilePhoto: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      skillsOffered: ["Photoshop", "Illustrator", "Branding"],
      skillsWanted: ["Video Editing", "Motion Graphics", "3D Modeling"],
      availability: "Flexible",
      rating: 4.7,
      isPublic: true
    },
    {
      id: 4,
      name: "David Wilson",
      location: "Seattle, WA",
      profilePhoto: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      skillsOffered: ["Node.js", "MongoDB", "DevOps"],
      skillsWanted: ["Mobile Development", "Swift", "Kotlin"],
      availability: "Weekends",
      rating: 4.6,
      isPublic: true
    },
    {
      id: 5,
      name: "Emma Brown",
      location: "Chicago, IL",
      profilePhoto: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
      skillsOffered: ["Content Writing", "SEO", "Digital Marketing"],
      skillsWanted: ["Web Development", "WordPress", "E-commerce"],
      availability: "Evenings",
      rating: 4.8,
      isPublic: true
    },
    {
      id: 6,
      name: "Frank Miller",
      location: "Los Angeles, CA",
      profilePhoto: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
      skillsOffered: ["Video Editing", "After Effects", "Cinematography"],
      skillsWanted: ["Sound Design", "Music Production", "Animation"],
      availability: "Weekends, Evenings",
      rating: 4.9,
      isPublic: true
    }
  ];

  useEffect(() => {
    setUsers(mockUsers);
  }, []);

  const filteredUsers = users.filter(user => 
    user.isPublic && (
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.skillsOffered.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase())) ||
      user.skillsWanted.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()))
    )
  );

  const handleLogin = (email, password) => {
    // Mock login logic
    setCurrentUser({ id: 1, name: "John Doe", email });
    setIsLoggedIn(true);
    setShowAuthModal(false);
  };

  const handleRegister = (name, email, password) => {
    // Mock register logic
    setCurrentUser({ id: 1, name, email });
    setIsLoggedIn(true);
    setShowAuthModal(false);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentUser(null);
  };

  const handleSwapRequest = (userId) => {
    if (!isLoggedIn) {
      setShowAuthModal(true);
      setAuthMode('login');
    } else {
      // Handle swap request logic
      alert(`Swap request sent to user ${userId}!`);
    }
  };

  const AuthModal = () => {
    const [formData, setFormData] = useState({
      name: '',
      email: '',
      password: ''
    });

    const handleSubmit = () => {
      if (authMode === 'login') {
        handleLogin(formData.email, formData.password);
      } else {
        handleRegister(formData.name, formData.email, formData.password);
      }
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-lg p-6 w-full max-w-md">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">
              {authMode === 'login' ? 'Login' : 'Register'}
            </h2>
            <button
              onClick={() => setShowAuthModal(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              <X size={24} />
            </button>
          </div>
          
          <div className="space-y-4">
            {authMode === 'register' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            )}
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                required
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <button
              onClick={handleSubmit}
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors"
            >
              {authMode === 'login' ? 'Login' : 'Register'}
            </button>
          </div>
          
          <div className="mt-4 text-center">
            <button
              onClick={() => setAuthMode(authMode === 'login' ? 'register' : 'login')}
              className="text-blue-600 hover:text-blue-800"
            >
              {authMode === 'login' 
                ? "Don't have an account? Register" 
                : "Already have an account? Login"
              }
            </button>
          </div>
        </div>
      </div>
    );
  };

  const UserCard = ({ user }) => (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-6 border border-gray-200">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center">
          <img
            src={user.profilePhoto || `https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face`}
            alt={user.name}
            className="w-16 h-16 rounded-full object-cover mr-4"
          />
          <div>
            <h3 className="text-lg font-semibold text-gray-800">{user.name}</h3>
            {user.location && (
              <p className="text-gray-600 flex items-center mt-1">
                <MapPin size={16} className="mr-1" />
                {user.location}
              </p>
            )}
            <div className="flex items-center mt-1">
              <Star size={16} className="text-yellow-400 mr-1" />
              <span className="text-sm text-gray-600">{user.rating}</span>
            </div>
          </div>
        </div>
        <button
          onClick={() => handleSwapRequest(user.id)}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors font-medium"
        >
          Request
        </button>
      </div>
      
      <div className="mb-4">
        <h4 className="text-sm font-medium text-gray-800 mb-2">Skills Offered:</h4>
        <div className="flex flex-wrap gap-2">
          {user.skillsOffered.map((skill, index) => (
            <span
              key={index}
              className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
      
      <div className="mb-4">
        <h4 className="text-sm font-medium text-gray-800 mb-2">Skills Wanted:</h4>
        <div className="flex flex-wrap gap-2">
          {user.skillsWanted.map((skill, index) => (
            <span
              key={index}
              className="bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded-full"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
      
      <div className="flex items-center text-sm text-gray-600">
        <Clock size={16} className="mr-1" />
        {user.availability}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <h1 className="text-2xl font-bold text-blue-600">Skill Swap</h1>
              </div>
            </div>
            
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                {isLoggedIn ? (
                  <div className="flex items-center space-x-4">
                    <span className="text-gray-700">Welcome, {currentUser?.name}!</span>
                    <button
                      onClick={handleLogout}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      Logout
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => {
                        setAuthMode('login');
                        setShowAuthModal(true);
                      }}
                      className="flex items-center px-4 py-2 text-gray-700 hover:text-blue-600 transition-colors"
                    >
                      <LogIn size={20} className="mr-2" />
                      Login
                    </button>
                    <button
                      onClick={() => {
                        setAuthMode('register');
                        setShowAuthModal(true);
                      }}
                      className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                    >
                      <UserPlus size={20} className="mr-2" />
                      Register
                    </button>
                  </div>
                )}
              </div>
            </div>
            
            <div className="md:hidden">
              <button
                onClick={() => setShowMobileMenu(!showMobileMenu)}
                className="text-gray-500 hover:text-gray-700"
              >
                {showMobileMenu ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
        
        {/* Mobile menu */}
        {showMobileMenu && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
              {isLoggedIn ? (
                <div>
                  <span className="block px-3 py-2 text-gray-700">Welcome, {currentUser?.name}!</span>
                  <button
                    onClick={handleLogout}
                    className="block px-3 py-2 text-gray-500 hover:text-gray-700"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div>
                  <button
                    onClick={() => {
                      setAuthMode('login');
                      setShowAuthModal(true);
                      setShowMobileMenu(false);
                    }}
                    className="block px-3 py-2 text-gray-700 hover:text-blue-600"
                  >
                    Login
                  </button>
                  <button
                    onClick={() => {
                      setAuthMode('register');
                      setShowAuthModal(true);
                      setShowMobileMenu(false);
                    }}
                    className="block px-3 py-2 text-blue-600 hover:text-blue-800"
                  >
                    Register
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h2 className="text-4xl font-bold mb-4">
              Trade Skills, Build Connections
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Connect with skilled professionals and exchange knowledge. Learn new skills while teaching others what you know best.
            </p>
            
            {/* Search Bar */}
            <div className="max-w-md mx-auto">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search skills..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-2">
            Available Skill Swappers
          </h3>
          <p className="text-gray-600">
            {filteredUsers.length} professionals ready to share their expertise
          </p>
        </div>
        
        {filteredUsers.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No users found matching your search.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredUsers.map((user) => (
              <UserCard key={user.id} user={user} />
            ))}
          </div>
        )}
      </div>

      {/* Auth Modal */}
      {showAuthModal && <AuthModal />}
    </div>
  );
};

export default HomePage;