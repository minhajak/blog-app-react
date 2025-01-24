import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../css/Dashboard.module.css';
import image from '../images/no.png';

const UserDashboard = ({ user }) => {
  // Default values to handle cases where user data might be missing
  const { username = "N/A", age = "N/A", gender = "N/A", email = "N/A", _id } = user || {};

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <img src={image} alt="User Profile" />
        <p className={styles.username}><strong>Username:</strong> {username}</p>
        <p className={styles.age}><strong>Age:</strong> {age}</p>
        <p className={styles.gender}><strong>Gender:</strong> {gender}</p>
        <p className={styles.email}><strong>Email:</strong> {email}</p>
      </div>
      {_id && (
        <Link to={`/users/update-user/${_id}`} className={styles.edit}>
          Edit
        </Link>
      )}
    </div>
  );
};

export default UserDashboard;
