import React, { useState, useEffect } from 'react';
import {
  Search,
  MapPin,
  Star,
  BookOpen,
  Filter,
  User,
  Lightbulb,
  GraduationCap,
  Sparkles,
  ClipboardCheck,
  Target,
  Heart,
  Users,
  Award,
  Globe,
  TrendingUp,
  Atom,
  Feather,
  PencilRuler,
  MonitorPlay,
  Calculator,
  Laptop,
  Trophy,
  Book,
  PenTool,
  Code,
  FlaskConical,
  Puzzle,
  Briefcase
} from 'lucide-react';

// Moved SearchInput component outside the main component to prevent it from being re-created on every render.
const SearchInput = ({ searchTerm, setSearchTerm }) => (
  <div className="relative w-full">
    <div className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: "#06B6D4" }}>
      <Search size={20} />
    </div>
    <input
      type="text"
      placeholder="Search by name, subject, or location..."
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      className="w-full rounded-full border py-3 pl-12 pr-6 text-base placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
      style={{ backgroundColor: "#F9FAFB", borderColor: "#E5E7EB", color: "#1F2937" }}
    />
  </div>
);


const FloatingIcons = () => {
  const icons = [
    { icon: GraduationCap, color: '#F59E0B' },
    { icon: Atom, color: '#06B6D4' },
    { icon: Feather, color: '#EF4444' },
    { icon: PencilRuler, color: '#1E3A8A' },
    { icon: Globe, color: '#F97316' },
    { icon: Award, color: '#10B981' },
    { icon: MonitorPlay, color: '#6366F1' },
    { icon: Calculator, color: '#EC4899' },
    { icon: Laptop, color: '#8B5CF6' },
    { icon: Trophy, color: '#FFD700' }, // Gold
    { icon: Star, color: '#F59E0B' },
    { icon: Book, color: '#06B6D4' },
    { icon: PenTool, color: '#EF4444' },
    { icon: Code, color: '#1E3A8A' },
    { icon: FlaskConical, color: '#F97316' },
    { icon: Puzzle, color: '#10B981' },
    { icon: Briefcase, color: '#6366F1' },
  ];

  const floatingIconPositions = [
    { top: '15%', left: '10%', size: '32px', duration: '12s', delay: '1s' },
    { top: '30%', left: '85%', size: '40px', duration: '10s', delay: '0.5s' },
    { top: '55%', left: '20%', size: '28px', duration: '15s', delay: '2s' },
    { top: '70%', left: '60%', size: '36px', duration: '11s', delay: '3s' },
    { top: '80%', left: '90%', size: '44px', duration: '13s', delay: '1.5s' },
    { top: '40%', left: '5%', size: '30px', duration: '14s', delay: '2.5s' },
    { top: '10%', left: '70%', size: '38px', duration: '12s', delay: '4s' },
    { top: '90%', left: '40%', size: '32px', duration: '10s', delay: '0s' },
    { top: '25%', left: '45%', size: '42px', duration: '16s', delay: '3.5s' },
    { top: '65%', left: '5%', size: '35px', duration: '13s', delay: '1s' },
    { top: '5%', left: '30%', size: '30px', duration: '11s', delay: '2s' },
    { top: '75%', left: '75%', size: '40px', duration: '15s', delay: '0.5s' },
    { top: '20%', left: '95%', size: '25px', duration: '14s', delay: '3s' },
    { top: '50%', left: '50%', size: '50px', duration: '18s', delay: '4.5s' },
    { top: '85%', left: '15%', size: '38px', duration: '12s', delay: '2.5s' },
    { top: '35%', left: '70%', size: '30px', duration: '10s', delay: '1s' },
    { top: '95%', left: '55%', size: '45px', duration: '16s', delay: '3.5s' },
    { top: '10%', left: '50%', size: '35px', duration: '14s', delay: '0s' },
    { top: '45%', left: '90%', size: '28px', duration: '11s', delay: '2s' },
    { top: '60%', left: '30%', size: '40px', duration: '13s', delay: '1.5s' },
  ];
    return (
    <div className="absolute inset-0 z-10 pointer-events-none">
      {floatingIconPositions.map((pos, index) => {
        const IconComponent = icons[index % icons.length].icon;
        const color = icons[index % icons.length].color;
        return (
          <div
            key={index}
            className="absolute icon-float"
            style={{
              top: pos.top,
              left: pos.left,
              animationDuration: pos.duration,
              animationDelay: pos.delay,
            }}
          >
            <IconComponent size={pos.size} strokeWidth={1.5} style={{ color: color, opacity: 0.5 }} />
          </div>
        );
      })}
    </div>
  );
};

const FindTutorPage = () => {
  const [tutors, setTutors] = useState([]);
  const [filteredTutors, setFilteredTutors] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  // Fetch tutors from backend API
  useEffect(() => {
    fetchTutors();
  }, []);

  // Apply filters whenever search term, subject, or tutors change
  useEffect(() => {
    applyFilters();
  }, [searchTerm, selectedSubject, tutors]);

  const fetchTutors = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch('http://localhost:5000/api/v1/tutor/all-tutors');
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      setTutors(data);
    } catch (err) {
      console.error('Error fetching tutors:', err);
      setError('Failed to load tutors. Please check your connection and try again.');
      
      // Fallback to mock data if API fails
     /* const mockTutors = [
        {
          _id: "1",
          name: "Dr. Adjoa Mensah",
          tutorProfile: {
            bio: "An experienced physicist with a passion for teaching. I specialize in making complex topics simple and engaging for all students.",
            courses: ["Physics", "Mathematics", "Chemistry"],
            location: "Accra, Ghana",
          },
        },
        {
          _id: "2",
          name: "Mr. Kwame Nkrumah",
          tutorProfile: {
            bio: "A dedicated history teacher focusing on West African and world history. I believe in interactive lessons and critical thinking.",
            courses: ["History", "Geography", "Social Studies"],
            location: "Kumasi, Ghana",
          },
        },
        {
          _id: "3",
          name: "Ms. Afua Botwe",
          tutorProfile: {
            bio: "An enthusiastic tutor for English and Literature. I help students improve their writing skills and develop a love for reading.",
            courses: ["English Language", "Literature"],
            location: "Tema, Ghana",
          },
        },
        {
          _id: "4",
          name: "Mr. Daniel Osei",
          tutorProfile: {
            bio: "A computer science professional with a knack for coding and algorithm design. I provide practical lessons in programming.",
            courses: ["Computer Science", "Coding", "Mathematics"],
            location: "Accra, Ghana",
          },
        },
      ];
      setTutors(mockTutors);
      */
    } finally {
      setLoading(false);
    }
  };

  // Search tutors from backend API
  const searchTutors = async (searchDetail) => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch('http://localhost:5000/api/v1/tutor/find-a-tutor', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ detail: searchDetail }),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      setTutors(data);
    } catch (err) {
      console.error('Error searching tutors:', err);
      setError('Search failed. Applying local filters instead.');
      // If search fails, apply local filters to existing tutors
      applyFilters();
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = tutors;
    
    // If there's a search term, search in the backend or apply local filter
    if (searchTerm.trim()) {
      // For complex searches, use backend search
      if (searchTerm.length > 2) {
        searchTutors(searchTerm);
        return;
      }
      
      // For short searches, apply local filter
      filtered = filtered.filter(tutor => {
        const nameMatch = tutor.name?.toLowerCase().includes(searchTerm.toLowerCase());
        const subjectMatch = tutor.tutorProfile?.courses?.some(course => 
          course.toLowerCase().includes(searchTerm.toLowerCase())
        );
        const locationMatch = tutor.tutorProfile?.location?.toLowerCase().includes(searchTerm.toLowerCase());
        const bioMatch = tutor.tutorProfile?.bio?.toLowerCase().includes(searchTerm.toLowerCase());
        
        return nameMatch || subjectMatch || locationMatch || bioMatch;
      });
    }

    // Apply subject filter locally
    if (selectedSubject) {
      filtered = filtered.filter(tutor => 
        tutor.tutorProfile?.courses?.includes(selectedSubject)
      );
    }

    setFilteredTutors(filtered);
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedSubject('');
    fetchTutors(); // Reset to all tutors
  };

  // Get unique subjects from all tutors
  const subjects = Array.from(new Set(
    tutors.flatMap(tutor => tutor.tutorProfile?.courses || [])
  )).filter(Boolean).sort();

  const FilterButton = () => (
    <button
      onClick={() => setShowFilters(!showFilters)}
      className="flex items-center justify-center space-x-2 px-6 py-3 rounded-full font-semibold border-2 transition-all duration-300 transform hover:scale-105"
      style={{
        color: "#1E3A8A",
        borderColor: "#1E3A8A",
        backgroundColor: "transparent",
        transition: "all 0.3s ease-in-out",
      }}
      onMouseEnter={(e) => {
        e.target.style.backgroundColor = "#1E3A8A";
        e.target.style.color = "white";
        e.target.style.boxShadow = "0 10px 25px -5px rgba(30, 58, 138, 0.25)";
      }}
      onMouseLeave={(e) => {
        e.target.style.backgroundColor = "transparent";
        e.target.style.color = "#1E3A8A";
        e.target.style.boxShadow = "none";
      }}
    >
      <Filter className="h-5 w-5" />
      <span>Filters</span>
      {(searchTerm || selectedSubject) && (
        <span className="ml-2 px-2 py-0.5 rounded-full text-xs font-semibold" style={{ backgroundColor: "#F59E0B", color: "white" }}>
          1
        </span>
      )}
    </button>
  );

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#F9FAFB", color: "#374151" }}>
      {/* Hero Section */}
      <div
        className="py-20 lg:py-28 relative overflow-hidden rounded-b-3xl shadow-xl"
        style={{
          background: "linear-gradient(135deg, #1E3A8A, #06B6D4, #1E3A8A)",
          backgroundSize: "200% 200%",
          animation: "gradient 3s ease infinite",
          color: "white",
        }}
      >
        {/* Floating Icons */}
        <FloatingIcons />

        <div className="relative z-10 max-w-6xl mx-auto px-6 text-center animate-fade-in-down">
          <h1
            className="text-4xl md:text-5xl font-extrabold text-white mb-4"
            style={{ textShadow: "0 4px 6px rgba(0, 0, 0, 0.1)" }}
          >
            Find Your Perfect Tutor
          </h1>
          <p
            className="text-lg md:text-xl max-w-3xl mx-auto"
            style={{ color: "rgba(255, 255, 255, 0.9)" }}
          >
            Browse our curated list of qualified tutors and find the right one to help you achieve your academic goals.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Search & Filter Section */}
        <div className="bg-white rounded-3xl shadow-xl p-6 mb-8 animate-fade-in">
          <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4">
            <SearchInput searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            <FilterButton />
          </div>
          {showFilters && (
            <div className="mt-4 pt-4 border-t" style={{ borderColor: "#E5E7EB" }}>
              <label className="block text-sm font-semibold mb-2" style={{ color: "#1F2937" }}>Subject Area</label>
              <select
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
                className="w-full rounded-full border py-3 px-6 text-base focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                style={{ backgroundColor: "#F0F2F5", borderColor: "#E5E7EB", color: "#1F2937" }}
              >
                <option value="">All Subjects</option>
                {subjects.map((subject, index) => (
                  <option key={index} value={subject}>{subject}</option>
                ))}
              </select>
            </div>
          )}
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-8 animate-fade-in">
            <span className="block sm:inline">{error}</span>
          </div>
        )}

        {/* Tutor List Section */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2" style={{ borderColor: "#1E3A8A" }}></div>
            <p className="ml-4" style={{ color: "#374151" }}>Loading tutors...</p>
          </div>
        ) : filteredTutors.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredTutors.map(tutor => (
              <div
                key={tutor._id}
                className="bg-white rounded-2xl shadow-md p-6 transform transition-transform hover:scale-105 hover:shadow-lg animate-fade-in"
                style={{ border: "1px solid rgba(245, 158, 11, 0.2)" }}
              >
                <div className="flex items-center space-x-4 mb-4">
                  <div className="flex-shrink-0 h-16 w-16 bg-blue-100 rounded-full flex items-center justify-center font-bold text-3xl" style={{ color: "#1E3A8A", backgroundColor: "rgba(30, 58, 138, 0.1)" }}>
                    {tutor.name?.charAt(0).toUpperCase() || 'T'}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold" style={{ color: "#1F2937" }}>{tutor.name || 'Tutor Name'}</h3>
                    <div className="flex items-center text-sm mt-1" style={{ color: "#F59E0B" }}>
                      <Star className="h-4 w-4 mr-1" />
                      <span>4.9/5 Rating</span>
                    </div>
                  </div>
                </div>
                <p className="text-sm leading-relaxed mb-4 line-clamp-3" style={{ color: "#374151" }}>
                  {tutor.tutorProfile?.bio || 'No bio available'}
                </p>
                <div className="space-y-2 text-sm mb-4" style={{ color: "#374151" }}>
                  <div className="flex items-center space-x-2">
                    <BookOpen className="h-4 w-4" style={{ color: "#06B6D4" }} />
                    <span className="font-semibold">Subjects:</span>
                    <span className="text-gray-600">
                      {tutor.tutorProfile?.courses?.slice(0, 3).join(', ') || 'Not specified'}
                      {tutor.tutorProfile?.courses?.length > 3 ? '...' : ''}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <MapPin className="h-4 w-4" style={{ color: "#06B6D4" }} />
                    <span className="font-semibold">Location:</span>
                    <span>{tutor.tutorProfile?.location || 'Not specified'}</span>
                  </div>
                </div>
                <a
                  href={`/tutor/${tutor._id}`}
                  className="inline-block w-full py-4 rounded-xl font-semibold shadow-md text-center transition-all duration-300 transform hover:scale-105"
                  style={{
                    backgroundColor: "#F59E0B",
                    color: "white",
                    boxShadow: "0 10px 25px -5px rgba(245, 158, 11, 0.25)",
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = "#E88D00";
                    e.target.style.boxShadow = "0 20px 40px -10px rgba(245, 158, 11, 0.4)";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = "#F59E0B";
                    e.target.style.boxShadow = "0 10px 25px -5px rgba(245, 158, 11, 0.25)";
                  }}
                >
                  <div className="flex items-center justify-center">
                    <User className="h-4 w-4 mr-2" />
                    View Profile
                  </div>
                </a>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-md p-10 text-center animate-fade-in" style={{ border: "1px solid rgba(245, 158, 11, 0.2)" }}>
            <BookOpen className="h-16 w-16 mx-auto mb-4" style={{ color: "#E5E7EB" }} />
            <h3 className="text-xl font-semibold mb-2" style={{ color: "#1F2937" }}>
              No tutors found
            </h3>
            <p className="mb-4" style={{ color: "#374151" }}>
              {searchTerm || selectedSubject
                ? "Try adjusting your search criteria or filters."
                : "No tutors are available at the moment."
              }
            </p>
            {(searchTerm || selectedSubject) && (
              <button
                onClick={clearFilters}
                className="px-6 py-3 rounded-xl font-semibold border-2 transition-all duration-300 transform hover:scale-105"
                style={{
                  color: "#1E3A8A",
                  borderColor: "#1E3A8A",
                  backgroundColor: "transparent",
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = "#1E3A8A";
                  e.target.style.color = "white";
                  e.target.style.boxShadow = "0 10px 25px -5px rgba(30, 58, 138, 0.25)";
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = "transparent";
                  e.target.style.color = "#1E3A8A";
                  e.target.style.boxShadow = "none";
                }}
              >
                Clear Filters
              </button>
            )}
          </div>
        )}

        {/* CTA section at the bottom */}
        <div className="text-center mt-12 animate-fade-in">
          <a
            href="/become-tutor"
            className="font-medium hover:underline"
            style={{ color: "#1E3A8A" }}
          >
            Don't see what you're looking for? Become a tutor!
          </a>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in-down {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        @keyframes fade-in-left {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        @keyframes fade-in-right {
          from {
            opacity: 0;
            transform: translateX(20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        @keyframes gradient {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
        .animate-fade-in-down {
          animation: fade-in-down 0.8s ease-out forwards;
        }
        .animate-fade-in {
          animation: fade-in 0.8s ease-out forwards;
        }
        .animate-fade-in-left {
          animation: fade-in-left 0.8s ease-out forwards;
        }
        .animate-fade-in-right {
          animation: fade-in-right 0.8s ease-out forwards;
        }

        @keyframes gradient-move {
          0%, 100% {
            background-position: 50% 0%;
          }
          50% {
            background-position: 50% 100%;
          }
        }

        /* Floating Icon Animations */
        .icon-float {
          animation: float 10s ease-in-out infinite;
          will-change: transform;
        }

        @keyframes float {
          0%, 100% {
            transform: translate(0, 0);
          }
          25% {
            transform: translate(15px, -20px) rotate(5deg);
          }
          50% {
            transform: translate(0, -30px) rotate(-5deg);
          }
          75% {
            transform: translate(-15px, -15px) rotate(3deg);
          }
        }
      `}</style>
    </div>
  );
};

export default FindTutorPage;