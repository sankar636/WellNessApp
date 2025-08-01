import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import HeroImage from "../assets/HeroImage1.jpg";
import { UserDataContext } from "../context/AuthContext.jsx";

const SessionCard = ({ id, title, status, json_file_url, tags }) => {

  const navigate = useNavigate();
  const { user, logoutUser } = useContext(UserDataContext);


  const handleCardClick = (e) => {
    if (e.target.tagName === 'A') {
      return;
    }
    if (!id) {
      // console.error('No ID provided for session card');
      return;
    }
    navigate(`/session/${id}`);
  };

  return (
    <div
      className="relative max-w-sm rounded-xl overflow-hidden shadow-lg cursor-pointer"
      onClick={handleCardClick}
    >
      <img
        src={HeroImage}
        alt="Session"
        className="w-full h-64 object-cover"
      />
      <div className="absolute top-2 left-2 bg-white text-sm font-semibold text-black px-3 py-1 rounded-full shadow">
        {user._id ? `View` : ""}
      </div>
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent text-white p-4 rounded-b-xl">
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-sm mb-2">
          {tags && tags.map((tag, index) => (
            <span key={index} className="mr-2">{tag}</span>
          ))}
        </p>
        <p className="text-xs opacity-80 mb-4">Status: {status}</p>
        <div className='flex justify-between'>
          <span className="text-sm font-medium underline hover:no-underline flex items-center gap-1">
            Visit Link →
          </span>
          <a
            href={json_file_url}
            onClick={(e) => e.stopPropagation()}
            className="text-blue-400 text-xs"
          >
            {json_file_url}
          </a>
        </div>
      </div>
    </div>
  );
};

export default SessionCard;
