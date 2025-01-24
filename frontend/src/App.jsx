import { BrowserRouter, Route, Routes } from 'react-router-dom'
import NavBar from './layouts/NavBar'
import User from './pages/User'
import Blogs from './pages/Blogs'
import Bloggers from './pages/Bloggers'
import PageNotFound from './pages/PageNotFound'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import MyBlogs from './pages/MyBlogs'
import AddBlog from './pages/AddBlog'
import Dashboard from './pages/Dashboard'
import EditUser from './pages/EditUser'
import EditBlog from './pages/EditBlog'
import ViewBlogs from './pages/ViewBlogs'
import BlogDetails from './pages/BlogDetails'
import ViewBlogCard from './pages/ViewBlogCard'
import About from './pages/About'



function App() {
  return (<>
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path='/users/:id' element={<User />} />
        <Route path='/' element={<Blogs />} />
        <Route path='/aboutUs' element={<About/>} />
        <Route path='/search-bloggers' element={<Bloggers />} />
        <Route path='/signIn' element={<SignIn />} />
        <Route path='/signUp' element={<SignUp />} />
        <Route path='/myblogs' element={<MyBlogs />} />
        <Route path='*' element={<PageNotFound />} />
        <Route path='/addblog' element={<AddBlog />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/users/update-user/:id' element={<EditUser />} />
        <Route path='/update-blog/:id' element={<EditBlog />} />
        <Route path='/viewBlogs/:id' element={<ViewBlogs />} />
        <Route path='/blog/:id' element={<BlogDetails />} />
        <Route path='/myblogs/:id' element={<ViewBlogCard />} />
      </Routes >
    </BrowserRouter>

  </>)
}

export default App
