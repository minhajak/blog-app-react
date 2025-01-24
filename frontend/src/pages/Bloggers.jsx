import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import BloggerSmall from '../components/BloggerSmall';

const Bloggers = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/users')
            .then((response) => setUsers(response.data))
            .catch((error) => console.error('Error fetching users:', error));
    }, []);

    return (
        <>
           <BloggerSmall users={users}/>
        </>
    );
};

export default Bloggers;