import React from 'react'
import styles from '../css/signin.module.css'
import { Link } from 'react-router-dom'

const SignInForm = ({ handleSubmit, setEmail, setPassword, password, email }) => {
    return (
        <div className={styles.container}>
            <form onSubmit={handleSubmit} className={styles.form}>
                <h2>Sign In</h2>
                <div className={styles.email}>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder='Enter your email Id'
                        required
                    />
                </div>
                <div className={styles.password}>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder='Enter your password'
                        required
                    />
                </div>
                <button className={styles.submit} type="submit">Sign In</button>
                <div className={styles.load}>
                    <Link>forget password ?</Link>
                    <Link to='/signUp'>new user ?</Link>
                </div>
            </form>
        </div>
    )
}

export default SignInForm