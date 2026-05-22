import React from 'react';
import { useNavigate } from 'react-router-dom';
import ProfileCard from '../components/ProfileCard';
import { getProfileRouteState, ProfileConfig, profiles, rememberSelectedProfile } from '../profilePage/profileConfig';
import './browse.css';

const Browse: React.FC = () => {
  const navigate = useNavigate();

  const handleProfileClick = (profile: ProfileConfig) => {
    rememberSelectedProfile(profile.name);
    navigate(`/profile/${profile.name}`, { state: getProfileRouteState(profile.name) });
  };

  return (
    <div className="browse-container">
      <p className='who-is-watching'>Who's Watching?</p>
      <div className="profiles">
        {profiles.map((profile, index) => (
          <ProfileCard
            key={index}
            name={profile.name}
            image={profile.image}
            onClick={() => handleProfileClick(profile)}
          />
        ))}
      </div>
    </div>
  );
};

export default Browse;
