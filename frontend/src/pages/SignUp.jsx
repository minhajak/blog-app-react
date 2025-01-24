import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from '../css/signup.module.css'
import { useSelector } from 'react-redux';



const SignUp = () => {
    const navigate = useNavigate();
    const { isAuthenticated } = useSelector(state => state.auth);
    if(isAuthenticated){
      navigate('/signIn')
    }
    const [formData, setFormData] = useState({
        username: '',
        age: '',
        gender: '',
        email: '',
        password: '',
    });

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
            const response = await axios.post('http://localhost:5000/users/add-user', formData);
            if (response.status === 201) {
                console.log('User  added:', response.data);
                alert('User  registered successfully!');
                setFormData({
                    username: '',
                    age: '',
                    gender: '',
                    email: '',
                    password: '',
                });
                navigate('/signin');
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            const errorMessage = error.response?.data?.message || 'An error occurred. Please try again.';
            alert(`Error: ${errorMessage}`);
        }
    };

    return (
        <div className={styles.container}>
            <form onSubmit={handleSubmit} className={styles.form}>
                <h2 className={styles.header}>Sign Up</h2>
                <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    placeholder="Enter your name"
                    required
                    className={styles.username}
                />
                <input
                    type="number"
                    name="age"
                    value={formData.age}
                    onChange={handleChange}
                    placeholder="Enter your age"
                    className={styles.age}
                    required
                />
                <div className={styles.gender} >
                    <label>Gender:  </label>
                    <input
                        type="radio"
                        name="gender"
                        value="male"
                        checked={formData.gender === 'male'}
                        onChange={handleChange}
                        required
                    />{' '}
                    Male
                    <input
                        type="radio"
                        name="gender"
                        value="female"
                        checked={formData.gender === 'female'}
                        onChange={handleChange}
                        required
                    />{' '}
                    Female

                </div>
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    className={styles.email}
                    required
                />
                <input
                    type="password"
                    name="password"
                    value={formData.password}
                    className={styles.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    required
                />
                <button className={styles.submit} type="submit">Submit</button>
                <Link to='/signIn'>already have an account?</Link>

            </form>
        </div>
    );
};

export default SignUp;
