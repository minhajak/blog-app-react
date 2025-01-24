import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import BlogCard from '../components/BlogCard';
import { useSelector } from 'react-redux';
import styles from '../css/myblogs.module.css'

const MyBlogs = () => {
    const [blogs, setBlogs] = useState([]); // Initialize as an empty array
    const { user, token, isAuthenticated } = useSelector(state => state.auth);
    const navigate = useNavigate();

    // Redirect to signin if the user is not authenticated
    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/signin');
        }
    }, [isAuthenticated, navigate]);

    useEffect(() => {
        if (user?._id) {
            const fetchBlogs = async () => {
                console.log(token)
                try {
                    const response = await axios.get(`http://localhost:5000/blogs/myblogs/${user._id}`, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });
                    setBlogs(Array.isArray(response.data) ? response.data : []);
                } catch (error) {
                    console.error('Error fetching blogs:', error);
                }
            };

            fetchBlogs();
        }
    }, [user?._id, token]); // Only refetch blogs if user._id or token changes

    return (
        <div>
            {blogs.length > 0 ? (
                <BlogCard blogs={blogs} id={user._id} />
            ) : (
                <p>No blogs found. Start writing your first blog!</p>
            )}
            <Link to='/addblog' className={styles.addBlog}>
                Add New Blog
            </Link>
        </div>
    );
};

export default MyBlogs;
