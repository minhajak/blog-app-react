import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import styles from '../css/Nav.module.css';

const Nav = ({ handleLogout }) => {
  const { isAuthenticated } = useSelector(state => state.auth);

  return (
    <nav className={styles.mainNav}>
      <div className={styles.nav}>
        <ul className={styles.navList}>
          <li><Link to='/'>search-blog</Link></li>
          <li><Link to='/search-bloggers'>search-blogger</Link></li>
          <li><Link to='/aboutus'>about Us</Link></li>
          {isAuthenticated && <li><Link to='/myblogs'>my blogs</Link></li>}
        </ul>

        <div className={styles.user}>
          {isAuthenticated ? (
            <>
              <Link className={styles.signout} onClick={handleLogout}>Sign Out</Link>
              <Link to='/dashboard' className={styles.dashboard}>Dashboard</Link>
            </>
          ) : (
            <>
              <Link to='/signIn' className={styles.signin}>SignIn</Link>
              <Link to='/signUp' className={styles.signup}>SignUp</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Nav;
