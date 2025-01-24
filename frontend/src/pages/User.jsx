import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import UserDashboard from '../components/UserDashboard';

const User = () => {
    const { id } = useParams();
    const [user, setUser ] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUser  = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/users/${id}`);
                setUser (response.data);
                setError(null);
            } catch (error) {
                console.error('Error fetching user:', error);
                setError('Failed to fetch user data.');
            }
        };

        fetchUser ();
    }, [id]);

    if (error) {
        return <div>{error}</div>;
    }

    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <>
        <UserDashboard/>
        </>
    );
};

export default User;