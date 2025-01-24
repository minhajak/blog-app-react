import React from 'react'
import styles from '../css/blogs.module.css'

const BlogSmall = ({ users, blogs, handleCard }) => {
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
        blogs.map((blog) => {
            const author = users.find((user) => user._id === blog.userId);
            return (
                <div
                    key={blog._id}
                    className={styles.blogCard}
                    onClick={() => handleCard(blog._id)}
                >
                    <h3>{blog.title}
                        <p>by</p>  <span>{author ? author.username : 'Unknown Author'}</span>

                    </h3>
                    <p>{getTimeElapsed(blog.createdAt)}</p>

                </div>
            );
        })
    )
}

export default BlogSmall