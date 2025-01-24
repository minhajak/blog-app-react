import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import UserDashboard from '../components/UserDashboard';
import { setCredentials, clearCredentials } from '../auth/authSlice';

const Dashboard = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { user, token, isAuthenticated } = useSelector(state => state.auth);

    useEffect(() => {
        // Redirect to SignIn if not authenticated
        if (!isAuthenticated) {
            navigate('/signin');
            return;
        }

        // Fetch user data if not already in Redux state
        if (!user) {
            const fetchUser = async () => {
                try {
                    const response = await axios.get(`http://localhost:5000/users/${token}`);
                    console.log(response.data);
                    dispatch(setCredentials({ user: response.data, token })); // Update user data in Redux
                } catch (error) {
                    console.error('Error fetching user:', error);
                    dispatch(clearCredentials()); // Clear Redux state on error
                    navigate('/signin'); // Redirect to SignIn
                }
            };

            fetchUser();
        }
    }, [dispatch, isAuthenticated, navigate, token, user]);

    return (
        <>
            {user ? <UserDashboard user={user} /> : <p>Loading...</p>}
        </>
    );
};

export default Dashboard;
