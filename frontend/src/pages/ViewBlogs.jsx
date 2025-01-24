import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';
import styles from '../css/blogs.module.css'
import BlogSmall from '../components/BlogSmall';

const ViewBlogs = () => {
    const { id } = useParams();
    const [blogs, setBlogs] = useState([]);
    const navigate = useNavigate();
    const [users,setUsers] = useState([]);

    useEffect(() => {
        if (!id) {
            navigate('/signin');
            return;
        }

        const fetchBlogs = async () => {
            try {
                const blogResponse = await axios.get(`http://localhost:5000/blogs/myblogs/${id}`);
                const usersResponse = await axios.get('http://localhost:5000/users');
                
                setBlogs(Array.isArray(blogResponse.data) ? blogResponse.data : []);
                setUsers(Array.isArray(usersResponse.data) ? usersResponse.data : []);
            } catch (error) {
                console.error('Error fetching blogs:', error);
                setBlogs([]);
                setUsers([]);
            }
        };

        fetchBlogs();
    }, [id, navigate]);
    
    const handleCard = (id) => {
        navigate(`/blog/${id}`);
    };

    return (
        <div className={styles.container}>
            {blogs.length === 0 ? (
                <p>No blogs available.</p>
            ) : (
              <BlogSmall users={users} blogs={blogs} handleCard={handleCard} />
            )}
        </div>
    );
};

export default ViewBlogs;
