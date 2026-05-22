import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaHome, FaBriefcase, FaTools, FaProjectDiagram, FaEnvelope } from 'react-icons/fa'; // Import icons
import './Navbar.css';
import netflixLogo from '../images/logo-2.png';
import {
  getProfileRouteState,
  ProfileRouteState,
  rememberSelectedProfile,
  resolveProfileName,
} from '../profilePage/profileConfig';

const Navbar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const routeProfileName = location.pathname.startsWith('/profile/')
    ? decodeURIComponent(location.pathname.split('/')[2] || '')
    : null;
  const locationState = location.state as Partial<ProfileRouteState> | null;
  const selectedProfile = resolveProfileName(routeProfileName || locationState?.selectedProfile);
  const profileState = getProfileRouteState(selectedProfile);
  const hasMatchingProfileState = locationState?.selectedProfile === selectedProfile;
  const profileImage = hasMatchingProfileState && locationState?.profileImage
    ? locationState.profileImage
    : profileState.profileImage;
  const homePath = `/profile/${selectedProfile}`;

  const handleScroll = () => {
    setIsScrolled(window.scrollY > 80);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    rememberSelectedProfile(selectedProfile);
  }, [selectedProfile]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <>
      <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
        <div className="navbar-left">
          <Link to="/" className="navbar-logo">
            <img src={netflixLogo} alt="Netflix" />
          </Link>
          <ul className="navbar-links">
            <li><Link to={homePath} state={profileState}>Home</Link></li>
            <li><Link to="/work-experience" state={profileState}>Professional</Link></li>
            <li><Link to="/skills" state={profileState}>Skills</Link></li>
            <li><Link to="/projects" state={profileState}>Projects</Link></li>
            <li><Link to="/contact-me" state={profileState}>Hire Me</Link></li>
          </ul>
        </div>
        <div className="navbar-right">
          {/* Hamburger menu for mobile */}
          <div className="hamburger" onClick={toggleSidebar}>
            <div></div>
            <div></div>
            <div></div>
          </div>
          <img src={profileImage} alt="Profile" className="profile-icon" onClick={() => { navigate('/browse') }} />
        </div>
      </nav>

      {/* Sidebar Overlay */}
      <div className={`sidebar-overlay ${isSidebarOpen ? 'open' : ''}`} onClick={closeSidebar}></div>

      {/* Sidebar (only visible on mobile) */}
      <div className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-logo">
          <img src={netflixLogo} alt="Netflix Logo" />
        </div>
        <ul>
          <li><Link to={homePath} state={profileState} onClick={closeSidebar}><FaHome /> Home</Link></li>
          <li><Link to="/work-experience" state={profileState} onClick={closeSidebar}><FaBriefcase /> Professional</Link></li>
          <li><Link to="/skills" state={profileState} onClick={closeSidebar}><FaTools /> Skills</Link></li>
          <li><Link to="/projects" state={profileState} onClick={closeSidebar}><FaProjectDiagram /> Projects</Link></li>
          <li><Link to="/contact-me" state={profileState} onClick={closeSidebar}><FaEnvelope /> Hire Me</Link></li>
        </ul>
      </div>
    </>
  );
};

export default Navbar;
