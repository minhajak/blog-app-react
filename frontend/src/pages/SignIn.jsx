import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch,useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setCredentials } from '../auth/authSlice';
import SignInForm from '../components/SignInForm';

const SignIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { isAuthenticated } = useSelector(state => state.auth)

  const handleSubmit = (e) => {
    e.preventDefault();
    const userCredentials = { email, password };

    axios.post('http://localhost:5000/auth/signin', userCredentials)
      .then(response => {
        const { user, token } = response.data;

        dispatch(setCredentials({ user, token }));

        alert(`Welcome, ${user.username}!`);
        navigate('/');
      })
      .catch(error => {
        console.error('Error logging in:', error);
      });
  };
  if(isAuthenticated){
    navigate('/dashboard')
  }



  return (
    <div>
      <SignInForm
        handleSubmit={handleSubmit}
        setEmail={setEmail}
        setPassword={setPassword}
        email={email}
        password={password}
      />
    </div>
  );
};

export default SignIn;
