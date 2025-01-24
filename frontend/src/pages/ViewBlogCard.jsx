import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import styles from '../css/viewblogcard.module.css';
import { useSelector } from 'react-redux';

const ViewBlogCard = () => {
    const { id } = useParams(); // Extract blogId from params
    const [blog, setBlog] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();  // For redirect after deletion
    const { isAuthenticated, user } = useSelector(state => state.auth); // Get authentication status and user data

    // Fetch blog data
    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/signin'); // Redirect to sign-in if not authenticated
            return;
        }

        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`http://localhost:5000/blogs/blog/${id}`);
                setBlog(response.data);
            } catch (error) {
                setError('Failed to fetch blog data.');
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchData();
        }
    }, [id, isAuthenticated, navigate]); // Depend on `id`, `isAuthenticated`, and `navigate`

    // Handle delete action
    const handleDelete = async () => {
        if (!window.confirm('Are you sure you want to delete this blog?')) return;

        try {
            const response = await axios.delete(`http://localhost:5000/blogs/${id}`);
            if (response.status === 200) {
                alert('Blog deleted successfully!');
                navigate('/myblogs'); // Redirect to the blogs list after deletion
            }
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'Failed to delete the blog.';
            alert(`Error: ${errorMessage}`);
            console.error('Error deleting blog:', error);
        }
    };

    // Show loading, error, or actual content
    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    // Check if the user is authorized to edit or delete this blog
    const isOwner = user && user._id === blog.userId;

    return (
        <>
            {
                isOwner ? (
                    <div key={blog._id} className={styles.card}>
                        <h3 className={styles.heading}>{blog.title}</h3>
                        <p className={styles.content}>{blog.content}</p>
                        <div className={styles.actions}>
                            <Link className={styles.edit} to={`/update-blog/${blog._id}`}>Edit</Link>
                            <Link className={styles.delete} onClick={handleDelete}>
                                Delete
                            </Link>
                        </div>
                    </div>
                ) : (
                    <p>You are not authorized to view or edit this blog.</p> // More user-friendly error message
                )
            }
        </>
    );
};

export default ViewBlogCard;
