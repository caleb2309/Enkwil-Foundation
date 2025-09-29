import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/authContext';
import NavBar from './components/common/NavBar';
import Footer from './components/common/Footer';
import HomePage from './pages/homePage';
import AboutPage from './pages/aboutPage';
import ContactPage from './pages/contactPage';
import AuthPage from './pages/authPage';
import FindTutorPage from './pages/findTutorPage';
import BecomeTutorPage from './pages/becomeTutorPage';
import TutorProfilePage from './pages/tutorProfilePage';
import AdminPage from './pages/adminPage';


function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen flex flex-col bg-soft-white">
          <NavBar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/auth" element={<AuthPage />} />
              <Route path="/find-tutor" element={<FindTutorPage />} />
              <Route path="/become-tutor" element={<BecomeTutorPage />} />
              <Route path="/tutor/:id" element={<TutorProfilePage />} />
              <Route path="/admin" element={<AdminPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;