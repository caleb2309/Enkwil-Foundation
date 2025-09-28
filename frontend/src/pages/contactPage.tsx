import React, { useState } from "react";
import {
  Phone,
  Mail,
  MessageSquare,
  MapPin,
  Send,
  User,
  FileText,
  Search,
  UserCheck,
  BookOpen,
  Target,
  Heart,
  Lightbulb,
  GraduationCap,
  Atom,
  Feather,
  PencilRuler,
  Globe,
  Award,
  MonitorPlay,
  Calculator,
  Laptop,
  Trophy,
  Star,
  Book,
  PenTool,
  Code,
  FlaskConical,
  Puzzle,
  Briefcase
} from "lucide-react";

// --- Start of FloatingIcons component (moved here from HomePage) ---
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
// --- End of FloatingIcons component ---

// InputField component is now outside the main component to prevent re-renders
const InputField = ({
  type,
  name,
  placeholder,
  value,
  icon: Icon,
  onChange,
}) => (
  <div className="relative w-full">
    <div className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "#06B6D4" }}>
      <Icon size={20} />
    </div>
    <input
      type={type}
      name={name}
      placeholder=" "
      value={value}
      onChange={onChange}
      className="peer w-full rounded-lg border py-3 pl-10 pr-3 text-base placeholder-transparent focus:outline-none focus:ring-2 transition-all duration-200 cursor-text"
      style={{
        backgroundColor: "#F9FAFB",
        borderColor: "#E5E7EB",
        color: "#1F2937",
        caretColor: "#1F2937",
      }}
      required
    />
    <label
      className="absolute left-10 top-1/2 -translate-y-1/2 px-1 text-sm transition-all duration-200 peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-focus:top-0 peer-focus:text-xs"
      style={{
        backgroundColor: "#FFFFFF",
        color: "#9CA3AF",
      }}
    >
      {placeholder}
    </label>
  </div>
);

// TextAreaField component is now outside the main component
const TextAreaField = ({
  name,
  placeholder,
  value,
  icon: Icon,
  onChange,
}) => (
  <div className="relative w-full">
    <div className="absolute left-3 top-5" style={{ color: "#06B6D4" }}>
      <Icon size={20} />
    </div>
    <textarea
      name={name}
      placeholder=" "
      value={value}
      onChange={onChange}
      rows={5}
      className="peer w-full resize-none rounded-lg border py-3 pl-10 pr-3 text-base placeholder-transparent focus:outline-none focus:ring-2 transition-all duration-200 cursor-text"
      style={{
        backgroundColor: "#F9FAFB",
        borderColor: "#E5E7EB",
        color: "#1F2937",
        caretColor: "#1F2937",
      }}
      required
    ></textarea>
    <label
      className="absolute left-10 top-3 px-1 text-sm transition-all duration-200 peer-placeholder-shown:top-5 peer-placeholder-shown:text-base peer-focus:top-0 peer-focus:text-xs"
      style={{
        backgroundColor: "#FFFFFF",
        color: "#9CA3AF",
      }}
    >
      {placeholder}
    </label>
  </div>
);

// Main component for the contact page
const ContactPage = () => {
  // State to manage form data and submission status
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const contactMethods = [
    {
      icon: Phone,
      title: "Call Us",
      description: "Speak directly with our support team",
      contact: "+233 552 677 605",
      action: "Call Now",
      link: "tel:+233552677605",
    },
    {
      icon: Mail,
      title: "Email Us",
      description: "Send us a detailed message",
      contact: "enkwilfoundation@gmail.com",
      action: "Send Email",
      link: "mailto:enkwilfoundation@gmail.com",
    },
    {
      icon: MessageSquare,
      title: "WhatsApp",
      description: "Chat with us for quick support",
      contact: "+233 552 677 605",
      action: "Chat on WhatsApp",
      link: "https://wa.me/233552677605",
    },
  ];

  // Handles changes to input fields
  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError("");
  };

  // Handles form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      // NOTE: This fetch call points to a localhost server, which will not work in this environment.
      // You would need to replace this with a valid, live API endpoint.
      const response = await fetch("http://localhost:5000/api/v1/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await response.json();

      if (response.ok) {
        setSuccess(true);
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        setError(data.message || "Failed to send message. Please try again.");
      }
    } catch {
      setError("An error occurred. Please check your network connection.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#F9FAFB", color: "#374151" }}>
      {/* Hero Section */}
      <div
        className="py-20 lg:py-28 relative overflow-hidden rounded-b-3xl shadow-xl"
        style={{background: "linear-gradient(135deg, #1E3A8A, #06B6D4, #1E3A8A)",
            backgroundSize: "200% 200%",
            animation: "gradient 3s ease infinite",
            color: "white",
        }}
      >
        <FloatingIcons /> {/* --- Added the floating icons here --- */}
        <div className="relative z-10 max-w-6xl mx-auto px-6 text-center animate-fade-in-down">
          <h1
            className="text-4xl md:text-5xl font-extrabold text-white mb-4"
            style={{ textShadow: "0 4px 6px rgba(0, 0, 0, 0.1)" }}
          >
            Connect with Us
          </h1>
          <p
            className="text-lg md:text-xl max-w-3xl mx-auto"
            style={{ color: "rgba(255, 255, 255, 0.9)" }}
          >
            We're here to help! Whether you have a question or need support, our team is ready to assist you.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Contact Methods Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {contactMethods.map((method, index) => (
            <div
              key={index}
              className="rounded-2xl shadow-md p-6 text-center transform transition duration-300 hover:scale-105 hover:shadow-lg animate-fade-in"
              style={{
                backgroundColor: "#FFFFFF",
                border: "1px solid rgba(245, 158, 11, 0.2)",
              }}
            >
              <div className="flex justify-center mb-4">
                <div
                  className="p-3 rounded-full"
                  style={{
                    backgroundColor: "rgba(6, 182, 212, 0.1)",
                    color: "#06B6D4",
                  }}
                >
                  <method.icon className="h-8 w-8" />
                </div>
              </div>
              <h3
                className="text-xl font-semibold mb-2"
                style={{ color: "#1F2937" }}
              >
                {method.title}
              </h3>
              <p className="text-sm mb-4" style={{ color: "#374151" }}>
                {method.description}
              </p>
              <a
                href={method.link}
                className="inline-block w-full py-3 rounded-xl font-semibold border-2 transition-all duration-300 transform hover:scale-105"
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
                {method.action}
              </a>
            </div>
          ))}
        </div>
          {/* 
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
           Contact Form Section 
          <div
            className="rounded-3xl shadow-xl p-8 border animate-fade-in-left"
            style={{ backgroundColor: "#FFFFFF", borderColor: "#E5E7EB" }}
          >
            <h2
              className="text-2xl font-bold mb-6"
              style={{ color: "#1F2937" }}
            >
              Send Us a Message
            </h2>

            {success && (
              <div
                className="border-l-4 p-4 rounded-lg mb-4"
                style={{ borderColor: "#1E3A8A", backgroundColor: "#EBF8FF", color: "#1E3A8A" }}
              >
                <p className="font-bold">Message Sent!</p>
                <p className="text-sm">Thank you for your message. We will get back to you shortly.</p>
              </div>
            )}
            {error && (
              <div
                className="border-l-4 p-4 rounded-lg mb-4"
                style={{ borderColor: "#EF4444", backgroundColor: "#FEE2E2", color: "#EF4444" }}
              >
                <p className="font-bold">Error!</p>
                <p className="text-sm">{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <InputField
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleInputChange}
                icon={User}
              />
              <InputField
                type="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleInputChange}
                icon={Mail}
              />
              <InputField
                type="text"
                name="subject"
                placeholder="Subject"
                value={formData.subject}
                onChange={handleInputChange}
                icon={FileText}
              />
              <TextAreaField
                name="message"
                placeholder="Your Message"
                value={formData.message}
                onChange={handleInputChange}
                icon={MessageSquare}
              />

              <button
                type="submit"
                disabled={loading}
                className={`w-full py-4 rounded-xl font-semibold shadow-md transition-all duration-300 transform hover:scale-105`}
                style={{
                  backgroundColor: loading ? "rgba(245, 158, 11, 0.6)" : "#F59E0B",
                  color: "#FFFFFF",
                  cursor: loading ? "not-allowed" : "pointer",
                }}
                onMouseEnter={(e) => {
                  if (!loading) {
                    e.target.style.backgroundColor = "#E88D00";
                    e.target.style.boxShadow = "0 20px 40px -10px rgba(245, 158, 11, 0.4)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!loading) {
                    e.target.style.backgroundColor = "#F59E0B";
                    e.target.style.boxShadow = "0 10px 25px -5px rgba(245, 158, 11, 0.25)";
                  }
                }}
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Sending...
                  </div>
                ) : (
                  <div className="flex items-center justify-center">
                    <Send className="h-5 w-5 mr-2" />
                    Send Message
                  </div>
                )}
              </button>
            </form>
          </div>

          {/* Map + FAQ Section 
          <div className="space-y-8 animate-fade-in-right">
            <div
              className="rounded-3xl shadow-xl overflow-hidden border"
              style={{ backgroundColor: "#FFFFFF", borderColor: "#E5E7EB" }}
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3970.3483818049444!2d-0.1789088265015222!3d5.662655332571068!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xfdf9c9387828afd%3A0xb5b8ce8649131f39!2sPresbyterian%20Boys'%20Secondary%20School!5e0!3m2!1sen!2sgh!4v1758550476864!5m2!1sen!2sgh"
                className="w-full h-60 object-cover"
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Presbyterian Boys' Secondary School Map"
              ></iframe>

              <div className="p-6">
                <div
                  className="rounded-lg p-3 flex items-center space-x-3"
                  style={{
                    backgroundColor: "#F9FAFB",
                    color: "#1E3A8A",
                  }}
                >
                  <MapPin className="h-5 w-5" style={{ color: "#06B6D4" }} />
                  <div>
                    <p className="text-sm font-medium" style={{ color: "#1F2937" }}>
                      Enkwil Education
                    </p>
                    <p className="text-xs" style={{ color: "#374151" }}>East Legon, Accra</p>
                  </div>
                </div>
              </div>
              <div className="p-4">
                <button
                  onClick={() => window.open('https://maps.app.goo.gl/cUehjphiP2ehZznL8', '_blank')}
                  className="w-full py-3 rounded-xl font-semibold border-2 transition-all duration-300 transform hover:scale-105"
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
                  Get Directions
                </button>
              </div>
            </div>

            <div
              className="rounded-2xl p-6"
              style={{
                background: "linear-gradient(135deg, #1E3A8A, #06B6D4, #1E3A8A)",
                backgroundSize: "200% 200%",
                animation: "gradient 3s ease infinite",
                color: "white",
              }}
            >
              <h3 className="text-lg font-bold mb-2">
                Frequently Asked Questions
              </h3>
              <p className="text-sm mb-4" style={{ color: "rgba(255, 255, 255, 0.9)" }}>
                Find quick answers to common questions about our platform and services.
              </p>
              <button
                className="px-6 py-3 rounded-xl font-semibold border-2 transition-all duration-300 transform hover:scale-105"
                style={{
                  color: "#1E3A8A",
                  borderColor: "#1E3A8A",
                  backgroundColor: "#FFFFFF",
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = "#E5E7EB";
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = "#FFFFFF";
                }}
              >
                View FAQ
              </button>
            </div>
            
          </div>
          
        </div>*/}
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

        /* New CSS for floating icons */
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

export default ContactPage;