import React from 'react';
import { Link } from 'react-router-dom';
import {
  BookOpen,
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Heart
} from 'lucide-react';

const Footer = () => {
  const quickLinks = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About Us' },
    { path: '/find-tutor', label: 'Find a Tutor' },
    { path: '/become-tutor', label: 'Become a Tutor' },
    { path: '/contact', label: 'Contact' },
  ];

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
  ];

  return (
    <footer
      className="text-white  overflow-hidden shadow-xl"
      style={{
        backgroundColor: "#1E3A8A",
        backgroundImage:
          "radial-gradient(circle, rgba(6, 182, 212, 0.2) 1px, transparent 1px)",
        backgroundSize: "24px 24px",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="animate-fade-in">
            <div className="flex items-center space-x-2 mb-4">
              <BookOpen className="h-8 w-8 text-[#06B6D4]" />
              <h3 className="text-2xl font-bold">Enkwil</h3>
            </div>
            <p className="text-gray-200 leading-relaxed mb-4">
              Providing quality education services through personalized tutoring. We connect passionate educators with eager students to bridge knowledge gaps and foster academic growth.
            </p>
            {/*
            <div className="flex space-x-4">
              {socialLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  aria-label={link.label}
                  className="text-gray-200 hover:text-white transition-all duration-300 transform hover:scale-110"
                >
                  <link.icon className="h-6 w-6" />
                </a>
              ))}
            </div>
            */}
          </div>

          {/* Quick Links */}
          <div className="animate-fade-in" style={{ animationDelay: '0.1s' }}>
            <h4 className="text-xl font-semibold mb-4 text-[#06B6D4]">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.path}
                    className="text-gray-200 hover:text-white transition-all duration-300 hover:translate-x-1"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <h4 className="text-xl font-semibold mb-4 text-[#06B6D4]">Our Services</h4>
            <ul className="space-y-2 text-gray-200">
              <li className="hover:text-white transition-all duration-300 hover:translate-x-1 cursor-pointer py-1">
                Academic Tutoring
              </li>
              <li className="hover:text-white transition-all duration-300 hover:translate-x-1 cursor-pointer py-1">
                Exam Preparation
              </li>
              <li className="hover:text-white transition-all duration-300 hover:translate-x-1 cursor-pointer py-1">
                Homework Help
              </li>
              <li className="hover:text-white transition-all duration-300 hover:translate-x-1 cursor-pointer py-1">
                Subject Specialization
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <h4 className="text-xl font-semibold mb-4 text-[#06B6D4]">Contact Us</h4>
            <ul className="space-y-2 text-gray-200">
              {/*}
              <li className="flex items-center space-x-2">
                <MapPin className="h-5 w-5 text-[#06B6D4]" />
                <span>East Legon, Accra</span>
              </li>
              */}
              <li className="flex items-center space-x-2">
                <Mail className="h-5 w-5 text-[#06B6D4]" />
                <span>enkwilfoundation@gmail.com</span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="h-5 w-5 text-[#06B6D4]" />
                <span>+233 55 267 7605</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 mt-5 pt-5">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-400 text-sm text-center md:text-left">
              <p>© {new Date().getFullYear()} Enkwil Foundation</p>
            </div>
            </div>
        </div>
      </div>
      <style jsx>{`
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
        .animate-fade-in {
          animation: fade-in 0.8s ease-out forwards;
        }
      `}</style>
    </footer>
  );
};

export default Footer;
