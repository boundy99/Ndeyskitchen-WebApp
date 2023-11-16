import React from 'react';
import { useNavigate } from 'react-router-dom';
import Headroom from 'react-headroom';

export default function ProfilePageNavbar() {
  const navigate = useNavigate();
  return (
    <Headroom>
      <nav className="profile-navbar-container">
        <span
          class="material-symbols-outlined navbar-icons"
          onClick={() => navigate('/')}
        >
          arrow_back_ios
        </span>
      </nav>
    </Headroom>
  );
}