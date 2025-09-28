import React from 'react';
import { Link } from 'react-router-dom';
import {
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
} from 'lucide-react';

// --- Start of new FloatingIcons component ---
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
// --- End of new FloatingIcons component ---

const HomePage = () => {
  const steps = [
    {
      icon: Search,
      title: 'Find Your Tutor',
      description: 'Browse our extensive network of qualified tutors and find the perfect match for your learning needs.',
      delay: '0.2s'
    },
    {
      icon: UserCheck,
      title: 'Connect & Schedule',
      description: 'Reach out to your chosen tutor and schedule your first lesson at your convenience.',
      delay: '0.4s'
    },
    {
      icon: BookOpen,
      title: 'Start Learning',
      description: 'Begin your personalized learning journey with expert guidance tailored to your goals.',
      delay: '0.6s'
    }
  ];

  const reasons = [
    {
      icon: Target,
      title: 'Bridging Educational Gaps',
      description: 'We exist to eliminate barriers to quality education by connecting students with passionate educators who understand their unique needs.'
    },
    {
      icon: Heart,
      title: 'Empowering Educators',
      description: 'Our platform provides tutors with the tools, resources, and community to grow their practice and reach more students.'
    },
    {
      icon: Lightbulb,
      title: 'Fostering Academic Excellence',
      description: 'Through personalized attention and tailored plans, we help students not just pass, but truly master their subjects and build a love for learning.'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-100 text-[#374151]">
      {/* Hero Section */}
      <div className="relative overflow-hidden py-20 lg:py-32 rounded-b-3xl">
        <FloatingIcons /> {/* --- Added the floating icons here --- */}
        <div
          className="absolute inset-0 z-0"
          style={{
            background: "linear-gradient(135deg, #1E3A8A, #06B6D4, #1E3A8A)",
            backgroundSize: "200% 200%",
            animation: "gradient-move 3s ease infinite alternate",
          }}
        ></div>
        <div className="absolute inset-0 bg-black/10 z-10"></div>
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center animate-fade-in-down">
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-4 leading-tight">
            Unlock Your Potential with Personalized Tutoring
          </h1>
          <p className="text-lg md:text-xl text-blue-100 max-w-3xl mx-auto mb-8">
            Learn, Play, and Grow with Enkwil
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/find-tutor" className="bg-white text-[#1E3A8A] px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-2xl">
              Find a Tutor
            </Link>
            <Link to="/about" className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white hover:text-[#1E3A8A] transition-all duration-300 transform hover:scale-105">
              Learn More
            </Link>
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1F2937] mb-4 bg-gradient-to-r from-[#1E3A8A] to-[#06B6D4] bg-clip-text text-transparent">
              How It Works
            </h2>
            <p className="text-lg text-[#374151] max-w-2xl mx-auto">
              Getting started with Enkwil is as easy as 1-2-3.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <div
                key={index}
                className="bg-white rounded-3xl shadow-lg p-8 text-center transform transition-all duration-500 hover:scale-105 hover:shadow-2xl animate-fade-in"
                style={{ animationDelay: step.delay }}
              >
                <div className="flex justify-center mb-4 transform hover:scale-110 transition-transform duration-300">
                  <div className="p-4 rounded-2xl bg-gradient-to-r from-[#1E3A8A] to-[#06B6D4]">
                    <step.icon className="h-8 w-8 text-white" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-[#1F2937] mb-2">{step.title}</h3>
                <p className="text-sm text-[#374151]">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in-left">
              <h2 className="text-3xl md:text-4xl font-bold text-[#1F2937] mb-4 bg-gradient-to-r from-[#1E3A8A] to-[#06B6D4] bg-clip-text text-transparent">
                Why Choose Enkwil?
              </h2>
              <p className="text-lg text-[#374151] mb-6 leading-relaxed">
                We're more than just a tutoring platform. We're a community built on the principles of quality, trust, and academic growth.
              </p>
              <div className="space-y-6">
                {reasons.map((reason, index) => (
                  <div key={index} className="flex items-start space-x-4 group transform hover:scale-105 transition-transform duration-300">
                    <div className="flex-shrink-0 p-3 rounded-2xl bg-gradient-to-r from-[#F59E0B] to-[#FBBF24] group-hover:from-[#FBBF24] group-hover:to-[#F59E0B] transition-all duration-300">
                      <reason.icon className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-[#1F2937]">{reason.title}</h3>
                      <p className="text-[#374151] text-sm">{reason.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-10 lg:mt-0 animate-fade-in-right">
              <img
                src="https://cisjax.org/wp-content/uploads/2023/05/Student-Tutoring-Programs.jpg"
                alt="Tutor and student smiling"
                className="w-full h-auto rounded-3xl shadow-2xl transform transition-all duration-500 hover:scale-105"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden rounded-t-3xl">
        <FloatingIcons /> {/* --- Added the floating icons here --- */}
        <div
          className="absolute inset-0 z-0"
          style={{
            background: "linear-gradient(135deg, #1E3A8A, #06B6D4, #1E3A8A)",
            backgroundSize: "200% 200%",
            animation: "gradient-move 3s ease infinite alternate",
          }}
        ></div>
        <div className="absolute inset-0 bg-black/10 z-10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
          <div className="text-center animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Transform Your Learning Experience?
            </h2>
            <p className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto">
              Join thousands of students who have already discovered the power of personalized tutoring with Enkwil.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/find-tutor" className="bg-white text-[#1E3A8A] px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-2xl">
                Find Your Tutor Today
              </Link>
              <Link to="/about" className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white hover:text-[#1E3A8A] transition-all duration-300 transform hover:scale-105">
                Learn More About Us
              </Link>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        @keyframes gradient-move {
          0%, 100% {
            background-position: 50% 0%;
          }
          50% {
            background-position: 50% 100%;
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

export default HomePage;
