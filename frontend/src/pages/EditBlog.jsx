import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from '../css/editblog.module.css'
import { useSelector } from 'react-redux';

const EditBlog = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    content: '',
  });
  const { user, token, isAuthenticated } = useSelector(state => state.auth);
  if(!isAuthenticated){
    navigate('/signIn')
  }

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/blogs/blog/${id}`);
        setFormData({
          title: response.data.title || '',
          content: response.data.content || '',
        });
      } catch (error) {
        console.error('Error fetching blog:', error);
        alert('Failed to fetch blog details.');
      }
    };

    fetchBlog();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(`http://localhost:5000/blogs/update-blog/${id}`, formData);
      if (response.status === 200) {
        alert('Blog updated successfully!');
        navigate('/myblogs');
      }
    } catch (error) {
      console.error('Error updating blog:', error);
      alert('Failed to update the blog.');
    }
  };

  return (
    <div className={styles.container} >
      <h2>Edit Blog</h2>
      <form onSubmit={handleSubmit}>
        <div className={styles.title}>
          <label>
            Title:
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <div className={styles.content}>
          <label>
            Content:
            <textarea
              name="content"
              value={formData.content}
              onChange={handleChange}
              required

            />
          </label>
        </div>
        <button type="submit">
          Update Blog
        </button>
      </form>
    </div>
  );
};

export default EditBlog;
