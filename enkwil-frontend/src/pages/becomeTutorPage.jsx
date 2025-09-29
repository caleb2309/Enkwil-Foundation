import React, { useState } from 'react';
import {
  User,
  Mail,
  Phone,
  MapPin,
  BookOpen,
  Award,
  FileText,
  Plus,
  X,
  CheckCircle,
  Clock,
  Briefcase
} from 'lucide-react';

// Main component for the tutor application page
const BecomeTutorPage = () => {
  // State to manage form data and application status
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    qualifications: '',
    bio: '',
    location: '',
    courses: ['']
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  // Handles changes to text inputs
  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  // Handles changes to the dynamic course input fields
  const handleCourseChange = (index, value) => {
    const updatedCourses = [...formData.courses];
    updatedCourses[index] = value;
    setFormData({
      ...formData,
      courses: updatedCourses
    });
  };

  // Adds a new empty course input field
  const addCourse = () => {
    setFormData({
      ...formData,
      courses: [...formData.courses, '']
    });
  };

  // Removes a course input field by its index
  const removeCourse = (index) => {
    const updatedCourses = formData.courses.filter((_, i) => i !== index);
    setFormData({
      ...formData,
      courses: updatedCourses.length > 0 ? updatedCourses : ['']
    });
  };

  // Handles form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      // API call to submit the form data
      const response = await fetch('https://enkwil-foundation.onrender.com/api/v1/tutor-applications', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      const data = await response.json();

      if (response.ok) {
        setSuccess(true);
        // Reset the form on successful submission
        setFormData({
          name: '',
          email: '',
          phone: '',
          qualifications: '',
          bio: '',
          location: '',
          courses: ['']
        });
      } else {
        setError(data.message || 'Application submission failed.');
      }
    } catch (err) {
console.error(err);
      setError('An error occurred. Please check your network connection.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen py-12 sm:py-16">
      {/* Background Animated Gradient */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background: "linear-gradient(135deg, #1E3A8A, #06B6D4, #1E3A8A)",
          backgroundSize: "200% 200%",
          animation: "gradient-move 3s ease infinite alternate",
        }}
      ></div>
      <div className="relative z-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 sm:mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
            Join Our Community of Tutors
          </h1>
          <p className="text-lg text-gray-200 max-w-2xl mx-auto">
            Empower students and share your knowledge. Fill out the form below to begin your journey as an Enkwil tutor.
          </p>
        </div>

        {/* Success message alert */}
        {success && (
          <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded-lg mb-8" role="alert">
            <div className="flex items-center">
              <CheckCircle className="h-6 w-6 mr-3 text-green-500 flex-shrink-0" />
              <div>
                <p className="font-bold">Application Submitted!</p>
                <p className="text-sm">Thank you for your interest. We will review your application shortly.</p>
              </div>
            </div>
          </div>
        )}

        {/* Error message alert */}
        {error && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-lg mb-8" role="alert">
            <div className="flex items-center">
              <X className="h-6 w-6 mr-3 text-red-500 flex-shrink-0" />
              <div>
                <p className="font-bold">Error!</p>
                <p className="text-sm">{error}</p>
              </div>
            </div>
          </div>
        )}

        <div className="bg-white rounded-3xl shadow-xl p-6 sm:p-8 lg:p-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Tutor Application Form</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="relative">
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow"
                  required
                />
                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              </div>
              <div className="relative">
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow"
                  required
                />
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              </div>
              <div className="relative">
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow"
                  required
                />
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              </div>
              <div className="relative">
                <input
                  type="text"
                  name="location"
                  placeholder="City/Location"
                  value={formData.location}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow"
                  required
                />
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              </div>
            </div>

            <div className="relative">
              <textarea
                name="qualifications"
                placeholder="Briefly list your qualifications, certifications, and teaching experience."
                value={formData.qualifications}
                onChange={handleInputChange}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow min-h-[100px]"
                required
              ></textarea>
              <Award className="absolute left-3 top-3 text-gray-400" size={20} />
            </div>

            <div className="relative">
              <textarea
                name="bio"
                placeholder="Tell us about yourself. What is your teaching philosophy? What motivates you to teach?"
                value={formData.bio}
                onChange={handleInputChange}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow min-h-[150px]"
                required
              ></textarea>
              <FileText className="absolute left-3 top-3 text-gray-400" size={20} />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Subjects you can teach
              </label>
              {formData.courses.map((course, index) => (
                <div key={index} className="flex items-center space-x-2 mb-3">
                  <div className="relative flex-grow">
                    <input
                      type="text"
                      placeholder={`Subject ${index + 1}`}
                      value={course}
                      onChange={(e) => handleCourseChange(index, e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow"
                      required
                    />
                    <BookOpen className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                  </div>
                  {formData.courses.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeCourse(index)}
                      className="p-2 text-red-500 hover:text-red-700 transition-colors rounded-full"
                      aria-label="Remove subject"
                    >
                      <X className="h-6 w-6" />
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={addCourse}
                className="text-blue-600 hover:text-blue-800 transition-colors flex items-center text-sm font-medium"
              >
                <Plus className="h-4 w-4 mr-1" /> Add another subject
              </button>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className={`w-full py-3 px-4 rounded-lg font-semibold text-white transition-all duration-300
                  ${loading ? 'bg-[#1E3A8A] cursor-not-allowed' : 'bg-[#1E3A8A] hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'}
                `}
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Submitting...
                  </div>
                ) : (
                  'Submit Application'
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Additional Info Section */}
        <div className="mt-8 bg-blue-50 rounded-2xl p-6 sm:p-8">
          <h3 className="text-xl font-semibold text-blue-800 mb-4">
            Our Process
          </h3>
          <ul className="space-y-4 text-gray-700">
            <li className="flex items-start">
              <Clock className="h-6 w-6 text-blue-600 mr-3 flex-shrink-0 mt-1" />
              <span>
                <strong>Application Review:</strong> We will carefully review your application within 2-3 business days and be contacted for an interview.
              </span>
            </li>
            <li className="flex items-start">
              <Briefcase className="h-6 w-6 text-blue-600 mr-3 flex-shrink-0 mt-1" />
              <span>
                <strong>Next Steps:</strong> If approved, you will receive an email with login credentials and next steps to set up your profile.
              </span>
            </li>
            <li className="flex items-start">
              <CheckCircle className="h-6 w-6 text-blue-600 mr-3 flex-shrink-0 mt-1" />
              <span>
                <strong>Start Tutoring:</strong> Once your profile is complete, you can start connecting with students and scheduling sessions.
              </span>
            </li>
          </ul>
        </div>
      </div>
      <style jsx>{`
        @keyframes gradient-move {
          0%, 100% {
            background-position: 50% 0%;
          }
          50% {
            background-position: 50% 100%;
          }
        }
      `}</style>
    </div>
  );
};

export default BecomeTutorPage;
