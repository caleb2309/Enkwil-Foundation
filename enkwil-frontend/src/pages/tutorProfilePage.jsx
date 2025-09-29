import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  User, 
  Star, 
  MapPin, 
  Mail, 
  Phone, 
  Clock, 
  BookOpen, 
  Award,
  Send,
  ArrowLeft,
  CheckCircle,
  MessageSquare
} from 'lucide-react';
import '../App.css'

const TutorProfilePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [tutor, setTutor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showContactForm, setShowContactForm] = useState(false);
  const [contactData, setContactData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [contactLoading, setContactLoading] = useState(false);
  const [contactSuccess, setContactSuccess] = useState(false);

  useEffect(() => {
    const fetchTutor = async () => {
      setLoading(true);
      try {
        const response = await fetch(`https://enkwil-foundation.onrender.com/api/v1/tutors/${id}`);
        const data = await response.json();
        if (response.ok) {
          setTutor(data.tutor);
        } else {
          setError(data.message || 'Tutor not found.');
        }
      } catch (err) {
console.error(err);
        setError('An error occurred. Please try again.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchTutor();
  }, [id]);

  const handleContactChange = (e) => {
    setContactData({
      ...contactData,
      [e.target.name]: e.target.value
    });
  };

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    setContactLoading(true);
    setContactSuccess(false);

    try {
      const response = await fetch('https://enkwil-foundation.onrender.com/api/v1/contact-tutor', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ ...contactData, tutorEmail: tutor.email })
      });
      const data = await response.json();
      if (response.ok) {
        setContactSuccess(true);
        setContactData({ name: '', email: '', message: '' });
        setShowContactForm(false);
      } else {
        setError(data.message || 'Failed to send message.');
      }
    } catch (err) {
console.error(err);
      setError('An error occurred. Please try again.');
    } finally {
      setContactLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        <p className="ml-4 text-deep-grey">Loading tutor profile...</p>
      </div>
    );
  }

  if (error || !tutor) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-500">Error</h1>
          <p className="text-deep-grey mt-2">{error}</p>
          <button onClick={() => navigate(-1)} className="btn-outline mt-4">
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <button onClick={() => navigate(-1)} className="text-deep-grey hover:text-primary transition-colors flex items-center mb-6 animate-fade-in-down">
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back to Tutors
        </button>

        {/* Profile Card */}
        <div className="bg-white rounded-3xl shadow-custom-lg p-6 sm:p-8 lg:p-12 animate-fade-in">
          <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8">
            <div className="flex-shrink-0 h-32 w-32 bg-primary/10 rounded-full flex items-center justify-center text-primary font-bold text-6xl">
              {tutor.name.charAt(0).toUpperCase()}
            </div>
            <div className="text-center md:text-left">
              <h1 className="text-3xl font-extrabold text-charcoal">{tutor.name}</h1>
              <div className="flex items-center justify-center md:justify-start text-yellow-500 text-lg mt-2 mb-4">
                <Star className="h-5 w-5 mr-1" />
                <span>4.9/5 Rating</span>
              </div>
              <p className="text-sm text-deep-grey mb-2 flex items-center justify-center md:justify-start">
                <MapPin className="h-4 w-4 mr-2 text-primary" />
                {tutor.tutorProfile.location}
              </p>
              <p className="text-sm text-deep-grey flex items-center justify-center md:justify-start">
                <Clock className="h-4 w-4 mr-2 text-primary" />
                Available online and for in-person sessions
              </p>
            </div>
          </div>

          <div className="mt-8 border-t border-gray-200 pt-8 space-y-8">
            {/* Bio Section */}
            <div className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <h2 className="text-2xl font-bold text-charcoal mb-4 flex items-center space-x-2">
                <User className="h-6 w-6 text-primary" />
                <span>About {tutor.name}</span>
              </h2>
              <p className="text-deep-grey leading-relaxed">{tutor.tutorProfile.bio}</p>
            </div>

            {/* Qualifications Section */}
            <div className="animate-fade-in" style={{ animationDelay: '0.4s' }}>
              <h2 className="text-2xl font-bold text-charcoal mb-4 flex items-center space-x-2">
                <Award className="h-6 w-6 text-primary" />
                <span>Qualifications & Experience</span>
              </h2>
              <p className="text-deep-grey leading-relaxed">{tutor.tutorProfile.qualifications}</p>
            </div>

            {/* Courses Section */}
            <div className="animate-fade-in" style={{ animationDelay: '0.6s' }}>
              <h2 className="text-2xl font-bold text-charcoal mb-4 flex items-center space-x-2">
                <BookOpen className="h-6 w-6 text-primary" />
                <span>Subjects Taught</span>
              </h2>
              <div className="flex flex-wrap gap-2">
                {tutor.tutorProfile.courses.map((course, index) => (
                  <span key={index} className="bg-primary/10 text-primary px-4 py-2 rounded-full font-medium text-sm">
                    {course}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <div className="mt-8 bg-white rounded-3xl shadow-custom-lg p-6 animate-fade-in-up">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-charcoal mb-4">Ready to Book a Session?</h2>
            <p className="text-deep-grey mb-6">Send {tutor.name} a direct message to discuss your learning needs.</p>
            {contactSuccess && (
              <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded-lg mb-4 animate-fade-in" role="alert">
                <p className="font-bold">Message Sent!</p>
                <p className="text-sm">Your message has been sent successfully. {tutor.name} will get back to you shortly.</p>
              </div>
            )}
            {!showContactForm && (
              <button
                onClick={() => setShowContactForm(true)}
                className="btn-primary flex items-center justify-center mx-auto"
              >
                <MessageSquare className="h-5 w-5 mr-2" />
                Contact {tutor.name}
              </button>
            )}
          </div>

          {showContactForm && (
            <div className="mt-6 animate-fade-in-down">
              <form onSubmit={handleContactSubmit} className="space-y-4">
                <div className="relative">
                  <input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    value={contactData.name}
                    onChange={handleContactChange}
                    className="input-field"
                    required
                  />
                  <User className="input-icon" />
                </div>
                <div className="relative">
                  <input
                    type="email"
                    name="email"
                    placeholder="Your Email"
                    value={contactData.email}
                    onChange={handleContactChange}
                    className="input-field"
                    required
                  />
                  <Mail className="input-icon" />
                </div>
                <div className="relative">
                  <textarea
                    name="message"
                    rows="4"
                    value={contactData.message}
                    onChange={handleContactChange}
                    className="input-field"
                    placeholder="Tell them about your learning goals and preferred schedule..."
                  />
                </div>
                
                <div className="flex space-x-3">
                  <button
                    type="button"
                    onClick={() => setShowContactForm(false)}
                    className="flex-1 btn-outline"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={contactLoading}
                    className={`flex-1 btn-primary ${contactLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    {contactLoading ? (
                      <div className="flex items-center justify-center">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Sending...
                      </div>
                    ) : (
                      <div className="flex items-center justify-center">
                        <Send className="h-4 w-4 mr-2" />
                        Send Message
                      </div>
                    )}
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TutorProfilePage;
