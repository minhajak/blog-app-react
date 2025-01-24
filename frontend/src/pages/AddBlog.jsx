import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from '../css/addblog.module.css'
import { useSelector } from 'react-redux';

const AddBlog = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();



    const { user, token, isAuthenticated } = useSelector(state => state.auth)
    const userId = user._id;

    if (!isAuthenticated) {
        navigate('/signin');
    }


    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!title || !content) {
            setError('Please fill in all fields');
            return;
        }
        console.log(` token is ${userId}`);

        try {
            const response = await axios.post(
                'http://localhost:5000/blogs/add-blog',
                { title, content, userId }, // Send userId explicitly along with title and content

            );

            console.log('Blog created:', response.data);
            navigate('/myblogs'); // Redirect to the user's blogs page or the blog list
        } catch (error) {
            setError('Error creating blog, please try again.');
            console.error('Error creating blog:', error);
        }
    };

    return (
        <div className={styles.container}>
            {error && <p>{error}</p>}
            <form onSubmit={handleSubmit} className={styles.form}>
                <h1 className={styles.header}>Create Blog</h1>
                <input
                    type="text"
                    placeholder="Blog Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
                <textarea
                    placeholder="Blog Content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    required
                />
                <button type="submit">Create Blog</button>
            </form>
        </div>
    );
};

export default AddBlog;
