import React, { useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import './ProfilePage.css';

import ProfileBanner from './ProfileBanner';
import TopPicksRow from './TopPicksRow';
import ContinueWatching from './ContinueWatching';
import { getProfileRouteState, ProfileRouteState, rememberSelectedProfile, resolveProfileName } from './profileConfig';

const ProfilePage: React.FC = () => {
  const location = useLocation();
  const { profileName } = useParams<{ profileName: string }>();
  const profile = resolveProfileName(profileName);
  const profileState = getProfileRouteState(profile);
  const locationState = location.state as Partial<ProfileRouteState> | null;
  const backgroundGif = locationState?.selectedProfile === profile && locationState.backgroundGif
    ? locationState.backgroundGif
    : profileState.backgroundGif;

  useEffect(() => {
    rememberSelectedProfile(profile);
  }, [profile]);

  return (
    <>
      <div
        className="profile-page"
        style={{ backgroundImage: `url(${backgroundGif})` }}
      >
        <ProfileBanner
        />
      </div>
      <TopPicksRow profile={profile} />
      <ContinueWatching profile={profile} />
    </>
  );
};

export default ProfilePage;
