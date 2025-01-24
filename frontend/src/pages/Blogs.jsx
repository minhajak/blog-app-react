import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import BlogSmall from '../components/BlogSmall';
import styles from '../css/blogs.module.css'
const Blogs = () => {
    const [blogs, setBlogs] = useState([]);
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBlogsAndUsers = async () => {
            try {
                const blogsResponse = await axios.get('http://localhost:5000/blogs/myblogs');
                const usersResponse = await axios.get('http://localhost:5000/users');
                setBlogs(Array.isArray(blogsResponse.data) ? blogsResponse.data : []);
                setUsers(Array.isArray(usersResponse.data) ? usersResponse.data : []);
            } catch (error) {
                console.error('Error fetching data:', error);
                setBlogs([]);
                setUsers([]);
            }
        };
        fetchBlogsAndUsers();
    }, []);

    const handleCard = (id) => {
        navigate(`/blog/${id}`);
    };
    const handleLatest = ()=>{
        const fetchBlogsAndUsers = async () => {
            try {
                const blogsResponse = await axios.get('http://localhost:5000/blogs/latest');
                const usersResponse = await axios.get('http://localhost:5000/users');
                setBlogs(Array.isArray(blogsResponse.data) ? blogsResponse.data : []);
                setUsers(Array.isArray(usersResponse.data) ? usersResponse.data : []);
            } catch (error) {
                console.error('Error fetching data:', error);
                setBlogs([]);
                setUsers([]);
            }
        };
        fetchBlogsAndUsers();
    }
    return (
        <div className={styles.container}>
            <button><Link onClick={handleLatest} >Latest</Link></button>
            {blogs.length === 0 ? (
                <p>No blogs available.</p>
            ) : (
                <BlogSmall handleLatest={handleLatest} users={users} blogs={blogs} handleCard={handleCard} />
            )}
        </div>
    );
};
export default Blogs;
