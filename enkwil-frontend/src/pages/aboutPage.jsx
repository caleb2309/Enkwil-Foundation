import React from "react";
import {
  BookOpen,
  Target,
  Heart,
  Users,
  Award,
  Globe,
  TrendingUp,
  Star,
  Lightbulb,
  GraduationCap,
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
} from "lucide-react";
import { Link } from "react-router-dom";

// --- FloatingIcons component migrated from HomePage ---
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

const AboutPage = () => {
  const stats = [
    { icon: Users, number: "500+", label: "Students Helped" },
    { icon: BookOpen, number: "150+", label: "Expert Tutors" },
    { icon: Award, number: "50+", label: "Subject Areas" },
    { icon: Star, number: "4.9/5", label: "Average Rating" },
  ];

  const values = [
    {
      icon: Target,
      title: "Excellence",
      description:
        "We strive for the highest quality in education delivery, ensuring every student receives exceptional learning experiences.",
    },
    {
      icon: Heart,
      title: "Compassion",
      description:
        "We understand that learning journeys are unique, and we approach each student with empathy and understanding.",
    },
    {
      icon: Globe,
      title: "Accessibility",
      description:
        "Education should be available to everyone, everywhere. We work to break down barriers to quality learning.",
    },
    {
      icon: Lightbulb,
      title: "Innovation",
      description:
        "We continuously evolve our platform and methods to integrate the best in educational technology and pedagogy.",
    },
  ];

  const testimonials = [
    {
      quote:
        "Enkwil connected me with a fantastic tutor who helped me ace my final exams. The platform is so easy to use!",
      author: "Kwame A.",
      role: "Student, University of Ghana",
    },
    {
      quote:
        "As a tutor, Enkwil has provided me with a steady stream of students and an intuitive system to manage my sessions. Highly recommend!",
      author: "Dr. Adjoa B.",
      role: "Physics Tutor",
    },
    {
      quote:
        "My son's grades have improved dramatically since we started using Enkwil. The personalized attention has made all the difference.",
      author: "Ama C.",
      role: "Parent",
    },
  ];

  return (
    <div
      className="min-h-screen font-sans"
      style={{ backgroundColor: "#F9FAFB", color: "#374151" }} // Base background for the entire page
    >
      {/* Hero */}
      <div
        className="py-20 lg:py-28 relative overflow-hidden rounded-b-3xl shadow-xl"
        style={{
          background: "linear-gradient(135deg, #1E3A8A, #06B6D4, #1E3A8A)",
          backgroundSize: "200% 200%",
          animation: "gradient 3s ease infinite",
          color: "white",
        }}
      >
        <FloatingIcons /> {/* Replaced old icons with the new component */}
        <div className="absolute inset-0 bg-black/10 z-20"></div>
        <div className="relative z-30 max-w-6xl mx-auto px-6 text-center animate-fade-in-down">
          <h1
            className="text-4xl md:text-5xl font-extrabold text-white mb-4"
            style={{ textShadow: "0 4px 6px rgba(0, 0, 0, 0.1)" }}
          >
            Our Story: Passion for Education
          </h1>
          <p
            className="text-lg md:text-xl max-w-3xl mx-auto"
            style={{ color: "rgba(255, 255, 255, 0.9)" }}
          >
            At Enkwil, we believe that every student deserves access to quality,
            personalized education. We are a community dedicated to empowering
            learners and educators.
          </p>
        </div>
      </div>

      {/* Stats */}
      <section className="py-16 -mt-16 relative z-40">
        <div className="max-w-6xl mx-auto px-6">
          <div
            className="rounded-2xl shadow-2xl p-6 grid grid-cols-2 md:grid-cols-4 gap-6 animate-fade-in"
            style={{ backgroundColor: "#FFFFFF" }}
          >
            {stats.map((stat, i) => (
              <div
                key={i}
                className="flex flex-col items-center text-center transform transition duration-500 hover:scale-105"
              >
                <stat.icon
                  className="h-10 w-10 mb-2"
                  style={{ color: "#1E3A8A" }}
                />
                <p
                  className="text-3xl font-bold"
                  style={{ color: "#1F2937" }}
                >
                  {stat.number}
                </p>
                <p className="text-sm" style={{ color: "#374151" }}>
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20" style={{ backgroundColor: "#F9FAFB" }}>
        <div className="max-w-7xl mx-auto px-6 md:grid md:grid-cols-2 md:gap-12 items-center">
          <div className="animate-fade-in-left">
            <h2
              className="text-3xl md:text-4xl font-bold mb-4"
              style={{ color: "#1F2937" }}
            >
              Our Mission: Bridging the Gap
            </h2>
            <p
              className="text-lg mb-6 leading-relaxed"
              style={{ color: "#374151" }}
            >
              We are on a mission to make world-class education accessible to
              everyone, regardless of their location or background. By leveraging
              technology and a network of passionate, expert tutors, we create a
              platform where knowledge is shared, and potential is unlocked.
            </p>
            <p className="text-md mb-8" style={{ color: "#374151" }}>
              Every student's journey is unique. Our role is to provide the right
              support at the right time.
            </p>
            <div
              className="flex items-center space-x-3 font-semibold"
              style={{ color: "#06B6D4" }}
            >
              <TrendingUp className="h-6 w-6" />
              <span>Committed to Your Success</span>
            </div>
          </div>
          <div className="mt-10 md:mt-0 animate-fade-in-right">
            <img
              src="https://edsource.org/wp-content/uploads/2023/02/RHS_033-1024x683.jpg"
              alt="Student and tutor collaborating"
              className="w-full h-auto rounded-xl shadow-xl transform transition duration-500 hover:scale-105"
            />
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20" style={{ backgroundColor: "#F0F2F5" }}>
        {/* Slightly darker grey for better contrast with white cards */}
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center animate-fade-in">
            <h2
              className="text-3xl md:text-4xl font-bold mb-4"
              style={{ color: "#1F2937" }}
            >
              Our Core Values
            </h2>
            <p
              className="text-lg mb-12 max-w-3xl mx-auto"
              style={{ color: "#374151" }}
            >
              These principles guide our work and our commitment to our community.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, i) => (
              <div
                key={i}
                className="rounded-2xl shadow-md p-6 text-center transform transition duration-300 hover:scale-105 hover:shadow-lg"
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
                    <value.icon className="h-8 w-8" />
                  </div>
                </div>
                <h3
                  className="text-xl font-semibold mb-2"
                  style={{ color: "#1F2937" }}
                >
                  {value.title}
                </h3>
                <p className="text-sm" style={{ color: "#374151" }}>
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials 
      <section className="py-20" style={{ backgroundColor: "#F9FAFB" }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center animate-fade-in">
            <h2
              className="text-3xl md:text-4xl font-bold mb-4"
              style={{ color: "#1F2937" }}
            >
              Hear From Our Community
            </h2>
            <p
              className="text-lg mb-12 max-w-3xl mx-auto"
              style={{ color: "#374151" }}
            >
              Real stories from real people whose lives have been impacted by
              Enkwil.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <div
                key={i}
                className="rounded-2xl shadow-md p-8 relative overflow-hidden transform transition duration-500 hover:scale-105 hover:shadow-xl"
                style={{
                  backgroundColor: "#FFFFFF",
                  border: "1px solid #F59E0B",
                }}
              >
                <div
                  className="absolute top-0 left-0 w-12 h-12 rounded-full blur-2xl"
                  style={{ backgroundColor: "rgba(30, 58, 138, 0.1)" }}
                />
                <div
                  className="absolute bottom-0 right-0 w-12 h-12 rounded-full blur-2xl"
                  style={{ backgroundColor: "rgba(245, 158, 11, 0.1)" }}
                />
                <div className="relative z-10">
                  <Star
                    className="h-6 w-6 mb-4"
                    style={{ color: "#F59E0B" }}
                  />
                  <p
                    className="text-lg italic mb-6"
                    style={{ color: "#374151" }}
                  >
                    "{t.quote}"
                  </p>
                  <div
                    className="font-semibold"
                    style={{ color: "#1F2937" }}
                  >
                    - {t.author}
                  </div>
                  <div className="text-sm" style={{ color: "#9CA3AF" }}>
                    {t.role}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <button
              className="px-6 py-3 rounded-xl font-semibold border-2 transition-all duration-300 transform hover:scale-105"
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
              Read More Success Stories →
            </button>
          </div>
        </div>
      </section>

      */}

      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden rounded-t-3xl">
        <FloatingIcons /> {/* Replaced old icons with the new component */}
        <div
          className="absolute inset-0 z-0"
          style={{
            background: "linear-gradient(135deg, #1E3A8A, #06B6D4, #1E3A8A)",
            backgroundSize: "200% 200%",
            animation: "gradient-move 3s ease infinite alternate",
          }}
        ></div>
        <div className="absolute inset-0 bg-black/10 z-20"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-30">
          <div className="text-center animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Be Part of Our Story?
            </h2>
            <p className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto">
              Whether you're a student seeking to unlock your potential or an
              educator ready to make an impact, Enkwil is here to support your
              journey.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/find-tutor"
                className="bg-white text-[#1E3A8A] px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-2xl"
              >
                Find Your Tutor Today
              </Link>
              <Link
                to="/become-tutor"
                className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white hover:text-[#1E3A8A] transition-all duration-300 transform hover:scale-105"
              >
                Become a Tutor
              </Link>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        @keyframes gradient-move {
          0%,
          100% {
            background-position: 50% 0%;
          }
          50% {
            background-position: 50% 100%;
          }
        }
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
          0%,
          100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        /* --- New CSS for floating icons --- */
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
        /* --- End of new CSS --- */
      `}</style>
    </div>
  );
};

export default AboutPage;
