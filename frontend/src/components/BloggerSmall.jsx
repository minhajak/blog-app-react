import React from 'react';
import { useNavigate } from 'react-router-dom';

import styles from '../css/bloggers.module.css';
import image from '../images/no.png'

const BloggerSmall = ({ users }) => {
    const navigate = useNavigate();

    const handleBlogger = (id) => (e) => {
        e.preventDefault();
        navigate(`/viewBlogs/${id}`);
    };

    return (
        <div className={styles.container}>
            {users.map((user, index) => (
                <div
                    key={index}
                    className={styles.card}
                    onClick={handleBlogger(user._id)}
                >
                    <img src={user.profilePicture || image} alt='no picture' />
                    <h2>Name: {user.username}</h2>
                </div>
            ))}
        </div>
    );
};

export default BloggerSmall;
