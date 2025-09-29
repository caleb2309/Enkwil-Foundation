import React, { useState, useEffect } from "react";
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";
import {
  Users,
  UserCheck,
  Clock,
  CheckCircle,
  XCircle,
  Eye,
  Mail,
  Phone,
  MapPin,
  BookOpen,
  Award,
  ChevronRight,
} from "lucide-react";

const AdminPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("dashboard");
  const [pendingApplications, setPendingApplications] = useState([]);
  const [approvedTutors, setApprovedTutors] = useState([]);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [processingId, setProcessingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [stats, setStats] = useState({
    pending: 0,
    approved: 0,
    totalUsers: 0,
    totalTutors: 0,
  });

  useEffect(() => {
    if (!user || user.role !== "admin") {
      navigate("/");
    }
  }, [user, navigate]);

  useEffect(() => {
    fetchData();
  }, [activeTab]);

  const fetchData = async () => {
    setLoading(true);
    setError("");
    try {
      if (activeTab === "pending") {
        const response = await fetch("/api/v1/admin/applications/pending");
        const data = await response.json();
        if (response.ok) setPendingApplications(data.applications);
        else setError(data.message || "Failed to fetch pending applications.");
      } else if (activeTab === "approved") {
        const response = await fetch("/api/v1/admin/tutors/approved");
        const data = await response.json();
        if (response.ok) setApprovedTutors(data.tutors);
        else setError(data.message || "Failed to fetch approved tutors.");
      } else {
        const response = await fetch("/api/v1/admin/dashboard-stats");
        const data = await response.json();
        if (response.ok) setStats(data.stats);
        else setError(data.message || "Failed to fetch dashboard stats.");
      }
    } catch (err) {
console.error(err);
      setError("An error occurred. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleApplicationStatus = async (id, status) => {
    setProcessingId(id);
    try {
      const response = await fetch(`/api/v1/admin/applications/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({ status }),
      });
      const data = await response.json();
      if (response.ok) {
        setPendingApplications((prev) => prev.filter((app) => app._id !== id));
        setSelectedApplication(null);
        await fetchData();
      } else {
        setError(data.message || "Failed to update application status.");
      }
    } catch (err) {
console.error(err);
      setError("An error occurred. Please try again.");
    } finally {
      setProcessingId(null);
    }
  };

  if (!user || user.role !== "admin") {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50 text-charcoal">
        <div className="text-center p-6 bg-white rounded-xl shadow-lg">
          <h1 className="text-2xl font-bold">Access Denied</h1>
          <p className="text-deep-grey mt-2">
            You do not have permission to view this page.
          </p>
        </div>
      </div>
    );
  }

  const StatCard = ({
    title,
    value,
    icon: Icon,
    gradient,
  }) => (
    <div
      className={`relative rounded-xl p-6 flex items-center space-x-4 overflow-hidden transform hover:scale-105 transition-all card-shine ${gradient}`}
    >
      <div className="p-3 bg-white/20 rounded-full backdrop-blur-sm text-white pulse-icon">
        <Icon className="h-8 w-8" />
      </div>
      <div>
        <p className="text-sm text-white/90">{title}</p>
        <h3 className="text-2xl font-bold text-white">{value}</h3>
      </div>
    </div>
  );

  const renderContent = () => {
    if (loading) {
      return (
        <div className="flex justify-center items-center py-20">
          <div className="loader"></div>
          <p className="ml-4 text-deep-grey">Loading data...</p>
        </div>
      );
    }
    if (error) {
      return (
        <div className="text-center text-red-500 py-10 rounded-xl bg-red-50 p-6 border border-red-200 animate-fade-in-down">
          {error}
        </div>
      );
    }

    if (activeTab === "dashboard") {
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Pending Applications"
            value={stats.pending}
            icon={Clock}
            gradient="bg-gradient-to-br from-indigo-600 to-sky-400"
          />
          <StatCard
            title="Approved Tutors"
            value={stats.approved}
            icon={UserCheck}
            gradient="bg-gradient-to-br from-green-600 to-emerald-400"
          />
          <StatCard
            title="Total Users"
            value={stats.totalUsers}
            icon={Users}
            gradient="bg-gradient-to-br from-purple-600 to-pink-400"
          />
          <StatCard
            title="Total Tutors"
            value={stats.totalTutors}
            icon={BookOpen}
            gradient="bg-gradient-to-br from-amber-600 to-orange-400"
          />
        </div>
      );
    }

    if (activeTab === "pending") {
      return (
        <div className="space-y-4 animate-fade-in-up">
          {pendingApplications.length === 0 ? (
            <div className="text-center py-20 text-deep-grey">
              <CheckCircle className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <p>No pending applications at this time.</p>
            </div>
          ) : (
            pendingApplications.map((app) => (
              <div
                key={app._id}
                className="bg-white p-6 rounded-xl border border-gray-100 shadow-md flex justify-between items-center transition-all hover:shadow-lg hover:border-sky-200 application-card"
              >
                <div>
                  <h4 className="text-lg font-semibold text-charcoal">
                    {app.name}
                  </h4>
                  <p className="text-sm text-deep-grey">{app.email}</p>
                </div>
                <button
                  onClick={() => setSelectedApplication(app)}
                  className="px-4 py-2 border border-sky-400 text-sky-400 rounded-lg hover:bg-sky-400 hover:text-white transition-colors flex items-center"
                >
                  <Eye className="h-4 w-4 mr-2" />
                  View
                </button>
              </div>
            ))
          )}
        </div>
      );
    }

    if (activeTab === "approved") {
      return (
        <div className="space-y-4 animate-fade-in-up">
          {approvedTutors.length === 0 ? (
            <div className="text-center py-20 text-deep-grey">
              <UserCheck className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <p>No approved tutors found.</p>
            </div>
          ) : (
            approvedTutors.map((tutor) => (
              <div
                key={tutor._id}
                className="bg-white p-6 rounded-xl border border-gray-100 shadow-md flex justify-between items-center transition-all hover:shadow-lg hover:border-emerald-200 application-card"
              >
                <div>
                  <h4 className="text-lg font-semibold text-charcoal">
                    {tutor.name}
                  </h4>
                  <p className="text-sm text-deep-grey">
                    {tutor.tutorProfile?.courses?.join(", ") || "N/A"}
                  </p>
                </div>
                <button
                  onClick={() => alert(`Viewing profile for ${tutor.name}`)}
                  className="px-4 py-2 border border-emerald-400 text-emerald-400 rounded-lg hover:bg-emerald-400 hover:text-white transition-colors flex items-center"
                >
                  <Eye className="h-4 w-4 mr-2" />
                  View
                </button>
              </div>
            ))
          )}
        </div>
      );
    }
  };

  return (
    <div
      className="min-h-screen bg-gray-50 py-10"
      style={{
        backgroundImage: `radial-gradient(circle, rgba(0, 0, 0, 0.05) 1px, transparent 1px)`,
        backgroundSize: "24px 24px",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-charcoal mb-8 animate-fade-in-down">
          Admin Dashboard
        </h1>

        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 mb-8">
          {["dashboard", "pending", "approved"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-3 px-6 rounded-xl font-medium transform hover:scale-105 transition-all text-white relative overflow-hidden tab-shine ${
                activeTab === tab
                  ? "bg-gradient-to-r from-blue-600 via-sky-500 to-indigo-600 shadow-xl"
                  : "bg-white border-2 border-transparent text-charcoal shadow-md hover:border-sky-400 hover:text-sky-400"
              }`}
            >
              {tab === "dashboard"
                ? "Dashboard"
                : tab === "pending"
                ? "Pending Applications"
                : "Approved Tutors"}
              <ChevronRight
                className={`h-5 w-5 ml-2 transition-transform duration-300 ${
                  activeTab === tab ? "rotate-0" : "rotate-90"
                }`}
              />
            </button>
          ))}
        </div>

        {renderContent()}

        {/* Application Detail Modal */}
        {selectedApplication && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 animate-fade-in">
            <div className="bg-white rounded-3xl border border-deep-grey/20 shadow-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-scale-up-center">
              <div className="flex justify-between items-start mb-6 border-b pb-4 border-gray-100">
                <h3 className="text-2xl font-bold text-charcoal">
                  Application Details
                </h3>
                <button
                  onClick={() => setSelectedApplication(null)}
                  className="text-deep-grey hover:text-charcoal transition-colors transform hover:rotate-90 duration-300"
                >
                  <XCircle className="h-7 w-7" />
                </button>
              </div>

              <div className="space-y-6 text-deep-grey">
                <div className="flex items-start space-x-3">
                  <Users className="h-6 w-6 text-indigo-500 mt-1 pulse-icon" />
                  <div>
                    <span className="font-semibold text-charcoal block">
                      Name
                    </span>
                    <span>{selectedApplication.name}</span>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Mail className="h-6 w-6 text-sky-500 mt-1 pulse-icon" />
                  <div>
                    <span className="font-semibold text-charcoal block">
                      Email
                    </span>
                    <span>{selectedApplication.email}</span>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Phone className="h-6 w-6 text-emerald-500 mt-1 pulse-icon" />
                  <div>
                    <span className="font-semibold text-charcoal block">
                      Phone
                    </span>
                    <span>{selectedApplication.phone}</span>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <MapPin className="h-6 w-6 text-amber-500 mt-1 pulse-icon" />
                  <div>
                    <span className="font-semibold text-charcoal block">
                      Location
                    </span>
                    <span>{selectedApplication.location}</span>
                  </div>
                </div>
                <div className="bg-gray-50 border border-gray-100 rounded-lg p-6 animate-fade-in-up">
                  <h4 className="font-semibold text-charcoal mb-3 flex items-center">
                    <Award className="h-5 w-5 mr-2 text-rose-500" />
                    Qualifications & Bio
                  </h4>
                  <p className="text-sm leading-relaxed mb-4">
                    {selectedApplication.qualifications}
                  </p>
                  <p className="text-sm leading-relaxed">
                    <span className="font-bold">Bio:</span>{" "}
                    {selectedApplication.bio}
                  </p>
                </div>
                <div className="bg-gray-50 border border-gray-100 rounded-lg p-6 animate-fade-in-up delay-100">
                  <h4 className="font-semibold text-charcoal mb-3 flex items-center">
                    <BookOpen className="h-5 w-5 mr-2 text-cyan-500" />
                    Courses
                  </h4>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    {selectedApplication.courses.map((course, i) => (
                      <li key={i}>{course}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-gray-200">
                <p className="text-center font-medium mb-4 text-charcoal">
                  Change Application Status
                </p>
                <div className="flex space-x-4">
                  <button
                    onClick={() =>
                      handleApplicationStatus(selectedApplication._id, "approved")
                    }
                    disabled={processingId === selectedApplication._id}
                    className="flex-1 bg-gradient-to-r from-emerald-500 to-green-600 text-white py-3 px-6 rounded-lg font-medium hover:opacity-90 transition-all disabled:opacity-50"
                  >
                    {processingId === selectedApplication._id ? (
                      <div className="flex items-center justify-center">
                        <div className="loader small"></div>
                        Processing...
                      </div>
                    ) : (
                      <div className="flex items-center justify-center">
                        <CheckCircle className="h-5 w-5 mr-2" />
                        Approve
                      </div>
                    )}
                  </button>
                  <button
                    onClick={() =>
                      handleApplicationStatus(selectedApplication._id, "rejected")
                    }
                    disabled={processingId === selectedApplication._id}
                    className="flex-1 bg-gradient-to-r from-red-500 to-rose-600 text-white py-3 px-6 rounded-lg font-medium hover:opacity-90 transition-all disabled:opacity-50"
                  >
                    <div className="flex items-center justify-center">
                      <XCircle className="h-5 w-5 mr-2" />
                      Reject
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        /* Custom Colors */
        :root {
          --charcoal: #1f2937;
          --deep-grey: #4b5563;
          --sky-blue: #0ea5e9;
          --indigo-blue: #4f46e5;
          --gold: #f59e0b;
        }

        /* Animations */
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
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes scale-up-center {
          from {
            transform: scale(0.9);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }
        @keyframes pop-in {
          0% {
            opacity: 0;
            transform: scale(0.95);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }
        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.1);
          }
        }
        @keyframes shine {
          0% {
            transform: scale(0) rotate(45deg);
            opacity: 0;
          }
          80% {
            transform: scale(0) rotate(45deg);
            opacity: 0;
          }
          100% {
            transform: scale(5) rotate(45deg);
            opacity: 1;
          }
        }
        @keyframes loader-spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }

        /* Applying Animations */
        .animate-fade-in-down {
          animation: fade-in-down 0.6s ease-out forwards;
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out forwards;
        }
        .animate-scale-up-center {
          animation: scale-up-center 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
        }
        .pulse-icon {
          animation: pulse 2s ease-in-out infinite;
        }
        .card-shine:hover::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(255, 255, 255, 0.2);
          transform: translateX(-100%);
          animation: shine 1s;
        }
        .tab-shine:hover::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 200%;
          height: 100%;
          background: rgba(255, 255, 255, 0.2);
          transform: rotate(30deg);
          transition: transform 0.3s ease-in-out;
        }
        .tab-shine:hover::before {
          transform: translateX(100%) rotate(30deg);
        }
        .application-card {
            animation: pop-in 0.5s ease-out forwards;
            animation-delay: var(--delay);
            opacity: 0;
        }
        .application-card:nth-child(1) { --delay: 0s; }
        .application-card:nth-child(2) { --delay: 0.1s; }
        .application-card:nth-child(3) { --delay: 0.2s; }
        .application-card:nth-child(4) { --delay: 0.3s; }
        .application-card:nth-child(5) { --delay: 0.4s; }

        /* Loader */
        .loader {
            width: 3rem;
            height: 3rem;
            border: 4px solid #f3f3f3;
            border-top: 4px solid #1f2937;
            border-radius: 50%;
            animation: loader-spin 1s linear infinite;
        }
        .loader.small {
            width: 1.25rem;
            height: 1.25rem;
            border: 2px solid #fff;
            border-top: 2px solid #e2e8f0;
        }

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

export default AdminPage;