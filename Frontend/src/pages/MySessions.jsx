import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getMySessions } from "../Services/Session";
import { UserDataContext } from "../context/AuthContext";
import SessionCard from "../components/SessionCard";
import { FaBars, FaTimes, FaLayerGroup, FaRegFileAlt, FaRegCheckCircle, FaPlus } from "react-icons/fa";

const MySessions = () => {
  const navigate = useNavigate();
  const { user } = useContext(UserDataContext);

  const [sessions, setSessions] = useState([]);
  const [drafts, setDrafts] = useState([]);
  const [published, setPublished] = useState([]);
  const [filter, setFilter] = useState("all");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Redirect if not logged in
  useEffect(() => {
    if (!user?.email) {
      navigate("/login");
    }
  }, [user, navigate]);

  // Fetch user's sessions
  useEffect(() => {
    if (user?.email) {
      const token = localStorage.getItem("token");
      getMySessions(token)
        .then((res) => {
          setSessions(res.data.data.mySessions);
          setDrafts(res.data.data.drafts);
          setPublished(res.data.data.published);
        })
        .catch((err) => console.error("Error fetching sessions:", err));
    }
  }, [user]);

  const filteredSessions = filter === "drafts" ? drafts : filter === "published" ? published : sessions;

  return (
    <div className="flex md:min-h-screen">
      <button
        className="md:hidden p-4 text-2xl flex justify-baseline"
        onClick={() => setIsSidebarOpen(true)}
      >
        <FaBars />
      </button>

      {/* Sidebar */}
      <div
        className={`fixed md:static top-20 md:top-0 left-0 min-h-[70vh] w-64 bg-white p-6 border-r transition-transform duration-300 z-10 
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
      >
        <div className="flex justify-between items-center mb-6 md:hidden">
          <h2 className="text-lg font-bold">My Sessions</h2>
          <button
            className="text-2xl"
            onClick={() => setIsSidebarOpen(false)}
          >
            <FaTimes />
          </button>
        </div>

        {/* Sidebar Links */}
        <ul className="space-y-3">
          <li
            className={`flex items-center gap-3 cursor-pointer ${filter === "all" ? "font-semibold text-blue-600" : ""
              }`}
            onClick={() => setFilter("all")}
          >
            <FaLayerGroup /> All Sessions
          </li>
          <li
            className={`flex items-center gap-3 cursor-pointer ${filter === "published" ? "font-semibold text-blue-600" : ""
              }`}
            onClick={() => setFilter("published")}
          >
            <FaRegCheckCircle /> Published ({published.length})
          </li>
          <li
            className={`flex items-center gap-3 cursor-pointer ${filter === "drafts" ? "font-semibold text-blue-600" : ""
              }`}
            onClick={() => setFilter("drafts")}
          >
            <FaRegFileAlt /> Drafts ({drafts.length})
          </li>
        </ul>

        {/* Add Session Button */}
        <div className="mt-6">
          <button
            className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 w-full"
            onClick={() => navigate("/add-session")}
          >
            <FaPlus /> Add Session
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        <h2 className="text-xl font-bold mb-4">
          {filter === "all" ? "All Sessions" : filter === "drafts" ? "Draft Sessions" : "Published Sessions"}
        </h2>

        {/* Session Cards */}
        <div className="flex flex-wrap gap-6">
          {filteredSessions.length > 0 ? (
            filteredSessions.map((session) => (
              <SessionCard
                key={session._id}
                id={session._id}
                title={session.title}
                tags={session.tags}
                status={session.status}
                json_file_url={session.json_file_url}
              />
            ))
          ) : (
            <p className="text-gray-500">No sessions found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MySessions;
