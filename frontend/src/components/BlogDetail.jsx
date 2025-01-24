import React from 'react'

const BlogDetail = ({ prop }) => {
    const token = localStorage.getItem('authToken')
    return (

        <>
            <div style={styles.container}>
                <div style={styles.blogWrapper}>
                    <h1 style={styles.title}>{prop.blog.title}</h1>
                    <p style={styles.author}>
                        {prop.author ? `By ${prop.author.username}` : 'Unknown Author'} | {prop.getTimeElapsed(prop.blog.createdAt)}
                    </p>

                    <div style={styles.content}>
                        <p>{prop.blog.content}</p>
                    </div>
                    <div style={styles.actions}>
                        {token && (
                            <button
                                onClick={prop.likeBtn ? prop.handleDislikes : prop.handleLikes}
                                style={{
                                    ...styles.button,
                                    backgroundColor: prop.likeBtn ? '#dc3545' : '#28a745',
                                }}
                            >
                                {prop.likeBtn ? 'Dislike' : 'Like'}
                            </button>
                        )}
                        <p style={styles.likes}>Likes: {prop.likes.length}</p>
                    </div>
                </div>
            </div>
        </>
    )

}
const styles = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        padding: '20px',
        backgroundColor: '#f8f9fa',
        minHeight: '100vh',
    },
    blogWrapper: {
        maxWidth: '800px',
        width: '100%',
        backgroundColor: '#fff',
        boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
        borderRadius: '8px',
        overflow: 'hidden',
    },
    title: {
        fontSize: '2.5rem',
        margin: '20px',
        color: '#333',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    author: {
        fontSize: '1rem',
        margin: '10px 20px',
        color: '#666',
        fontStyle: 'italic',
    },
    image: {
        width: '100%',
        height: 'auto',
        objectFit: 'cover',
    },
    content: {
        padding: '20px',
        fontSize: '1.1rem',
        lineHeight: '1.6',
        color: '#555',
    },
    actions: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '20px',
        borderTop: '1px solid #ddd',
    },
    button: {
        padding: '10px 20px',
        border: 'none',
        borderRadius: '4px',
        color: '#fff',
        fontSize: '1rem',
        cursor: 'pointer',
    },
    likes: {
        fontSize: '1rem',
        color: '#333',
    },
};

export default BlogDetail