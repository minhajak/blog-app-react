import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import styles from '../css/edituser.module.css';
import { setCredentials } from '../auth/authSlice';

const EditUser = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // Retrieve user data from Redux
    const { user, token, isAuthenticated } = useSelector((state) => state.auth);

    const [formData, setFormData] = useState({
        username: '',
        age: '',
        gender: '',
        email: '',
        password: '',
    });

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/signin');
            return;
        }

        // Populate form with user data from Redux
        if (user) {
            setFormData({
                username: user.username || '',
                age: user.age || '',
                gender: user.gender || '',
                email: user.email || '',
                password: '',
            });
        }
    }, [user, isAuthenticated, navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.put(
                `http://localhost:5000/users/update-user/${user._id}`,
                { ...formData, token }, // Pass token if required for authentication
                { headers: { Authorization: `Bearer ${token}` } }
            );

            if (response.status === 200) {
                alert('User updated successfully!');
                dispatch(setCredentials({ user: response.data.user, token }));
                navigate('/dashboard');
            }
        } catch (error) {
            console.error('Error updating user:', error);
            const errorMessage = error.response?.data?.message || 'An error occurred. Please try again.';
            alert(`Error: ${errorMessage}`);
        }
    };

    return (
        <div className={styles.container}>
            <form onSubmit={handleSubmit} className={styles.form}>
                <h2 className={styles.header}>Edit User</h2>

                <div className={styles.username}>
                    <label>
                        Username:
                        <input
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            required
                        />
                    </label>
                </div>

                <div className={styles.age}>
                    <label>
                        Age:
                        <input
                            type="number"
                            name="age"
                            value={formData.age}
                            onChange={handleChange}
                            required
                            min="1"
                        />
                    </label>
                </div>

                <div className={styles.gender}>
                    <label>
                        Gender:
                        <select
                            name="gender"
                            value={formData.gender}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Select</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                        </select>
                    </label>
                </div>

                <div className={styles.email}>
                    <label>
                        Email:
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </label>
                </div>

                <div className={styles.password}>
                    <label>
                        Password:
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            minLength="6"
                        />
                    </label>
                </div>

                <button type="submit" className={styles.submit}>
                    Save Changes
                </button>
            </form>
        </div>
    );
};

export default EditUser;
