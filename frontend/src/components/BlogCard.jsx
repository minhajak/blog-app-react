import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import styles from '../css/myblogs.module.css'

const BlogCard = ({ blogs, id, handleDelete }) => {
    let [blogas, setBlogas] = useState();
    const match = blogs.some((blog) => blog.userId === id);
    const navigate = useNavigate();
    const handleClick = (id) => (e) => {
        e.preventDefault();
        navigate(`/myblogs/${id}`)
    }
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
    return (
        <div className={styles.container}>
            {blogs.length === 0 ? (
                <p>No blogs available.</p>
            ) : (
                blogs.map((blog) => (
                    <div key={blog._id} onClick={handleClick(blog._id)} className={styles.blogCard}>
                        <h3>{blog.title}</h3>
                        <p>{getTimeElapsed(blog.createdAt)}</p>
                    </div>
                ))
            )}
        </div>
    )
}

export default BlogCard