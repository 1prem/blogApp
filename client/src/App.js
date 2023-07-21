import React from 'react'
import './App.css';
import Header from './Components/Header';
import {Routes, Route} from 'react-router-dom'
import Blogs from './pages/Blogs';
import LogIn from './pages/LogIn';
import Register from './pages/Register';
import UserBlogs from './pages/UserBlogs';
import CreateBlog from './pages/CreateBlog';
import BlogDetails from './pages/BlogDetails';
import Test from './pages/Test';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <div>
    <Header/>
    
    <Toaster/>
    <Routes>
     
      <Route path = "/" element={<Blogs/>} />
      <Route path = "/blogs" element={<Blogs/>} />
      <Route path = '/my-blog'  element = {<UserBlogs/>} />
      <Route path = '/create-blog' element = {<CreateBlog/>} />
      <Route path="/blog-details/:id" element={<BlogDetails />} />
      <Route path = "/test" element = {<Test/>} />
      <Route path="/login" element = {<LogIn/>} />
      <Route path="/register" element = {<Register/>} />
  </Routes>
    </div>
  );
}

export default App;
