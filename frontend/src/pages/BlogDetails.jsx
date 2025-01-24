import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import BlogDetail from '../components/BlogDetail';
import { useSelector } from 'react-redux';

const BlogDetails = () => {
    const [blog, setBlog] = useState(null);
    const [author, setAuthor] = useState(null);
    const [likes, setLikes] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true); // Add loading state
    const { id } = useParams();
    const navigate = useNavigate();
    const { user, token, isAuthenticated } = useSelector((state) => state.auth);
    const API_BASE_URL = 'http://localhost:5000';

    const fetchBlogDetails = useCallback(async () => {
        try {
            setError(''); // Clear previous errors
            setLoading(true); // Start loading state

            // Fetch blog details
            const { data: blogData } = await axios.get(`${API_BASE_URL}/blogs/blog/${id}`);
            setBlog(blogData);
            setLikes(blogData.likes || []);

            // Fetch author details
            const { data: authorData } = await axios.get(`${API_BASE_URL}/users/${blogData.userId}`);
            setAuthor(authorData);
        } catch (err) {
            setError('Failed to load blog details. Please try again later.');
            console.error('Error fetching blog details:', err);
        } finally {
            setLoading(false); // Stop loading state
        }
    }, [id]);

    useEffect(() => {
        fetchBlogDetails();
    }, [fetchBlogDetails]);

    const handleLikes = async () => {
        if (!isAuthenticated) {
            navigate('/signin'); // Redirect unauthenticated users
            return;
        }

        try {
            const updatedLikes = [...likes, user._id];
            setLikes(updatedLikes);

            await axios.put(
                `${API_BASE_URL}/blogs/likes/${id}`,
                { likes: updatedLikes },
                { headers: { Authorization: `Bearer ${token}` } } // Include token for protected routes
            );
        } catch (err) {
            console.error('Error liking blog:', err);
            setError('Failed to like the blog. Please try again.');
        }
    };

    const handleDislikes = async () => {
        if (!isAuthenticated) {
            navigate('/signin'); 
            return;
        }

        try {
            const updatedLikes = likes.filter((userId) => userId !== user._id);
            setLikes(updatedLikes);

            await axios.put(
                `${API_BASE_URL}/blogs/likes/${id}`,
                { likes: updatedLikes },
                { headers: { Authorization: `Bearer ${token}` } } 
            );
        } catch (err) {
            console.error('Error disliking blog:', err);
            setError('Failed to dislike the blog. Please try again.');
        }
    };

    const getTimeElapsed = (createdAt) => {
        const createdDate = new Date(createdAt);
        const now = new Date();
        const timeDiff = now - createdDate;

        const diffDays = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
        const diffHours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const diffMinutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
        const diffSeconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

        if (diffDays > 0) return `${diffDays} day(s) ago`;
        if (diffHours > 0) return `${diffHours} hour(s) ago`;
        if (diffMinutes > 0) return `${diffMinutes} minute(s) ago`;
        return `${diffSeconds} second(s) ago`;
    };

    if (loading) {
        return <p>Loading blog details...</p>;
    }

    if (error) {
        return <p className="error-message">{error}</p>;
    }

    if (!blog) {
        return <p>No blog found.</p>;
    }

    const isLiked = likes.includes(user?._id);

    return (
        <>
            <BlogDetail
                prop={{
                    getTimeElapsed,
                    handleDislikes,
                    handleLikes,
                    blog,
                    likeBtn: isLiked, 
                    likes,
                    author,
                }}
            />
        </>
    );
};

export default BlogDetails;
