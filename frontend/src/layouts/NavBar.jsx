import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { clearCredentials } from '../auth/authSlice';
import Nav from '../components/Nav';

const NavBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector(state => state.auth);

  const handleLogout = () => {
    // Clear the Redux state for authentication
    dispatch(clearCredentials());
    navigate('/signIn');
  };

  return (
    <Nav handleLogout={handleLogout} isAuthenticated={isAuthenticated} />
  );
};

export default NavBar;
